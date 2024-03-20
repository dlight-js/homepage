import { View, Env, iframe, Pretty, Prop, required, Typed } from "@dlightjs/dlight"
import { Color } from "../../utils/const"
import { css } from "@emotion/css"

interface ResultProps {
  srcDoc: string
}

@View
class Result {
  /** @prop */
  // @Env srcDoc: string = required
  @Env theme: Color = required
  @Env srcDoc = ""
  @Env css = ""
  @Env isStartResize = required
  @Prop height: string = required

  importMap = [
    "createElement",
    "setStyle",
    "setDataset",
    "setEvent",
    "delegateEvent",
    "setHTMLProp",
    "setHTMLAttr",
    "setHTMLProps",
    "setHTMLAttrs",
    "createTextNode",
    "updateText",
    "insertNode",
    "ForNode",
    "CondNode",
    "ExpNode",
    "EnvNode",
    "TryNode",
    "SnippetNode",
    "PropView",
    "render",
    "use"
  ].map(name => [name, `$$${name}`])

  /** @view */
  Body() {
    iframe()
      .class(this.wrapperCss)
      .srcdoc(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta name="description" content="Author: Xinyi Chen">
          <meta charset="UTF-8" />
          <style>${this.css}</style>
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
            import { View, Model, render, ${this.importMap.map(([key, value]) => `${key} as ${value}`).join(", ")} } from "/dlight.js";\n${this.srcDoc}</script>
        </head>
        <body style="margin: 0;">
          <div id="main" style="height: 100%; color: ${this.theme.text}"></div>
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
