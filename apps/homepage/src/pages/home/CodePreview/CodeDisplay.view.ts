import { View } from "@dlightjs/dlight"
import { code, div, pre, Prop, required, Pretty, Typed, Env, Watch } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import hljs from "highlight.js"
import "highlight.js/styles/a11y-light.css"
import "highlight.js/styles/a11y-dark.css"
import { EnvType } from "../../../App.view"

interface CodeDisplayProps {
  code: string
  title: string
}

@View
class CodeDisplay implements CodeDisplayProps {
  @Prop code = required
  @Prop title = ""
  @Env themeType: EnvType["themeType"] = required
  @Env theme: EnvType["theme"] = required
  @Env isShortView: EnvType["isShortView"] = required

  @Watch
  changeCodeTheme() {
    const theme = this.themeType === "light" ? "a11y-light" : "a11y-dark"
    const oldLink = document.getElementById("highlight-theme") as HTMLLinkElement | null
    if (oldLink?.href === `/codeTheme/${theme}.min.css`) return
    if (oldLink?.parentNode) {
      oldLink.parentNode.removeChild(oldLink)
    }

    const link = document.createElement("link")
    link.id = "highlight-theme"
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = `/codeTheme/${theme}.min.css`
    document.head.appendChild(link)
  }

  highlightedCode = hljs.highlight(this.code, { language: "js" }).value

  View() {
    div().class(this.dlightCodeBlock); {
      div(this.title)
        .class(this.dlightCodeBlockHeader)
      div()
        .class(this.dlightHomepageCode)
      {
        pre(); {
          code()
            .class(this.codeCss)
            .innerHTML(this.highlightedCode)
        }
      }
    }
  }

  /** @style */
  dlightCodeBlock = css`
    background-color: ${this.theme!.codeBgColor};
    border-radius: 12px;
    font-size: 12px;
    width: 100%;
  `

  dlightCodeBlockHeader = css`
    background-color: ${this.theme!.activeColor};
    padding: 8px 16px;
    border-radius: 12px 12px 0 0;
    font-weight: 500;
    color: ${this.theme!.textColor};
  `

  dlightHomepageCode = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 16px;
    overflow-x: auto;
  `
  codeCss = css`
    font-family: Source Code Pro,ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;
    line-height: 1.29rem;
    font-weight: 400;
  `
}

export default CodeDisplay as Pretty as Typed<CodeDisplayProps>
