import { View, div, Env, Pretty, Prop, required, Typed } from "@dlightjs/dlight"
import Resizer, { OnDragFunc } from "./Resizer.view"
import { Color, dividerWidth } from "../../utils/const"
import { css } from "@emotion/css"

interface VerticalResizerProps {
  width?: string
  onDrag?: OnDragFunc
}

@View
class VerticalResizer implements VerticalResizerProps {
  /** @prop */
  @Env theme: Color = required
  @Env updateIsStartResize = required
  @Prop width = "100%"
  @Prop onDrag?: OnDragFunc
  hover: number = 0

  /** @method */
  onMouseUp() {
    if (this.hover !== 0) this.hover--
    this.updateIsStartResize(false)
  }

  handleDrag(left: number, top: number) {
    this.onDrag?.(0, top)
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
      .axis("y")
    {
      div()
        .class(this.resizerCss)
        .onMouseOver(this.onMouseOver)
        .onMouseDown(this.onMouseDown)
        .onMouseOut(this.onMouseOut)
      {
        div()
          .class(this.rowDisplayCss)
        {
          div(".")
            .class(this.dotCss)
          div(".")
            .class(this.dotCss)
          div(".")
            .class(this.dotCss)
        }
      }
    }
  }

  dotCss = css`
    margin-top: -18px;
  `

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

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    height: 100%;
  `
}

export default VerticalResizer as Pretty as Typed<VerticalResizerProps>
