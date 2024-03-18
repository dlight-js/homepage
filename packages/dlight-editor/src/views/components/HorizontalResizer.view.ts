import { View, div, Env, Pretty, Prop, required, Typed } from "@dlightjs/dlight"
import Resizer, { OnDragFunc } from "./Resizer.view"
import { Color, dividerWidth } from "../../utils/const"
import { css } from "@emotion/css"

interface HorizontalResizerProps {
  height?: string
  onDrag?: OnDragFunc
}

@View
class HorizontalResizer implements HorizontalResizerProps {
  /** @prop */
  @Env theme: Color = required
  @Env updateIsStartResize = required
  @Prop height = "100%"
  @Prop onDrag?: OnDragFunc
  hover: number = 0

  /** @method */
  onMouseUp() {
    if (this.hover !== 0) this.hover--
    this.updateIsStartResize(false)
  }

  handleDrag(left: number) {
    this.onDrag?.(left, 0)
  }

  onMouseOver() {
    this.hover++
  }

  onMouseDown() {
    this.hover++
    this.updateIsStartResize(true)
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
        .class(this.resizerCss)
        .onMouseOver(this.onMouseOver)
        .onMouseDown(this.onMouseDown)
        .onMouseOut(this.onMouseOut)
      {
        div()
          .class(this.columnDisplayCss)
        {
          div(".")
          div(".")
          div(".")
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

  columnDisplayCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
  `
}

export default HorizontalResizer as Pretty as Typed<HorizontalResizerProps>
