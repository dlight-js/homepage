import { View, div, Env, Pretty, Prop, required, span, Static, Typed, Watch } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { CloseFilled, AddFilled } from "@dlightjs/material-icons"
import { EditorStore } from "./CodeEditor.view"
import * as monaco from "monaco-editor"
import { codeTemplate, Color } from "../../utils/const"
import { ToBeTransformedModule } from "../../project/types"
import TabItem from "./TabItem.view"

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
  tabElement?: HTMLSpanElement

  /** @func */
  handleAddTab() {
    const tabName = this.geneNewTabName("js")
    this.addTab(tabName)
    const defaultCode = codeTemplate(this.TabToName(tabName))
    const model = monaco.editor.createModel(defaultCode, this.language)
    this.editorStores[tabName] = { model, state: null }
    this.switchTab(tabName)
  }

  handleAddCss() {
    const tabName = this.geneNewTabName("css")
    this.addTab(tabName)
    const model = monaco.editor.createModel("", "css")
    this.editorStores[tabName] = { model, state: null }
    this.switchTab(tabName)
  }

  handleDeleteTab(tabName: string) {
    this.deleteTab(tabName)
    // ---- switch tab
    this.switchTab("index.js")
    // ---- delete from monaco
    this.editorStores[tabName].model.dispose()
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.editorStores[tabName]
  }

  geneNewTabName(type = "js") {
    const prefix = type === "js" ? "tab" : "style"
    const tabNames = this.modules.map(module => module.path)
    let i = 0
    while (tabNames.includes(`/${prefix}${i === 0 ? "" : i}.${type}`)) {
      i++
    }
    return i === 0 ? `${prefix}.${type}` : `${prefix}${i}.${type}`
  }

  switchTab(tabName: string) {
    if (this.saveViewState && this.editorStores[this.tabKey]) this.editorStores[this.tabKey].state = this.saveViewState()
    this.getTabKey(tabName)
    this.getCurrEditorStore(this.editorStores[tabName])
  }

  changeTabName(tabName: string, newTabName: string) {
    const model = this.editorStores[tabName].model
    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
    delete this.editorStores[tabName]
    this.editorStores[newTabName] = { model, state: null }
    this.updateModulePath(`/${tabName}`, `/${newTabName}`)
    this.switchTab(newTabName)
  }

  TabToName(tab: string) {
    return tab.replace(/^(.+?).js/, "$1").replace(/^(.+?).css/, "$1")
  }

  PathToTab(path: string) {
    return path.replace("/", "")
  }

  /** @lifecycle */
  didMount() {
    this.editorStores = Object.fromEntries(
      this.modules.map(({ code, path }) => [
        this.PathToTab(path),
        {
          model: monaco.editor.createModel(code, path.endsWith(".css") ? "css" : this.language),
          state: null
        }
      ])
    )
    this.getCurrEditorStore(this.editorStores[this.tabKey])
  }

  /** @view */
  Body() {
    div()
      .class(this.tabBarCss)
    {
      div()
        .class(this.rowDisplayCss)
      {
        for (const { path } of this.modules) {
          div()
            .class(this.tabWrapCss(this.PathToTab(path)))
            .onClick(() => {
              this.switchTab(this.PathToTab(path))
            })
          {
            TabItem()
              .tabKey(this.tabKey)
              .tabName(this.PathToTab(path))
              .type(path.split(".")[path.split(".").length - 1])
              .changeTabName(this.changeTabName)
              .handleDeleteTab(this.handleDeleteTab)
          }
        }
        AddFilled()
          .height(18)
          .class(this.addIconCss)
          .color(this.theme.text)
        div("JS")
          .class(this.addWrapCss)
          .onClick(() => {
            this.handleAddTab()
          })
        div("CSS")
          .class(this.addWrapCss)
          .onClick(() => {
            this.handleAddCss()
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

  tabWrapCss = (tab: string) => css`
    padding: 2px 10px 0 10px;
    border-bottom: ${tab === this.tabKey ? `3px solid ${this.theme.text}` : undefined};
  `

  addIconCss = css`
    height: 18px;
  `

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  `

  addWrapCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 0 5px;
    font-weight: 600;
    color: ${this.theme.background};
    background-color: ${this.theme.test};
    cursor: pointer;
    margin-right: 1px;
  `
}

export default Tabs as Pretty as Typed<TabsProps>
