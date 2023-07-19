import { View } from "@dlightjs/dlight"
import { Env, Prop, required, Typed } from "@dlightjs/types"
import { div } from "@dlightjs/easy-css"
import Resizer, { OnDragFunc } from "./Resizer.view"
import { Color, dividerWidth } from "../../utils/const"
import { Spacer, VStack } from "@dlightjs/components"

class HorizontalResizer extends View {
  /** @prop */
  @Env theme: Color = required
  @Prop height: Prop<string> = "100%" as any
  @Prop onDrag: Prop<OnDragFunc> = (() => {}) as any
  hover: number = 0

  /** @method */
  onMouseUp() {
    if (this.hover !== 0) this.hover--
  }

  handleDrag(left: number) {
    this.onDrag(left, 0)
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
        .color(this.theme.secondaryText)
        .lineHeight("5px")
        .fontSize("25px")
        .cursor("col-resize")
        .width(`${dividerWidth}px`)
        .height(this.height)
        .backgroundColor(this.hover !== 0 ? "#0077be" : this.theme.secondary)
        .textCenter()
        .overflow("auto")
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
}

export default HorizontalResizer as any as Typed<HorizontalResizer>
