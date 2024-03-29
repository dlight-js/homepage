import { View, Env, Pretty, Prop, Typed, Watch, div, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"

import { Color, headerHeight } from "../../utils/const"
import { DoDisturbFilled } from "@dlightjs/material-icons"
import ConsoleItem from "./ConsoleItem.view"

interface ConsoleProps {
  height?: string
}
@View
class Console {
  /** @prop */
  @Env theme: Color = required
  @Env getClearConsoleFunc: (func: any) => void = required
  @Prop height = "100%"
  consoleMessages: any[] = []

  clearConsole() {
    this.consoleMessages = []
  }

  willMount() {
    this.getClearConsoleFunc(this.clearConsole.bind(this))
    window.addEventListener("message", (e) => {
      if (typeof e.data === "object" && e.data.vscodeScheduleAsyncWork) {
        // This is the message to filter out, so do nothing
        return
      }
      this.consoleMessages = [...this.consoleMessages, e.data]
    })
  }

  /** @view */
  Body() {
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
          ConsoleItem(msg)
        }
      }
    }
  }

  consoleCss = css`
    height: ${this.height};
  `

  headerCss = css`
    display: flex;
    flex: 1;
    align-items: center;
    height: ${headerHeight}px;
    border-bottom: 1px solid ${this.theme.secondaryText};
    color: ${this.theme.text};
  `

  headerTextCss = css`
    flex-grow: 1;
    text-align: center;
  `

  consoleContentCss = css`
    height: calc(100% - 56px);
    padding: 10px;
    overflow-y: scroll;
  `

  iconCss = css`
    padding-top: 5px;
    margin-left: 10px;
    cursor: pointer;
  `
}

export default Console as Pretty as Typed<ConsoleProps>
