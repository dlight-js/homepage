import { View } from "@dlightjs/dlight"
import { div, button, Typed, Pretty, Env, Prop, required } from "@dlightjs/types"
import ResultView from "./Result.view"
import OutputView from "./Output.view"
import ConsoleView from "./Console.view"
import { RefreshFilled } from "@dlightjs/material-icons"
import { css } from "@iandx/easy-css"
import { Color, dividerWidth, headerHeight } from "../../utils/const"
import VerticalResizer from "../components/VerticalResizer.view"

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
  wrapperEl: HTMLElement | undefined = undefined

  /** @reactive */
  tab: "result" | "output" = "result"

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
          .class(this.iconCss)
        {
          RefreshFilled()
            .class(this.iconCss)
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
      .element(this.wrapperEl)
    {
      this.Header()
      div()
        .class(this.previewWrapperCss)
      {
        div()
          .style({
            display: this.tab === "result" ? "block" : "none",
            height: this.previewHeight
          })
        {
          ResultView()
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

  iconCss = css`
    padding: 5px 5px 0 5px;
    cursor: pointer;
  `

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `

  previewWrapperCss = css`
    height: ${this.previewHeight};
    overflow: scroll;
  `
}

export default Preview as Pretty as Typed<PreviewProps>
