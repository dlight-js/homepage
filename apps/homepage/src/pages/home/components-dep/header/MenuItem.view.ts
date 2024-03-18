import { View, type Typed, Pretty, div, Env, Prop, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { Navigator } from "@dlightjs/components"

interface MenuItemProps {
  name: string
  path: string
}

@View
class MenuItem implements MenuItemProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Prop name = required
  @Prop path = required

  isHover = false

  Body() {
    div(this.name)
      .class(this.menuItemCss)
      .onMouseOver(() => { this.isHover = true })
      .onMouseLeave(() => { this.isHover = false })
      .onClick(() => {
        this.navigator.to(this.path)
      })
  }

  menuItemCss = css`
    color: ${this.isHover ? this.theme.textColor : this.theme.textColor};
    background-color: ${this.isHover ? this.theme.hoverColor : this.theme.activeColor};
    border-radius: 8px;
    padding: 10px;
    width: 150px;
    cursor: pointer;
    font-size: 0.875rem;
  `
}

export default MenuItem as Pretty as Typed<MenuItemProps>
