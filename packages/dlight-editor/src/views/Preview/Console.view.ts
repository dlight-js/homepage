import { View } from "@dlightjs/dlight"
import { css } from "@iandx/easy-css"
import { Env, Pretty, Prop, Static, Typed, Watch, div, required } from "@dlightjs/types"
import * as monaco from "monaco-editor"
import { Color } from "../../utils/const"

interface ConsoleProps {
}

@View
class Console {
  /** @prop */
  @Env registerConsoleFunc
  logs = []
  errors = []
  @Env theme: Color = required
  @Env height: string = required

  @Watch
  register() {
    console.log(this.registerConsoleFunc, "okkk")
    this.registerConsoleFunc(this)
  }

  /** @view */
  View() {
    div()
      .class(this.consoleCss)
    {
      div("console")
      div("11112e3213")
      for (const log of this.logs) {
        div(log)
      }
    }
  }

  consoleCss = css`
    border-top: 1px solid ${this.theme.secondaryText};
    height: 250px;
    color: white;
  `
}

export default Console as Pretty as Typed<ConsoleProps>
