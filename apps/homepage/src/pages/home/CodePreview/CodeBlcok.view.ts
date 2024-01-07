import { View } from "@dlightjs/dlight"
import { Prop, type Pretty, type Typed, required, div, Env } from "@dlightjs/types"
import CodeDisplay from "./CodeDisplay.view"
import { css } from "@iandx/easy-css"
import { EnvType } from "../../../App.view"

interface CodeBlockProps {
  code: string
  title: string
  preview: any
}

@View
class CodeBlock implements CodeBlockProps {
  @Env theme: EnvType["theme"] = required
  @Prop code = required
  @Prop title = required
  @Prop preview = required

  previewHeight = 0

  View() {
    div().class(this.wrapperCss); {
      div().class(this.codeCss); {
        CodeDisplay()
          .title(this.title)
          .code(this.code)
          .element((elements) => {
            this.previewHeight = elements[0].clientHeight
          })
      }
      div().class(this.previewCss); {
        this.preview()
      }
    }
  }

  /** @style */
  wrapperCss = css`
    margin: 0 auto;
    width: 90%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: max-content;
  `

  codeCss = css`
    width: 50%;
    height: max-content;
  `

  previewCss = css`
    background-color: ${this.theme!.reverseHLColor};
    height: ${this.previewHeight - 30}px;
    width: 50%;
  `
}

export default CodeBlock as Pretty as Typed<CodeBlockProps>
