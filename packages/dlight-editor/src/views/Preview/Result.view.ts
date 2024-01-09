import { View } from "@dlightjs/dlight"
import { Env, iframe, Pretty, Prop, required, Typed } from "@dlightjs/types"
import { Color } from "../../utils/const"
import { css } from "@iandx/easy-css"

interface ResultProps {
  srcDoc: string
}

@View
class Result {
  /** @prop */
  // @Env srcDoc: string = required
  @Env theme: Color = required
  @Env srcDoc = ""
  @Env isStartResize = required
  @Prop height: string = required

  /** @view */
  View() {
    iframe()
      .class(this.wrapperCss)
      .srcdoc(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="description" content="Author: Xinyi Chen">
          <meta charset="UTF-8" />
          <link rel="stylesheet" href="/index.css">
          <link rel="stylesheet" href="/base.css">
          <script type="module" src="/dlight.js"></script>
          <script type="module">
            const originalConsoleLog = console.log;
            const originalConsoleError = console.error;
            console.log = function(message) {
              originalConsoleLog(message);
              // Send the message to the parent window
              window.parent.postMessage(message, '*');
            };
            console.error = function(message) {
              originalConsoleError(message);
              // Send the message to the parent window
              window.parent.postMessage(message, '*');
            };
            window.onerror = function(message, source, lineno, colno, error) {
              // Send the message to the parent window
              window.parent.postMessage(error, '*');
            }
            import { View, render, createElement, setStyle, setDataset, setEvent, setHTMLProp, setHTMLAttr, setHTMLProps, setHTMLAttrs, createTextNode, updateText, insertNode, ForNode, CondNode, ExpNode, EnvNode, SubViewNode, PropView } from "/dlight.js";\n${this.srcDoc}</script>
        </head>
        <body style="margin: 0;">
          <div id="app" style="height: 100%; color: ${this.theme.text}"></div>
        </body>
      </html>`)
  }

  /** @style */
  wrapperCss = css`
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 10px;
    border-width: 0px;
    color: ${this.theme.text};
    overflow: hidden;
    pointer-events: ${this.isStartResize ? "none" : "auto"};
  `
}

export default Result as Pretty as Typed<ResultProps>
