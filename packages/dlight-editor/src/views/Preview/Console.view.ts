import { View } from "@dlightjs/dlight"
import { css } from "@iandx/easy-css"
import { Env, Pretty, Prop, Typed, div, required } from "@dlightjs/types"
import { Color, headerHeight } from "../../utils/const"
import { DoDisturbFilled } from "@dlightjs/material-icons"

interface ConsoleProps {
  height?: string
}
@View
class Console {
  /** @prop */
  @Env theme: Color = required
  @Env getClearConsoleFunc: (func: any) => void = required
  @Prop height = "100%"
  consoleMessages = []

  clearConsole() {
    this.consoleMessages = []
  }

  didMount() {
    this.getClearConsoleFunc(this.clearConsole.bind(this))
    window.addEventListener("message", (e) => {
      if (typeof e.data === "object" && e.data.vscodeScheduleAsyncWork) {
        // This is the message to filter out, so do nothing
        return
      }
      this.consoleMessages.push(e.data)
      this.consoleMessages = [...this.consoleMessages]
    })
  }

  /** @view */
  View() {
    div()
      .class(this.consoleCss)
    {
      div()
        .class(this.headerCss)
      {
        DoDisturbFilled()
          .onClick(this.clearConsole)
          .color(this.theme.text)
          .class(this.iconCss)
          .width(20)
        div("Console")
          .class(this.headerTextCss)
      }
      div()
        .class(this.consoleContentCss)
      {
        for (const msg of this.consoleMessages) {
          div(msg)
        }
      }
    }
  }

  consoleCss = css`
    border-top: 1px solid ${this.theme.secondaryText};
    height: ${this.height};
    /* color: white; */
    overflow-y: scroll;
  `

  headerCss = css`
    display: flex;
    align-items: center;
    /* justify-content: center; */
    height: ${headerHeight}px;
    border-bottom: 1px solid ${this.theme.secondaryText};
    color: ${this.theme.text};
  `

  headerTextCss = css`
    flex-grow: 1;
    text-align: center;
  `

  consoleContentCss = css`
    padding: 10px;
  `

  iconCss = css`
    padding-top: 5px;
    margin-left: 10px;
  `
}

export default Console as Pretty as Typed<ConsoleProps>
