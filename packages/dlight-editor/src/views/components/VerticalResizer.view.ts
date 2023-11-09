import { Env, Prop, View, required } from "@dlightjs/dlight"
import { div, Pretty, Typed } from "@dlightjs/types"
import Resizer, { OnDragFunc } from "./Resizer.view"
import { Color, dividerWidth } from "../../utils/const"
import { HStack, Spacer } from "@dlightjs/components"
import { css } from "@iandx/easy-css"

interface VerticalResizerProps {
  width?: string
  onDrag?: OnDragFunc
}

@View
class VerticalResizer implements VerticalResizerProps {
  /** @prop */
  @Env theme: Color = required
  @Prop width = "100%"
  @Prop onDrag?: OnDragFunc
  hover: number = 0

  /** @method */
  onMouseUp() {
    if (this.hover !== 0) this.hover--
  }

  handleDrag(left: number, top: number) {
    this.onDrag?.(0, top)
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
      .axis("y")
    {
      div()
        .className(this.resizerCss)
        .onmouseover(this.onMouseOver)
        .onmousedown(this.onMouseDown)
        .onmouseout(this.onMouseOut)
      {
        HStack()
          .alignment("top")
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
    /* line-height: 5px; */
    font-size: 25px;
    cursor: row-resize;
    height: ${dividerWidth}px;
    width: ${this.width};
    background-color: ${this.hover !== 0 ? "#0077be" : this.theme.secondary};
    text-align: center;
    overflow: auto;
  `
}

export default VerticalResizer as Pretty as Typed<VerticalResizerProps>
