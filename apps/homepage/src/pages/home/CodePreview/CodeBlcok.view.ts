import { View } from "@dlightjs/dlight"
import { Prop, type Pretty, type Typed, required, Children, div, Env } from "@dlightjs/types"
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

  codeBlockElement: HTMLElement | null = null

  didMount() {
    console.log(this.codeBlockElement?.offsetHeight)
  }

  View() {
    div().class(this.wrapperCss); {
      div().class(this.codeCss); {
        CodeDisplay()
          .title(this.title)
          .code(this.code)
          .element((elements) => {
            this.codeBlockElement = elements[0]
            this.codeBlockElement.onload = () => {
              console.log(this.codeBlockElement?.offsetHeight)
            }
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
    height: 100%;
    width: 50%;
  `
}

export default CodeBlock as Pretty as Typed<CodeBlockProps>
