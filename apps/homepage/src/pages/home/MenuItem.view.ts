import { View } from "@dlightjs/dlight"
import { type Typed, required, Prop, RequiredProp, Env } from "@dlightjs/types"
import { css, div } from "@dlightjs/easy-css"

class MenuItem extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop name: RequiredProp<string> = required
  @Prop path: RequiredProp<string> = required

  isHover = false

  Body() {
    div(this.name)
      .className(this.menuItemCss)
      .onmouseover(() => { this.isHover = true })
      .onmouseleave(() => { this.isHover = false })
      .onclick(() => {
        this.navigator.to("/" + this.path)
      })
  }

  menuItemCss = css`
    color: ${this.isHover ? this.theme.green8 : this.theme.green11};
    background-color: ${this.isHover ? this.theme.orange2 : this.theme.orange4};
    border-radius: 8px;
    padding: 10px;
    width: 150px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    cursor: pointer;
    font-size: 0.875rem;
  `
}

export default MenuItem as any as Typed<MenuItem>
