import DLight, { View } from "@dlightjs/dlight"
import { button, div, Env, Prop, required, RequiredProp, SubView, Typed } from "@dlightjs/types"
import ResultView from "./Result.view"
import OutputView from "./Output.view"
import { HStack } from "@dlightjs/components"
import RefreshIcon from "../icons/RefreshIcon.view"
import { css } from "@dlightjs/emotion"
import { Color, headerHeight } from "../../utils/const"

class Preview extends View {
  /** @prop */
  @Prop mountId: RequiredProp<string> = required
  @Prop currTransformedCode: RequiredProp<string> = required
  @Prop refreshFunc: RequiredProp<() => void> = required
  @Prop width: RequiredProp<string> = required
  @Env theme: Color = required
  @Env height: string = required

  /** @reactive */
  tab: "result" | "output" = "result"

  /** @lifecycle */

  /** @view */
  @SubView
  Head({ _$content }: any): any {
    button(_$content)
      .className(this.headerCss)
      ._borderBottom(_$content === this.tab ? `3px solid ${this.theme.text}` : "")
      .onclick(() => {
        this.tab = _$content
      })
  }

  @SubView
  Header() {
    div()
      .className(this.headerBGCss)
    {
      HStack()
        .spacing(0)
        .alignment("center")
      {
        RefreshIcon()
          .onclick(this.refreshFunc)
          .color(this.theme.text)
        this.Head("result")
        this.Head("output")
      }
    }
  }

  Body() {
    div()
      .id("dlight-playground-preview")
      .className(this.wrapperCss)
      ._width(this.width)
    {
      this.Header()
      div()
        ._display(this.tab === "result" ? "block" : "none")
      {
        ResultView()
          .mountId(this.mountId)
      }
      div()
        ._display(this.tab === "output" ? "block" : "none")
      {
        OutputView()
          .code(this.currTransformedCode)
      }
    }
  }

  /** @style */
  wrapperCss = css`
    flex-grow: 1;
    height: ${this.height};
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
}

export default Preview as any as Typed<Preview>
