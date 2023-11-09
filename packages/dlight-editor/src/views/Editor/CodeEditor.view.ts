import { Env, Prop, Static, View, required } from "@dlightjs/dlight"
import { css } from "@iandx/easy-css"
import { type Typed, Pretty, div } from "@dlightjs/types"
import * as monaco from "monaco-editor"

export interface EditorStore {
  model: monaco.editor.ITextModel
  state: monaco.editor.ICodeEditorViewState | null
}

interface CodeEditorProps {
  editorStore: EditorStore
  onCodeChange?: (code: string) => void
  language?: string
  getSaveViewState?: (func: () => monaco.editor.ICodeEditorViewState | null) => void
}

@View
class CodeEditor implements CodeEditorProps {
  /** @prop */
  @Prop editorStore: EditorStore = required
  @Prop onCodeChange?: (code: string) => void
  @Prop language = "typescript"
  @Prop getSaveViewState?: (func: () => monaco.editor.ICodeEditorViewState | null) => void
  @Env themeType: "light" | "dark" = required
  @Env height: string = required

  /** @reactive */
  editor?: monaco.editor.ICodeEditor
  onEditorStoreChange = (() => {
    this.editor?.setModel(this.editorStore.model)
    this.editor?.restoreViewState(this.editorStore.state)
  })()

  onEditorThemeChange = (() => {
    monaco.editor.setTheme(this.themeType === "light" ? "vs" : "vs-dark")
  })()

  /** @element */
  @Static editorEl?: HTMLElement
  @Static tagElements: Record<string, HTMLElement> = {}

  /** @func */
  handleCodeChange() {
    this.onCodeChange?.(this.editor!.getValue())
  }

  onKeyDown = (e: any) => {
    if (e.key === "s" && e.metaKey) {
      e.preventDefault()
      this.handleCodeChange()
    }
  }

  changeModel(editorStore: EditorStore) {
    if (!editorStore) return
    this.editor!.setModel(editorStore.model)
    this.editor!.restoreViewState(editorStore.state)
  }

  /** @lifecycle */
  didMount() {
    this.editorEl?.addEventListener("keydown", this.onKeyDown)
    this.editor = monaco.editor.create(this.editorEl!, {
      language: this.language,
      minimap: { enabled: false },
      automaticLayout: true
    })
    this.getSaveViewState?.(() => this.editor!.saveViewState())
  }

  willUnmount() {
    this.editorEl?.removeEventListener("keydown", this.onKeyDown)
    this.editor?.dispose()
  }

  /** @view */
  Body() {
    div()
      .element(this.editorEl)
      .className(this.editorCss)
  }

  editorCss = css`
    width: 100%;
    height: calc(${this.height} - 45px);
  `
}

export default CodeEditor as Pretty as Typed<CodeEditorProps>
