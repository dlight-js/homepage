import DLight, { View, $ } from "@dlightjs/dlight"
import { div, Prop, required, RequiredProp, Static, Typed } from "@dlightjs/types"
import { css } from "@emotion/css"
import { DLightProject } from "../../project/dlightProject"
import { VStack } from "@dlightjs/components"
import CodeEditor, { EditorStore } from "./CodeEditor.view"
import * as monaco from "monaco-editor"
import { codeTemplate } from "../../utils/const"
import { ToBeTransformedModule, TransformedProjectModule } from "../../project/types"
import Tabs from "./Tabs.view"

class ProjectEditor extends View {
  /** @prop */
  @Prop modules: RequiredProp<ToBeTransformedModule[]> = required
  @Prop getCurrTransformedCode: RequiredProp<(code: string) => void> = required
  @Prop getRefreshFunc: RequiredProp<(func: any) => void> = required
  @Prop getMountId: RequiredProp<(id: string) => void> = required
  @Prop language: Prop<string> = "typescript" as any
  @Prop width: Prop<string> = "100%" as any
  @Prop onSave: Prop<(project: DLightProject) => void> = (() => {}) as any

  /** @reactive */
  dlightProject = new DLightProject(this.modules)
  tabKey = "index"
  isTabEdit = false
  saveViewState?: () => monaco.editor.ICodeEditorViewState
  currEditorStore?: EditorStore
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

  @Static _dlightProject = this.dlightProject

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
    this.onSave(this.dlightProject)
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
      this.updateModuleCode(this.currEditorStore!.model.getValue())
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
          .editorStore(this.currEditorStore!)
          .getSaveViewState($((saveState: any) => {
            this.saveViewState = saveState
          }))
          .onCodeChange(this.updateModuleCode.bind(this))
          .language(this.language)
      }
    }
  }

  /** @style */
  tabNameCss = css`
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    background-color: transparent;
    border-width: 0px;
  `

  tabNameSpanCss = css`
    padding: 2px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
  `

  preventSelectCss = css`
    -moz-user-select: none;
    -webkit-user-select: none;
  `

  tabCss = (backgroundColor: string, borderColor: string) => css`
    background-color: ${backgroundColor};
    width: 600px;
    overflow: scroll;
    ::-webkit-scrollbar {
        display: none;
    }
    height: 30px;
    border-right: ${borderColor} solid 3px;
    border-top: ${borderColor} solid 1px;
  `

  tabWrapCss = css`
    padding: 0px 10px;
    height: 30px;
  `
}

export default ProjectEditor as any as Typed<ProjectEditor>
