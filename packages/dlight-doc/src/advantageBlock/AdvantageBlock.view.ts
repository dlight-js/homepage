import DLight, { View } from "@dlightjs/dlight"
import { code, div, pre, Prop, required, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import hljs from "highlight.js"
import { ContentCopyFilled, DoneFilled } from "@dlightjs/material-icons"

class AdvantageBlock extends View {
  @Prop _$content = required
  @Prop props = required
  language = this.props.language
  title = this.props.title
  highlightedCode = hljs.highlight(this._$content, { language: this.language.trim() }).value
  hoverState = true
  hasCopied = false

  async handleCopy() {
    await navigator.clipboard.writeText(this._$content)
    this.hasCopied = true
  }

  Body() {
    div()
      .className(this.dlightMarkitCodeBlock)
    {
      if (this.title) {
        div(this.title)
          .className(this.dlightMarkitCodeBlockHeader)
      }
      div()
        .className(this.dlightMarkitCode)
        .onmouseover(() => { this.hoverState = true })
        .onmouseleave(() => { this.hoverState = false; this.hasCopied = false })
      {
        pre()
        {
          code()
            .className(this.code)
            .innerHTML(this.highlightedCode)
        }
        if (this.hoverState && !this.hasCopied) {
          ContentCopyFilled()
            .color("#999999")
            .width("18px")
            .height("18px")
            .className(this.copyIcon)
            .onclick(this.handleCopy.bind(this))
        } else if (this.hoverState && this.hasCopied) {
          DoneFilled()
            .color("#999999")
            .width("18px")
            .height("18px")
            .className(this.copyIcon)
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
  `
  dlightMarkitCodeBlock = css`
    background-color: rgba(242, 214, 159, 0.3);
    border-radius: 12px;
    font-size: 90%;
    margin: 10px;
  `
  dlightMarkitCode = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    padding: 0 16px 16px 16px;
    font-size: 95%;
  `
  code = css`
    font-family: ui-monospace, SFMono-Regular, Menlo,Monaco, Consolas, Liberation Mono, Courier New, monospace;
    line-height: 1.25rem;
  `
  copyIcon = css`
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(250, 190, 142, 0.1);
    border: 1px solid #DCDCDC;
    border-radius: 6px;
    cursor: pointer;
    margin-top: 10px;
  `
}

export default AdvantageBlock as any as Typed<AdvantageBlock>
