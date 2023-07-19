import { View } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { Prop, Env, Static, type Typed, required, type RequiredProp } from "@dlightjs/types"
import * as monaco from "monaco-editor"

export interface EditorStore {
  model: monaco.editor.ITextModel
  state: monaco.editor.ICodeEditorViewState | null
}

class CodeEditor extends View {
  /** @prop */
  @Prop editorStore: RequiredProp<EditorStore> = required
  @Prop onCodeChange: Prop<(code: string) => void> = (() => {}) as any
  @Prop language: Prop<string> = "typescript" as any
  @Prop getSaveViewState: Prop<(func: () => monaco.editor.ICodeEditorViewState | null) => void> = (() => null) as any
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
    this.onCodeChange(this.editor!.getValue())
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
    this.getSaveViewState(() => this.editor!.saveViewState())
  }

  willUnmount() {
    this.editorEl?.removeEventListener("keydown", this.onKeyDown)
    this.editor?.dispose()
  }

  /** @view */
  Body() {
    div()
      .element(this.editorEl)
      .width("100%")
      .height(`calc(${this.height} - 45px)`)
  }
}

export default CodeEditor as any as Typed<CodeEditor>
