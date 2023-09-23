import { View } from "@dlightjs/dlight"
import { div, Pretty, Prop, required, Typed } from "@dlightjs/types"
import { DLightProject } from "../../project/dlightProject"
import { VStack } from "@dlightjs/components"
import CodeEditor, { EditorStore } from "./CodeEditor.view"
import * as monaco from "monaco-editor"
import { codeTemplate } from "../../utils/const"
import { ToBeTransformedModule, TransformedProjectModule } from "../../project/types"
import Tabs from "./Tabs.view"

interface ProjectEditorProps {
  modules: ToBeTransformedModule[]
  getCurrTransformedCode: (code: string) => void
  getRefreshFunc: (func: any) => void
  getMountId: (id: string) => void
  language?: string
  width?: string
  onSave?: (project: DLightProject) => void
}

class ProjectEditor extends View {
  /** @prop */
  @Prop modules = required
  @Prop getCurrTransformedCode = required
  @Prop getRefreshFunc = required
  @Prop getMountId = required
  @Prop language = "typescript"
  @Prop width = "100%"
  @Prop onSave?: (project: DLightProject) => void

  /** @reactive */
  dlightProject = new DLightProject(this.modules)

  tabKey = "index"
  isTabEdit = false
  saveViewState?: () => monaco.editor.ICodeEditorViewState
  currEditorStore: EditorStore = undefined as any
  getCurrEditorStore(editorStore: EditorStore) {
    this.currEditorStore = editorStore
  }

  getTabKey(tabKey: string) {
    this.tabKey = tabKey
  }

  onTabKeyChange = (() => {
    this.getCurrTransformedCode(this.dlightProject.transformedModules.find(
      (module: TransformedProjectModule) => {
        return module.path === this.tabToPath(this.tabKey)
      }
    )?.dlightCode ?? "" as any)
  })()

  onDlightProjectChange = (() => {
    this.getMountId(this.dlightProject.moduleId)
  })()

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

  addTab(tabName: string) {
    // ---- add to project
    const defaultCode = codeTemplate(tabName)
    this.dlightProject = new DLightProject([
      ...this.dlightProject.modules,
      { path: this.tabToPath(tabName), code: defaultCode }
    ]) as any
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
    void this.dlightProject.run()
    this.onSave?.(this.dlightProject)
  }

  pathToTab(path: string) {
    return path.replace(/^\/(.+?).ts/, "$1")
  }

  tabToPath(tab: string) {
    return `/${tab}.ts`
  }

  /** @lifecycle */
  didMount() {
    void this.dlightProject.run()
    this.getRefreshFunc(() => {
      this.updateModuleCode(this.currEditorStore.model.getValue())
    })
  }

  Body() {
    div()
      .style({
        width: this.width
      })
    {
      VStack()
        .width("100%")
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
}

export default ProjectEditor as Pretty as Typed<ProjectEditorProps>
