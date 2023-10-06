import { View, Children, Prop } from "@dlightjs/dlight"
import { type Typed, _, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

export type OnDragFunc = (x: number, y: number) => void
export type DragAxis = "x" | "y" | "all"

interface ResizerProps {
  onDrag?: OnDragFunc
  axis?: DragAxis
}

@View
class Resizer implements ResizerProps {
  @Children children: any
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
  startTouchDrag = false

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

  onTouchMove(e: TouchEvent) {
    if (!this.startTouchDrag) return
    // const x = this.axises.includes("x") ? e.clientX - this.offsetX : 0
    // const y = this.axises.includes("y") ? e.clientY - this.offsetY : 0
    // this.offsetX = e.clientX
    // this.offsetY = e.clientY
    // this.onDrag?.(x, y)
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

  onTouchStart(e: TouchEvent) {
    e.preventDefault()
    const draggableEl = e.targetTouches[0]
    this.offsetX = draggableEl.pageX
    this.offsetY = draggableEl.pageY
    console.log(draggableEl)
    // draggableEl.focus()
    this.startTouchDrag = true
  }

  /** @lifecycle */
  didMount() {
    document.addEventListener("mousemove", this.onMouseMove)
    document.addEventListener("touchmove", this.onTouchMove)
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
      _(this.children)
    }
  }

  resizerCss = css`
    width: 8px;
    background-color: gray;
  `
}

export default Resizer as Pretty as Typed<ResizerProps>
