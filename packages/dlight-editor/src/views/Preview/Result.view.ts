import { View } from "@dlightjs/dlight"
import { Env, iframe, Pretty, required, Typed } from "@dlightjs/types"
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
  @Prop height: string = required

  /** @view */
  View() {
    // div()
    // .class(this.iframeTransparentCss)
    div().class(this.wrapperCss)
    {
      iframe()
        .class(this.wrapperCss)
        .srcdoc(`<!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <script type="module" src="/dlight.js"></script>
          <script type="module">
            const originalConsoleLog = console.log;
            console.log = function(message) {
              originalConsoleLog(message);
              // Send the message to the parent window
              window.parent.postMessage(message, '*');
            };
            import { render, View, createTemplate,
            setStyle, setDataset, setEvent, setHTMLProp, setHTMLAttr,
            setHTMLProps, setHTMLAttrs, insertNode, createElement,
            ForNode, CondNode, EnvNode, createTextNode, updateText,
            ExpNode, PropView, SubViewNode } from "/dlight.js";\n${this.srcDoc}</script>
        </head>
        <body>
          <div id="app" style="height: 100%"></div>
        </body>
      </html>`)
    }
  }

  /** @style */
  wrapperCss = css`
    width: 100%;
    height: ${this.height};
    border-width: 0px;
    color: ${this.theme.text};
  `

  iframeTransparentCss = css`
  width: 100%;
  height: ${this.height};
  position: absolute;
  z-index: 100;
  top: 0;
  opacity: 0;
  background: transparent;
  `
}

export default Result as Pretty as Typed<ResultProps>
