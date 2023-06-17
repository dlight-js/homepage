// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { div, Prop, Typed } from "@dlightjs/types"

class RefreshIcon extends View {
  /** @prop */
  @Prop width: Prop<number> = 22 as any
  @Prop height: Prop<number> = 22 as any
  @Prop color: Prop<string> = "black" as any
  @Prop onclick: Prop<(e: Event) => void> = (() => {}) as any

  /** @reactive */
  svg = `<svg xmlns="http://www.w3.org/2000/svg" height="${this.height}" viewBox="0 96 960 960" width="${this.width}" fill="${this.color}"><path d="M480 896q-133 0-226.5-93.5T160 576q0-133 93.5-226.5T480 256q85 0 149 34.5T740 385V256h60v254H546v-60h168q-38-60-97-97t-137-37q-109 0-184.5 75.5T220 576q0 109 75.5 184.5T480 836q83 0 152-47.5T728 663h62q-29 105-115 169t-195 64Z"/></svg>`

  /** @view */
  Body() {
    div()
      ._color(this.color)
      ._cursor("pointer")
      ._padding("5px 5px 0px 5px")
      .onclick(this.onclick)
      .innerHTML(this.svg)
  }
}

export default RefreshIcon as any as Typed<RefreshIcon>
