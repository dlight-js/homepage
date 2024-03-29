import { View, div, Typed, Pretty, Env, Prop, required, Snippet } from "@dlightjs/dlight"
import ResultView from "./Result.view"
import OutputView from "./Output.view"
import ConsoleView from "./Console.view"
import { RefreshFilled } from "@dlightjs/material-icons"
import { css } from "@emotion/css"
import { Color, dividerWidth, headerHeight } from "../../utils/const"
import VerticalResizer from "../components/VerticalResizer.view"
import clsx from "clsx"

interface PreviewProps {
  currTransformedCode: string
  refreshFunc: () => void
  width: string
  verticalHeight: string
}

@View
class Preview implements PreviewProps {
  /** @prop */
  @Prop currTransformedCode: string = required
  @Prop refreshFunc: () => void = required
  @Prop width: string = required
  @Prop verticalHeight: string = required
  @Env theme: Color = required
  @Env height: string = required
  wrapperEl: HTMLDivElement | undefined = undefined
  onClick = false

  /** @reactive */
  tab: "Result" | "Output" = "Result"

  consoleHeight = "35%"
  previewHeight = `calc(65% - ${dividerWidth}px - ${headerHeight}px)`

  /** @method */
  handleVerticalResizerDrag(x: number, y: number) {
    const fullHeight = this.wrapperEl!.offsetHeight
    this.consoleHeight = `${-y / fullHeight * 100 + +this.consoleHeight.slice(0, -1)}%`
    const consoleHeight = +this.consoleHeight.slice(0, -1)
    if (consoleHeight < 10) {
      this.consoleHeight = "10%"
    } else if (consoleHeight > 80) {
      this.consoleHeight = "80%"
    }
    this.previewHeight = `calc(${100 - +this.consoleHeight.slice(0, -1)}% - ${dividerWidth}px - ${headerHeight}px)`
  }

  /** @view */
  @Snippet
  Head({ content }: any): any {
    div(content)
      .class(this.headerCss)
      .style({
        borderBottom: content === this.tab ? `3px solid ${this.theme.text}` : ""
      })
      .onClick(() => {
        this.tab = content
      })
  }

  @Snippet
  Header() {
    div()
      .class(this.headerBGCss)
    {
      div()
      {
        RefreshFilled()
          .title("To refresh, press cmd(Mac)/ctrl(Win) s")
          .class(clsx(this.iconCss, this.onClick ? this.rotateCss : ""))
          .color(this.theme.text)
          .onClick(() => {
            this.onClick = true
            this.refreshFunc()
            setTimeout(() => {
              this.onClick = false
            }, 200)
          })
      }
      this.Head("Result")
      this.Head("Output")
    }
  }

  Body() {
    div()
      .id("dlight-playground-preview")
      .class(this.wrapperCss)
      .style({
        width: this.width
      })
      .ref(this.wrapperEl)
    {
      this.Header()
      div()
        .class(this.previewWrapperCss)
      {
        div()
          .style({
            display: this.tab === "Result" ? "block" : "none"
          })
          .class(this.resultWrapperCss)
        {
          ResultView()
        }
        div()
          .style({
            display: this.tab === "Output" ? "block" : "none"
          })
        {
          OutputView()
            .code(this.currTransformedCode)
        }
      }
      VerticalResizer()
        .onDrag(this.handleVerticalResizerDrag.bind(this))
      ConsoleView()
        .height(this.consoleHeight)
    }
  }

  /** @style */
  wrapperCss = css`
    flex-grow: 1;
    height: ${this.verticalHeight ?? this.height};
    overflow: hidden;
  `

  resultWrapperCss = css`
    height: 100%;
  `

  headerBGCss = css`
    background-color: ${this.theme.background};
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `

  headerCss = css`
    box-sizing: border-box;
    display: inline-block;
    text-align: center;
    line-height: ${headerHeight}px;
    background-color: ${this.theme.background};
    color: ${this.theme.text};
    font-size: 17px;
    height: ${headerHeight}px;
    cursor: pointer;
    flex-grow: 1;
  `

  iconCss = css`
    display: inline-block;
    margin: 0 5px;
    cursor: pointer;
    transition: all 0.2s;
  `

  rotateCss = css`
    transform: rotate(60deg);
  `

  previewWrapperCss = css`
    height: ${this.previewHeight};
    overflow: scroll;
  `
}

export default Preview as Pretty as Typed<PreviewProps>
