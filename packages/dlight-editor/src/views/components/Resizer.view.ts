import DLight, { View, $ } from "@dlightjs/dlight"
import { div, Prop, type Typed, _ } from "@dlightjs/types"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

class Resizer extends View {
  /** @prop */
  @Prop onDrag: Prop<OnDragFunc> = (() => {}) as any
  @Prop axis: Prop<DragAxis> = "all" as any

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
  onMouseMove = $((e: MouseEvent) => {
    if (!this.startDrag) return
    const x = this.axises.includes("x") ? e.clientX - this.offsetX : 0
    const y = this.axises.includes("y") ? e.clientY - this.offsetY : 0
    this.offsetX = e.clientX
    this.offsetY = e.clientY
    this.onDrag(x, y)
  })

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
      ._width("8px")
      ._backgroundColor("gray")
    {
      _(this._$children)
    }
  }
}

export default Resizer as any as Typed<Resizer>
