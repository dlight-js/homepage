import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div, Env, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
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

  View() {
    div(this.name)
      .class(this.menuItemCss)
      .onMouseOver(() => { this.isHover = true })
      .onMouseLeave(() => { this.isHover = false })
      .onClick(() => {
        this.navigator.to(this.path)
      })
  }

  menuItemCss = css`
    color: ${this.isHover ? this.theme.green8 : this.theme.green11};
    background-color: ${this.isHover ? this.theme.homeBtnColorHover : this.theme.homeBtnColor};
    border-radius: 8px;
    padding: 10px;
    width: 150px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    cursor: pointer;
    font-size: 0.875rem;
  `
}

export default MenuItem as Pretty as Typed<MenuItemProps>
