import { View } from "@dlightjs/dlight"
import { div, Pretty, Typed } from "@dlightjs/types"
import Resizer, { OnDragFunc } from "./Resizer.view"
import { Color, dividerWidth } from "../../utils/const"
import { Spacer, VStack } from "@dlightjs/components"
import { css } from "@iandx/easy-css"

interface HorizontalResizerProps {
  height?: string
  onDrag?: OnDragFunc
}

@View
class HorizontalResizer implements HorizontalResizerProps {
  /** @prop */
  @Env theme: Color = required
  @Prop height = "100%"
  @Prop onDrag?: OnDragFunc
  hover: number = 0

  /** @method */
  onMouseUp() {
    if (this.hover !== 0) this.hover--
  }

  handleDrag(left: number) {
    this.onDrag?.(left, 0)
  }

  onMouseOver() {
    this.hover++
  }

  onMouseDown() {
    this.hover++
  }

  onMouseOut() {
    this.hover--
  }

  /** @lifecycle */
  didMount() {
    document.addEventListener("mouseup", this.onMouseUp)
  }

  willUnmount() {
    document.removeEventListener("mouseup", this.onMouseUp)
  }

  /** @func */
  Body() {
    Resizer()
      .onDrag(this.handleDrag)
      .axis("x")
    {
      div()
        .className(this.resizerCss)
        .onmouseover(this.onMouseOver)
        .onmousedown(this.onMouseDown)
        .onmouseout(this.onMouseOut)
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

  resizerCss = css`
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

export default HorizontalResizer as Pretty as Typed<HorizontalResizerProps>
