import { View } from "@dlightjs/dlight"
import { div, Env, Pretty, Prop, required, span, Static, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import clsx from "clsx"
import { CloseFilled, AddFilled } from "@dlightjs/material-icons"
import { EditorStore } from "./CodeEditor.view"
import * as monaco from "monaco-editor"
import { codeTemplate, Color } from "../../utils/const"
import { ToBeTransformedModule } from "../../project/types"

interface TabsProps {
  modules: ToBeTransformedModule[]
  language: string
  tabKey: string
  getTabKey: (tabKey: string) => void
  addTab: (tabName: string) => void
  deleteTab: (tabName: string) => void
  getCurrEditorStore: (data: any) => void
  updateModulePath: (currPath: string, newPath: string) => void
}

@View
class Tabs implements TabsProps {
  /** @prop */
  @Env theme: Color = required
  @Prop modules: ToBeTransformedModule[] = required
  @Prop language: string = required
  @Prop tabKey: string = required
  @Prop getTabKey: (tabKey: string) => void = required
  @Prop addTab: (tabName: string) => void = required
  @Prop deleteTab: (tabName: string) => void = required
  @Prop getCurrEditorStore: (data: any) => void = required
  @Prop updateModulePath: (currPath: string, newPath: string) => void = required

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
  didMount() {
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
  @View
  Tab({ tabName }: any): any {
    div()
      .class(this.rowDisplayCss)
    {
      div()
        .class(this.tabNameCss)
      {
        span(tabName)
          .class(clsx(this.tabNameSpanCss, tabName === "index" ? this.preventSelectCss : undefined))
          .element((el: any) => {
            if (this.tabKey === tabName && this.isTabEdit) {
              this.editingElement = el
            }
          })
          .contentEditable(`${this.tabKey === tabName && this.isTabEdit && tabName !== "index"}`)
          .onInput((e: any) => {
            this.updateModulePath(tabName, `/${e.target.innerText}.ts`)
          })
          .onDblClick((e: any) => {
            this.isTabEdit = true
            e.target.focus()
          })
        span(".ts")
          .class(this.preventSelectCss)
      }

      if (tabName !== "index") {
        CloseFilled()
          .height(16)
          .class(this.deleteIconCss)
          .color(this.theme.primary)
          .onClick(e => {
            e.stopPropagation()
            this.handleDeleteTab(tabName)
          })
      }
    }
  }

  View() {
    div()
      .class(this.tabBarCss)
    {
      div()
        .class(this.rowDisplayCss)
      {
        for (const { path } of this.modules) {
          div()
            .class(this.tabWrapCss(this.pathToTab(path)))
            .onClick(() => {
              this.swithTab(this.pathToTab(path))
            })
          {
            this.Tab({})
              .tabName(this.pathToTab(path))
          }
        }
        AddFilled()
          .height(18)
          .class(this.addIconCss)
          .color(this.theme.primary)
          .onClick(() => {
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

  deleteIconCss = css`
    height: 16px;
    cursor: pointer;
    padding-left: 5px;
  `

  addIconCss = css`
    height: 18px;
    cursor: pointer;
  `

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  `
}

export default Tabs as Pretty as Typed<TabsProps>
