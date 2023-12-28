import { View } from "@dlightjs/dlight"
import { code, Content, ContentProp, div, pre, Pretty, Prop, required, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import hljs from "highlight.js"
import { ContentCopyFilled, DoneFilled } from "@dlightjs/material-icons"

interface AdvantageBlockProps {
  content: ContentProp<any>
  props: any
}

@View
class AdvantageBlock implements AdvantageBlockProps {
  @Content content: any = required
  @Prop props = required
  language = this.props.language
  title = this.props.title
  highlightedCode = hljs.highlight(this.content, { language: this.language.trim() === "codeTabs" ? "js" : this.language.trim() }).value
  hasCopied = false

  async handleCopy() {
    await navigator.clipboard.writeText(this.content)
    this.hasCopied = true
    setTimeout(() => {
      this.hasCopied = false
    }, 2000)
  }

  View() {
    div()
      .class(this.dlightMarkitCodeBlock)
    {
      div()
        .class(this.dlightMarkitCodeBlockHeader)
      {
        if (this.language) {
          div()
            .class(this.dlightMarkitCodeBlockTitleLanguage)
          {
            if (this.title) {
              div(this.title)
                .class(this.dlightMarkitCodeBlockTitle)
            }
          }
        }
        div()
        {
          if (!this.hasCopied) {
            div()
              .onClick(async() => {
                await this.handleCopy()
              })
              .class(this.dlightMarkitCopyBtnCss)
            {
              ContentCopyFilled()
                .color("#333333")
                .width(18)
                .height(18)
                .class(this.copyIcon)
              div("Copy")
            }
          } else if (this.hasCopied) {
            div()
              .class(this.dlightMarkitCopyBtnCss)
            {
              DoneFilled()
                .color("#333333")
                .width(18)
                .height(18)
                .class(this.copyIcon)
              div("Copied")
            }
          }
        }
      }
      div()
        .style({ position: "relative" })
      {
        div(this.language)
          .class(this.languageCss)
        div()
          .class(this.dlightHomepageMarkitCode)
        {
          pre()
          {
            code()
              .class(this.code)
              .innerHTML(this.highlightedCode)
          }
        }
      }
    }
  }

  languageCss = css`
    position: absolute;
    right: 10px;
    top: 5px;
    color: #999999;
  `

  /** @style */
  dlightMarkitCodeBlockHeader = css`
    background-color: rgba(250, 190, 142, 0.3);
    padding: 8px 16px;
    border-radius: 12px 12px 0 0;
    color: #333333;
    font-family: system-ui;
    font-size: 14px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `
  dlightMarkitCodeBlockTitleLanguage = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `
  dlightMarkitCodeBlockTitle = css`
    font-weight: 500;
    margin-right: 10px;
    font-size: 16px;
    margin-left: 10px;
  `
  dlightMarkitCopyBtnCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  `
  dlightMarkitCodeBlock = css`
    background-color: rgba(242, 214, 159, 0.3);
    border-radius: 12px;
    font-size: 15px;
    margin: 10px 0;
  `
  dlightHomepageMarkitCode = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 10px 16px;
    font-size: 95%;
    /* position: relative; */
    overflow-x: auto;
  `
  code = css`
    font-family: ui-monospace, SFMono-Regular, Menlo,Monaco, Consolas, Liberation Mono, Courier New, monospace;
    line-height: 1.25rem;
  `
  copyIcon = css`
    width: 30px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* background-color: rgba(250, 190, 142, 0.1); */
    /* border: 1px solid #DCDCDC; */
    /* border-radius: 6px; */
  `
}

export default AdvantageBlock as Pretty as Typed<AdvantageBlockProps>
