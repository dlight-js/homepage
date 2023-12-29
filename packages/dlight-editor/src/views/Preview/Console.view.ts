import { View } from "@dlightjs/dlight"
import { css } from "@iandx/easy-css"
import { Env, Pretty, Prop, Static, Typed, div, required } from "@dlightjs/types"
import * as monaco from "monaco-editor"
import { Color } from "../../utils/const"

interface ConsoleProps {
  consoleInfo: any
}

@View
class Console {
  /** @prop */
  @Prop consoleInfo = required
  @Env theme: Color = required
  @Env height: string = required

  /** @view */
  View() {
    div()
      .class(this.consoleCss)
    {
      div("console")
      div("11112e3213")
      div(this.consoleInfo)
    }
  }

  consoleCss = css`
    border-top: 1px solid ${this.theme.secondaryText};
    height: 250px;
    color: white;
  `
}

export default Console as Pretty as Typed<ConsoleProps>
