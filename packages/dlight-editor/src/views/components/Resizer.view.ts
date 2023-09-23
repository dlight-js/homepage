import { View } from "@dlightjs/dlight"
import { Prop, type Typed, _, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

interface ResizerProps {
  onDrag?: OnDragFunc
  axis?: DragAxis
}

class Resizer extends View implements ResizerProps {
  /** @prop */
  @Prop onDrag?: OnDragFunc
  @Prop axis: DragAxis = "all"

  axises = (() => {
    const axises: Array<"x" | "y"> = []
    if (["x", "all"].includes(this.axis)) axises.push("x")
    if (["Y", "all"].includes(this.axis)) axises.push("y")
    return axises
  })()

  /** @reactive */
  startDrag = false

  /** @member */
  draggableEl?: HTMLDivElement
  offsetX = 0
  offsetY = 0

  /** @func */
  onMouseMove(e: MouseEvent) {
    if (!this.startDrag) return
    const x = this.axises.includes("x") ? e.clientX - this.offsetX : 0
    const y = this.axises.includes("y") ? e.clientY - this.offsetY : 0
    this.offsetX = e.clientX
    this.offsetY = e.clientY
    this.onDrag?.(x, y)
  }

  onMouseUp = () => {
    this.startDrag = false
  }

  onMouseDown = (e: MouseEvent) => {
    e.preventDefault()
    this.offsetX = e.clientX
    this.offsetY = e.clientY
    const draggableEl = e.currentTarget as HTMLDivElement
    this.startDrag = true
    draggableEl.focus()
  }

  /** @lifecycle */
  didMount() {
    document.addEventListener("mousemove", this.onMouseMove)
    document.addEventListener("mouseup", this.onMouseUp)
  }

  willUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove)
    document.removeEventListener("mouseup", this.onMouseUp)
  }

  /** @view */
  Body() {
    div()
      .element(this.draggableEl)
      .onmousedown(this.onMouseDown)
      .className(this.resizerCss)
    {
      _(this._$children)
    }
  }

  resizerCss = css`
    width: 8px;
    background-color: gray;
  `
}

export default Resizer as Pretty as Typed<ResizerProps>
