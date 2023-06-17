import { HStack, VStack } from "@dlightjs/components"
import { Watch } from "@dlightjs/decorators"
import { CustomNode, View } from "@dlightjs/dlight"
import { Env, img, PropState, required, span, State, div } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"
import * as monaco from "monaco-editor"
import { TranspilerProjectDto } from "../../service/input.dto"
import { indexCode } from "./const"
import { AddIcon } from "../svgImg/AddIcon.tsd"
import { DeleteIcon } from "../svgImg/DeleteIcon.tsd"
import { Div } from "../style"

interface IModelStore {
  tabName: string
  model: any
  state: any
}

function uid() {
  return Math.random().toString(32).slice(2, 8)
}

export class Editor extends View {
  // ---- prop
  @PropState projectBody: TranspilerProjectDto = required
  @PropState currTabId = required
  @PropState currTagName = required
  @PropState refreshFunc

  // ---- state
  @State modelStores: Record<string, IModelStore> = {}
  @State isTabEdit = ""

  @Env theme = required
  editorTheme = this.theme.name === "light" ? "vs" : "vs-dark"
  themeChanged = (function() {
    monaco.editor.setTheme(this.editorTheme)
  }.call(this))

  // ---- element
  editorEl?: HTMLElement
  tagElements = {}

  // ---- member
  prevTabId = ""
  editor?: any
  changedText = ""

  alterCurrTagName = (function() {
    this.currTagName = this.modelStores[this.currTabId]?.tabName ?? "index"
  }.call(this))

  // ---- method
  addTab(tabName: string, defaultValue = "", language = "typescript") {
    const model = monaco.editor.createModel(defaultValue, language)
    const tabId = uid()
    this.modelStores[tabId] = {
      tabName, model, state: null
    }
    this.modelStores = { ...this.modelStores }
    this.switchTab(tabId)
  }

  switchTab(tabId: string) {
    if (this.modelStores[this.currTabId]) this.modelStores[this.currTabId].state = this.editor.saveViewState()
    const modelStore = this.modelStores[tabId] ?? Object.values(this.modelStores).find(store => store.tabName === "index")!
    this.editor.setModel(modelStore.model)
    this.editor.restoreViewState(modelStore.state)
    this.prevTabId = this.currTabId
    this.currTabId = tabId
  }

  geneNewTabName() {
    const tabNames = Object.values(this.modelStores).map(store => store.tabName)
    let i = 0
    while (tabNames.includes(`tab${i === 0 ? "" : i}`)) {
      i++
    }
    return i === 0 ? "tab" : `tab${i}`
  }

  getProjectBody = () => {
    const body: TranspilerProjectDto = {
      project: [],
      language: "jsd"
    }
    for (const modelStore of Object.values(this.modelStores)) {
      body.project.push({
        path: `/${modelStore.tabName}.tsd`,
        body: modelStore.model.getValue()
      })
    }
    this.projectBody = body
  }

  onKeyDown = (e: any) => {
    if (e.key === "s" && e.metaKey) {
      e.preventDefault()
      this.getProjectBody()
    }
  }

  bindCancelEditableTag() {
    document.addEventListener("click", (event) => {
      if (event.target != this.tagElements[this.currTabId] && this.isTabEdit) {
        this.isTabEdit = ""
        if (this.changedText) {
          this.modelStores[this.currTabId].tabName = this.changedText
        }
        this.modelStores = { ...this.modelStores }
      }
    })
  }

  initEditor() {
    this.editor = monaco.editor.create(this.editorEl!, {
      theme: this.editorTheme,
      minimap: { enabled: false },
      automaticLayout: true
    })
    this.addTab("index", indexCode)
  }

  // ---- lifecycle
  didMount() {
    this.editorEl?.addEventListener("keydown", this.onKeyDown)
    this.bindCancelEditableTag()
    this.initEditor()
    this.getProjectBody()
    this.refreshFunc = this.getProjectBody
  }

  willUnmount(_els: HTMLElement[], _node: CustomNode): void {
    this.editorEl?.removeEventListener("keydown", this.onKeyDown)
    this.editor?.dispose()
    this.getProjectBody()
  }

  // ---- views
  @View
  Tab({ tabName, tabId }): any {
    HStack()
      .alignment("center")
      .spacing(0)
    {
      div()
        .className(tabNameCss)
        ._color(tabId === this.currTabId ? this.theme.activeFont : this.theme.subFont)
      {
        span(tabName)
          .contentEditable(this.isTabEdit === tabId)
          .element(this.tagElements[tabId])
          .oninput((e: any) => {
            this.changedText = e.target.innerText
          })
          .ondblclick(() => {
            this.changedText = tabName
            this.isTabEdit = tabId
            this.tagElements[tabId].focus()
          })
          .className(tabNameSpanCss)
          .className(preventSelectCss)
        span(".tsd")
          .className(preventSelectCss)
      }

      if (tabName !== "index") {
        DeleteIcon()
          .onclick((event: any) => {
            event.stopPropagation()
            if (this.currTabId === tabId) {
              const tabIdArr = Object.keys(this.modelStores)
              const prevTabId = tabIdArr[tabIdArr.length - 2]
              this.switchTab(prevTabId)
            }
            this.modelStores[tabId].model.dispose()
            delete this.modelStores[tabId]
            delete this.tagElements[tabId]
            this.modelStores = { ...this.modelStores }
          })
      }
    }
  }

  @View
  Tabs() {
    Div.Tabs()
      .backgroundColor(this.theme.tabsBg)
      .borderColor(this.theme.borderColor)
    {
      HStack()
        .alignment("center")
      {
        for (const tabId of Object.keys(this.modelStores)) {
          Div.TabWrap()
            .onclick(() => {
              this.switchTab(tabId)
            })
            .backgroundColor(tabId === this.currTabId ? this.theme.activeTabBg : "transparent")
          {
            // @ts-expect-error
            this.Tab()
              .tabId(tabId)
              .tabName(this.modelStores[tabId].tabName)
          }
        }
        AddIcon()
          .onclick(() => {
            this.addTab(this.geneNewTabName())
            this.getProjectBody()
          })
      }
    }
  }

  Body() {
    VStack()
      .spacing(0)
    {
      this.Tabs()
      div()
        .element(this.editorEl)
        .className(editorCss)
        .className(css`
                    border-right: ${this.theme.borderColor} solid 3px;
                `)
    }
  }
}

const editorCss = css`
    width: 600px;
    height: calc(100vh - 30px);
`

const tabNameCss = css`
    height: 30px;
    line-height: 30px;
    font-size: 18px;
    background-color: transparent;
    border-width: 0px;
`

const tabNameSpanCss = css`
    padding: 2px;
    cursor: pointer;
`

const preventSelectCss = css`
    -moz-user-select: none;
    -webkit-user-select: none;
`
