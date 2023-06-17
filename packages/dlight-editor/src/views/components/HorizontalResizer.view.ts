import DLight, { View, $ } from "@dlightjs/dlight"
import { div, Env, Prop, required, Typed } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"
import Resizer, { OnDragFunc } from "./Resizer.view"
import { Color, dividerWidth } from "../../utils/const"
import { Spacer, VStack } from "@dlightjs/components"

class HorizontalResizer extends View {
  /** @prop */
  @Env theme: Color = required
  @Prop height: Prop<string> = "100%" as any
  @Prop onDrag: Prop<OnDragFunc> = (() => {}) as any
  hover: number = 0

  onMouseUp() {
    if (this.hover !== 0) this.hover--
  }

  didMount() {
    document.addEventListener("mouseup", this.onMouseUp.bind(this))
  }

  willUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp.bind(this))
  }

  /** @func */
  Body() {
    Resizer()
      .onDrag($((left, _right) => this.onDrag(left, 0)))
      .axis("x")
    {
      div()
        .className(this.horizontalResizerCss)
        .onmouseover(() => { this.hover++ })
        .onmousedown(() => { this.hover++ })
        .onmouseout(() => { this.hover-- })
      {
        VStack()
        {
          Spacer()
          div(".")
          div(".")
          div(".")
          Spacer()
        }
      }
    }
  }

  /** @style */
  horizontalResizerCss = css`
    color: ${this.theme.secondaryText};
    line-height: 5px;
    font-size: 25px;
    cursor: col-resize;
    width: ${dividerWidth}px;
    height: ${this.height};
    background-color: ${this.hover !== 0 ? "#0077be" : this.theme.secondary};
    text-align: center;
    overflow: auto;
  `
}

export default HorizontalResizer as any as Typed<HorizontalResizer>
