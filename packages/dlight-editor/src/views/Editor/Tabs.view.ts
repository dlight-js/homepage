// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View, $, CustomNode } from "@dlightjs/dlight"
import { div, Env, Prop, required, RequiredProp, span, Static, SubView, Typed } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"
import { HStack } from "@dlightjs/components"
import DeleteIcon from "../icons/DeleteIcon.view"
import AddIcon from "../icons/AddIcon.view"
import { EditorStore } from "./CodeEditor.view"
import * as monaco from "monaco-editor"
import { codeTemplate, Color } from "../../utils/const"
import { ToBeTransformedModule } from "../../project/types"

class Tabs extends View {
  /** @prop */
  @Env theme: Color = required
  @Prop modules: RequiredProp<ToBeTransformedModule[]> = required
  @Prop language: RequiredProp<string> = required
  @Prop tabKey: RequiredProp<string> = required
  @Prop getTabKey: RequiredProp<(tabKey: string) => void> = required
  @Prop addTab: RequiredProp<(tabName: string) => void> = required
  @Prop deleteTab: RequiredProp<(tabName: string) => void> = required
  @Prop getCurrEditorStore: RequiredProp<(data: any) => void> = required
  @Prop updateModulePath: RequiredProp<(currPath: string, newPath: string) => void> = required

  /** @reactive */
  isTabEdit = false
  saveViewState?: () => monaco.editor.ICodeEditorViewState

  @Static editorStores: Record<string, EditorStore> = {}

  /** @element */
  editingElement?: HTMLSpanElement

  /** @func */
  hanleAddTab() {
    const tabName = this.geneNewTabName()
    this.addTab(tabName)
    const defaultCode = codeTemplate(tabName)
    const model = monaco.editor.createModel(defaultCode, this.language)
    this.editorStores[tabName] = { model, state: null }
    this.swithTab(tabName)
  }

  handleDeleteTab(tabName: string) {
    this.deleteTab(tabName)
    // ---- switch tab
    this.swithTab("index")
    // ---- delete from monaco
    this.editorStores[tabName].model.dispose()
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.editorStores[tabName]
  }

  geneNewTabName() {
    const tabNames = this.modules.map(module => this.pathToTab(module.path))
    let i = 0
    while (tabNames.includes(`tab${i === 0 ? "" : i}`)) {
      i++
    }
    return i === 0 ? "tab" : `tab${i}`
  }

  clickTabOutside(event: Event) {
    if (!this.editingElement?.contains(event.target as any)) {
      this.isTabEdit = false
    }
  }

  swithTab(tabName: string) {
    if (this.saveViewState && this.editorStores[this.tabKey]) this.editorStores[this.tabKey].state = this.saveViewState()
    this.getTabKey(tabName)
    this.getCurrEditorStore(this.editorStores[tabName])
  }

  pathToTab(path: string) {
    return path.replace(/^\/(.+?).ts/, "$1")
  }

  tabToPath(tab: string) {
    return `/${tab}.ts`
  }

  /** @lifecycle */
  didMount(_els: HTMLElement[], _node: CustomNode): void {
    document.addEventListener("click", this.clickTabOutside.bind(this))
    this.editorStores = Object.fromEntries(
      this.modules.map(({ code, path }) => [
        this.pathToTab(path),
        {
          model: monaco.editor.createModel(code, this.language),
          state: null
        }
      ])
    )
    this.getCurrEditorStore(this.editorStores[this.tabKey])
  }

  willUnmount() {
    document.removeEventListener("click", this.clickTabOutside.bind(this))
  }

  /** @view */
  @SubView
  Tab({ tabName }: any): any {
    HStack()
      .alignment("center")
      .spacing(0)
    {
      div()
        .className(this.tabNameCss)
      {
        span(tabName)
          .className(this.tabNameSpanCss)
          .className(tabName === "index" ? this.preventSelectCss : undefined)
          .element((el: any) => {
            if (this.tabKey === tabName && this.isTabEdit) {
              this.editingElement = el
            }
          })
          .contentEditable(`${this.tabKey === tabName && this.isTabEdit && tabName !== "index"}`)
          .oninput($((e: any) => {
            this.updateModulePath(tabName, `/${e.target.innerText}.ts`)
          }))
          .ondblclick($(e => {
            this.isTabEdit = true;
            (e.target as any).focus()
          }))
        span(".ts")
          .className(this.preventSelectCss)
      }

      if (tabName !== "index") {
        DeleteIcon()
          .onclick($(e => {
            e.stopPropagation()
            this.handleDeleteTab(tabName)
          }))
      }
    }
  }

  Body() {
    div()
      .className(this.tabBarCss)
    {
      HStack()
        .alignment("center")
      {
        for (const { path } of this.modules) {
          div()
            .className(this.tabWrapCss(this.pathToTab(path)))
            .onclick($(() => {
              this.swithTab(this.pathToTab(path))
            }))
          {
            this.Tab({})
              .tabName(this.pathToTab(path))
          }
        }
        AddIcon()
          .onclick(() => {
            this.hanleAddTab()
          })
      }
    }
  }

  /** @style */
  tabBarCss = css`
    width: 100%;
    background-color: ${this.theme.background};
    overflow-x: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `

  tabNameCss = css`
    line-height: 30px;
    font-size: 18px;
    background-color: ${this.theme.background};
    border-width: 0px;
  `

  tabNameSpanCss = css`
    color: ${this.theme.text};
    padding: 2px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
  `

  preventSelectCss = css`
    color: ${this.theme.text};
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

  tabWrapCss = (tab: string) => css`
    padding: 2px 10px 0 10px;
    border-bottom: ${tab === this.tabKey ? `3px solid ${this.theme.text}` : undefined};
  `
}

export default Tabs as any as Typed<Tabs>
