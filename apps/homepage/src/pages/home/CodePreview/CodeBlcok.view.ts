import { View } from "@dlightjs/dlight"
import { type Pretty, type Typed, required, div, Env, ContentProp, Content, h1, p } from "@dlightjs/types"
import CodeDisplay from "./CodeDisplay.view"
import { css } from "@iandx/easy-css"
import { EnvType } from "../../../App.view"
import { Example } from "./utils"

interface CodeBlockProps {
  example: ContentProp<Example>
}

@View
class CodeBlock implements CodeBlockProps, EnvType {
  @Env theme: EnvType["theme"] = required
  @Env i18n: EnvType["i18n"] = required
  @Env isShortView: EnvType["isShortView"] = required
  @Content example: CodeBlockProps["example"] = required

  previewHeight = 0

  View() {
    div().class(this.titleDesCss); {
      h1(this.i18n?.(this.example.title, this.example.zhTitle))
        .class(this.titleCss)
      p(this.i18n?.(this.example.description, this.example.zhDescription))
        .class(this.descriptionCss)
    }

    div().class(this.codePreviewWrapperCss); {
      div().class(this.codeCss); {
        CodeDisplay()
          .title(this.example.codeTitle)
          .code(this.example.code)
          .element((elements) => {
            this.previewHeight = elements[0].clientHeight
          })
      }
      div().class(this.previewBGCss); {
        div().class(this.previewCss); {
          this.example.preview()
        }
      }
    }
  }

  /** @style */
  titleDesCss = css`
    display: flex;
    flex-direction: column;
    justify-content: ${this.isShortView ? "flex-start" : "center"};
    align-items: ${this.isShortView ? "flex-start" : "center"};
    margin: 20px 40px;
  `

  titleCss = css`
    font-weight: 600;
  `
  descriptionCss = css`
    font-size: large;
    text-align: ${this.isShortView ? "left" : "center"};
    margin-top: 0;
    ${this.isShortView ? "" : "width: 80%;"}
  `

  codePreviewWrapperCss = css`
    margin: 0 auto 120px auto;
    width: 80%;
    display: flex;
    flex-direction: ${this.isShortView ? "column" : "row"};
    align-items: center;
    height: max-content;
  `

  codeCss = css`
    border-radius: 12px;
    box-shadow: ${this.isShortView
      ? `0 -4px 8px 0 ${this.theme!.lightShadow}`
      : `-4px 4px 8px 0 ${this.theme!.lightShadow}`
    };
    width: ${this.isShortView ? "100%" : "50%"};
    height: max-content;
  `

  previewBGCss = css`
    box-shadow: ${this.isShortView
      ? `0 4px 8px 0 ${this.theme!.lightShadow}`
      : `-4px 4px 8px 0 ${this.theme!.lightShadow}`};

    background-color: ${this.theme!.secondBg};
    ${this.isShortView ? "padding: 30px 0;" : ""}
    height: ${this.isShortView
      ? "max-content"
      : `${this.previewHeight - 40}px`
    };
    width: ${this.isShortView ? "calc(100% - 50px)" : "50%"};
    border-radius: ${this.isShortView
      ? "0 0 12px 12px"
      : "0 12px 12px 0"};
    display: flex;
    justify-content: center;
    align-items: center;
  `

  previewCss = css`
      box-shadow: 0px 0px 2cap 0 ${this.theme!.lightShadow};
    width: max-content;
    height: max-content;
    background-color: ${this.theme!.bgColor};
    border-radius: 12px;
    padding: 20px;
  `
}

export default CodeBlock as Pretty as Typed<CodeBlockProps>
