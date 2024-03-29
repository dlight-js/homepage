import { View, div, Pretty, Prop, required, Typed, Watch } from "@dlightjs/dlight"
import { DLightProject } from "../../project/dlightProject"
import CodeEditor, { EditorStore } from "./CodeEditor.view"
import * as monaco from "monaco-editor"
import { codeTemplate } from "../../utils/const"
import { ToBeTransformedModule, TransformedProjectModule } from "../../project/types"
import Tabs from "./Tabs.view"
import { css } from "@emotion/css"

interface ProjectEditorProps {
  modules: ToBeTransformedModule[]
  getCurrTransformedCode: (code: string) => void
  getRefreshFunc: (func: any) => void
  language?: string
  width?: string
  height?: string
  onSave?: (project: DLightProject) => void
  getSrcDoc: (doc: string) => void
  clearConsoleFunc: () => void
  getCss: (css: string) => void
}

@View
class ProjectEditor {
  /** @prop */
  @Prop modules = required
  @Prop getCurrTransformedCode = required
  @Prop getRefreshFunc = required
  @Prop language = "javascript"
  @Prop width = "100%"
  @Prop height = "100%"
  @Prop onSave?: (project: DLightProject) => void
  @Prop getSrcDoc = required
  @Prop clearConsoleFunc = required
  @Prop getCss = required

  /** @reactive */
  dlightProject = new DLightProject(this.modules)

  tabKey = "index.js"
  isTabEdit = false
  saveViewState?: () => monaco.editor.ICodeEditorViewState
  currEditorStore: EditorStore = undefined as any
  getCurrEditorStore(editorStore: EditorStore) {
    this.currEditorStore = editorStore
  }

  getTabKey(tabKey: string) {
    this.tabKey = tabKey
  }

  @Watch
  onTabKeyChange() {
    if (this.tabKey.endsWith(".js")) {
      this.getCurrTransformedCode(this.dlightProject.transformedModules.find(
        (module: TransformedProjectModule) => {
          return module.path === this.tabToPath(this.tabKey)
        }
      )?.dlightCode ?? "" as any)
    } else {
      this.getCurrTransformedCode(this.dlightProject.modules.find(
        (module: ToBeTransformedModule) => {
          return module.path === this.tabToPath(this.tabKey)
        }
      )?.code ?? "" as any)
    }
  }

  getSaveViewState(saveState: any) {
    this.saveViewState = saveState
  }

  updateModulePath(currPath: string, newPath: string) {
    const modules = this.dlightProject.modules.map(module => (
      module.path === currPath
        ? { path: newPath, code: module.code }
        : module
    ))
    this.dlightProject = new DLightProject(modules) as any
  }

  addTab(tabName: string, type: "js" | "css" = "js") {
    // ---- add to project
    if (type === "js") {
      const defaultCode = codeTemplate(this.pathToTab(tabName))
      this.dlightProject = new DLightProject([
        ...this.dlightProject.modules,
        { path: this.tabToPath(tabName), code: defaultCode }
      ]) as any
    } else if (type === "css") {
      this.dlightProject = new DLightProject([
        ...this.dlightProject.modules,
        { path: this.tabToPath(tabName), code: "" }
      ]) as any
    }
  }

  deleteTab(tabName: string) {
    // ---- delete from project
    this.dlightProject = this.dlightProject.new(modules => modules.filter(module => module.path !== this.tabToPath(tabName))) as any
  }

  updateModuleCode(newCode: string) {
    const modules = this.dlightProject.modules.map(module => (
      module.path === this.tabToPath(this.tabKey)
        ? { path: module.path, code: newCode }
        : module
    ))
    this.dlightProject = new DLightProject(modules) as any
    this.getSrcDoc(this.dlightProject.srcDoc)
    this.getCss(this.dlightProject.css)
    this.onSave?.(new DLightProject(this.dlightProject.modules))
  }

  @Watch("dlightProject")
  watchDlightProject(_, prevValue?: DLightProject, nextValue?: DLightProject) {
    if (prevValue?.srcDoc !== nextValue?.srcDoc) {
      // clear console when run
      this.clearConsoleFunc()
    }
  }

  pathToTab(path: string) {
    return path.replace(/^(.+?).js/, "$1")
  }

  tabToPath(tab: string) {
    return `/${tab}`
  }

  /** @lifecycle */
  didMount() {
    this.getSrcDoc(this.dlightProject.srcDoc)
    this.getCss(this.dlightProject.css)
    this.getRefreshFunc(() => {
      this.updateModuleCode(this.currEditorStore.model.getValue())
    })
  }

  Body() {
    div()
      .style({
        width: this.width,
        height: this.height,
        overflow: "hidden"
      })
    {
      div()
        .class(this.columnDisplayCss)
      {
        Tabs()
          .modules(this.dlightProject.modules)
          .language(this.language)
          .getCurrEditorStore(this.getCurrEditorStore.bind(this))
          .tabKey(this.tabKey)
          .getTabKey(this.getTabKey.bind(this))
          .updateModulePath(this.updateModulePath.bind(this))
          .addTab(this.addTab.bind(this))
          .deleteTab(this.deleteTab.bind(this))
        CodeEditor()
          .editorStore(this.currEditorStore)
          .getSaveViewState(this.getSaveViewState)
          .onCodeChange(this.updateModuleCode.bind(this))
          .language(this.language)
      }
    }
  }

  columnDisplayCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  `
}

export default ProjectEditor as Pretty as Typed<ProjectEditorProps>
