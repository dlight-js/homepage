import { Content, CustomNode, Prop, View, required } from "@dlightjs/dlight"
import { code, ContentProp, div, pre, Pretty, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import hljs from "highlight.js"
import { ContentCopyFilled, DoneFilled } from "@dlightjs/material-icons"

interface AdvantageBlockProps {
  content: ContentProp<any>
  props: any
}

@View
class AdvantageBlock implements AdvantageBlockProps {
  @Prop @Content content: any = required
  @Prop props = required
  language = this.props.language
  title = this.props.title
  highlightedCode = hljs.highlight(this.content, { language: this.language.trim() }).value
  hasCopied = false

  didMount(_els: HTMLElement[], _node: CustomNode): void {
    console.log(this.content)
    console.log(this.props)
  }

  async handleCopy() {
    await navigator.clipboard.writeText(this.content)
    this.hasCopied = true
  }

  Body() {
    div()
      .className(this.dlightMarkitCodeBlock)
    {
      div()
        .className(this.dlightMarkitCodeBlockHeader)
      {
        if (this.language) {
          div()
            .className(this.dlightMarkitCodeBlockTitleLanguage)
          {
            if (this.title) {
              div(this.title)
                .className(this.dlightMarkitCodeBlockTitle)
            }
            div(this.language)
          }
        }
        div()
        {
          if (!this.hasCopied) {
            ContentCopyFilled()
              .color("#999999")
              .width(18)
              .height(18)
              .className(this.copyIcon)
              .onclick(this.handleCopy.bind(this))
          } else if (this.hasCopied) {
            DoneFilled()
              .color("#999999")
              .width(18)
              .height(18)
              .className(this.copyIcon)
          }
        }
      }

      div()
        .className(this.dlightHomepageMarkitCode)
        .onmouseleave(() => { this.hasCopied = false })
      {
        pre()
        {
          code()
            .className(this.code)
            .innerHTML(this.highlightedCode)
        }
      }
    }
  }

  /** @style */
  dlightMarkitCodeBlockHeader = css`
    background-color: rgba(250, 190, 142, 0.3);
    padding: 8px 16px;
    border-radius: 12px 12px 0 0;
    color: #333333;
    font-family: system-ui;
    font-size: 85%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
  dlightMarkitCodeBlockTitleLanguage = css`
    display: flex;
    flex-direction: row;
  `
  dlightMarkitCodeBlockTitle = css`
    font-weight: 500;
    margin-right: 10px;
  `
  dlightMarkitCodeBlock = css`
    background-color: rgba(242, 214, 159, 0.3);
    border-radius: 12px;
    font-size: 90%;
    margin: 10px 0;
  `
  dlightHomepageMarkitCode = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 16px;
    font-size: 95%;
    overflow-x: auto;
  `
  code = css`
    font-family: ui-monospace, SFMono-Regular, Menlo,Monaco, Consolas, Liberation Mono, Courier New, monospace;
    line-height: 1.25rem;
  `
  copyIcon = css`
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: rgba(250, 190, 142, 0.1); */
    /* border: 1px solid #DCDCDC; */
    /* border-radius: 6px; */
    cursor: pointer;
  `
}

export default AdvantageBlock as Pretty as Typed<AdvantageBlockProps>
