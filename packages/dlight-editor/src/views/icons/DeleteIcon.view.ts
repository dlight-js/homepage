// eslint-disable-next-line @typescript-eslint/no-unused-vars
import DLight, { View } from "@dlightjs/dlight"
import { div, Env, Prop, required, Typed } from "@dlightjs/types"
import { css } from "@dlightjs/emotion"

class DeleteIcon extends View {
  /** @prop */
  @Prop width: Prop<number> = 16 as any
  @Prop height: Prop<number> = 16 as any
  @Prop onclick: Prop<(e: Event) => any> = (() => {}) as any
  @Env theme = required

  /** @reactive */
  svg = `<svg xmlns="http://www.w3.org/2000/svg" height="${this.height}" fill="${this.theme?.primary ?? "black"}" viewBox="0 96 960 960" width="${this.width}"><path d="m249 849-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z"/></svg>`

  /** @view */
  Body() {
    div()
      .className(this.iconCss)
      .onclick(this.onclick)
      .innerHTML(this.svg)
  }

  /** @style */
  iconCss = css`
    height: 16px;
    cursor: pointer;
    padding-left: 5px;
  `
}

export default DeleteIcon as any as Typed<DeleteIcon>
