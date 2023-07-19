import { View } from "@dlightjs/dlight"
import { div } from "@dlightjs/easy-css"
import { Env, Prop, required, RequiredProp, Static, Typed } from "@dlightjs/types"
import * as monaco from "monaco-editor"
import { Color, headerHeight } from "../../utils/const"

class Output extends View {
  /** @prop */
  @Prop code: RequiredProp<string> = required
  @Env theme: Color = required
  @Env height: string = required

  /** @reactive */
  onCodeChange = (function() {
    this.editor?.setValue(this.code)
  }.call(this))

  /** @member */
  @Static editorEl?: HTMLElement
  @Static editor?: monaco.editor.IEditor

  /** @function */
  initEditor() {
    this.editor = monaco.editor.create(this.editorEl!, {
      value: this.code,
      minimap: { enabled: false },
      readOnly: true,
      language: "typescript",
      automaticLayout: true
    })
  }

  /** @lifecycle */
  didMount() {
    this.initEditor()
  }

  /** @view */
  Body() {
    div()
      .element(this.editorEl)
      .height(`calc(${this.height} - ${headerHeight}px)`)
  }
}

export default Output as any as Typed<Output>
