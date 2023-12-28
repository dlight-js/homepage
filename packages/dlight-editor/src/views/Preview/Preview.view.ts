import { View } from "@dlightjs/dlight"
import { div, button, Typed, Pretty, Env, Prop, required } from "@dlightjs/types"
import ResultView from "./Result.view"
import OutputView from "./Output.view"
import { RefreshFilled } from "@dlightjs/material-icons"
import { css } from "@iandx/easy-css"
import { Color, headerHeight } from "../../utils/const"

interface PreviewProps {
  mountId: string
  currTransformedCode: string
  refreshFunc: () => void
  width: string
  verticalHeight: string
}

@View
class Preview implements PreviewProps {
  /** @prop */
  @Prop mountId: string = required
  @Prop currTransformedCode: string = required
  @Prop refreshFunc: () => void = required
  @Prop width: string = required
  @Prop verticalHeight: string = required
  @Env theme: Color = required
  @Env height: string = required

  /** @reactive */
  tab: "result" | "output" = "result"

  /** @lifecycle */

  /** @view */
  @View
  Head({ content }: any): any {
    button(content)
      .class(this.headerCss)
      .style({
        borderBottom: content === this.tab ? `3px solid ${this.theme.text}` : ""
      })
      .onClick(() => {
        this.tab = content
      })
  }

  @View
  Header() {
    div()
      .class(this.headerBGCss)
    {
      div()
        .class(this.rowDisplayCss)
      {
        div()
          .onClick(this.refreshFunc)
          .class(this.refreshIconCss)
        {
          RefreshFilled()
            .class(this.refreshIconCss)
            .color(this.theme.primary)
        }

        this.Head("result")
        this.Head("output")
      }
    }
  }

  View() {
    div()
      .id("dlight-playground-preview")
      .class(this.wrapperCss)
      .style({
        width: this.width
      })
    {
      this.Header()
      div()
        .style({
          height: `calc(100% - ${headerHeight}px)`,
          overflow: "scroll"
        })
      {
        div()
          .style({
            display: this.tab === "result" ? "block" : "none"
          })
        {
          ResultView()
            .mountId(this.mountId)
        }
        div()
          .style({
            display: this.tab === "output" ? "block" : "none"
          })
        {
          OutputView()
            .code(this.currTransformedCode)
        }
      }
    }
  }

  /** @style */
  wrapperCss = css`
    flex-grow: 1;
    height: ${this.verticalHeight ?? this.height};
    overflow: hidden;
  `

  headerBGCss = css`
    background-color: ${this.theme.background};
    height: ${headerHeight}px;
    overflow: hidden;
  `

  headerCss = css`
    padding: 2px 0px 5px 0px;
    border-width: 0;
    background-color: ${this.theme.background};
    color: ${this.theme.text};
    font-size: 17px;
    height: ${headerHeight}px;
    cursor: pointer;
    width: calc(50% - 16px);
  `

  refreshIconCss = css`
    padding: 5px 5px 0 5px;
    cursor: pointer;
  `

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `
}

export default Preview as Pretty as Typed<PreviewProps>
