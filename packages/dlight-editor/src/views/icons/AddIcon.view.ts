import DLight, { View } from "@dlightjs/dlight"
import { div, Env, Prop, required, Typed } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"

class AddIcon extends View {
  /** @prop */
  @Prop width: Prop<number> = 18 as any
  @Prop height: Prop<number> = 18 as any
  @Prop onclick: Prop<() => any> = (() => {}) as any
  @Env theme = required

  /** @reactive */
  svg = `<svg xmlns="http://www.w3.org/2000/svg" height="${this.height}" viewBox="0 96 960 960" fill="${this.theme?.primary ?? "black"}" width="${this.width}"><path d="M450 856V606H200v-60h250V296h60v250h250v60H510v250h-60Z"/></svg>`

  /** @view */
  Body() {
    div()
      .className(this.iconCss)
      .onclick(this.onclick)
      .innerHTML(this.svg)
  }

  /** @style */
  iconCss = css`
    height: 18px;
    cursor: pointer;
  `
}

export default AddIcon as any as Typed<AddIcon>
