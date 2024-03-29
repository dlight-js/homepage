import { View, Env, Pretty, Prop, Typed, div, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { Navigator } from "@dlightjs/components"

interface ShortHeaderMenuItemProps {
  btnName: string
  btnPath: string
  handleClickShowMenu: () => void
}

@View
class ShortHeaderMenuItem {
  @Env theme: any = required
  @Env navigator: Navigator = required
  @Env path: string = required
  @Prop btnName = required
  @Prop btnPath = required
  @Prop handleClickShowMenu = required
  isSelected = this.btnName === "Documents" ? this.path.includes("docs") : this.path.includes(this.btnPath.replace("/", ""))
  isHover = false
  Body() {
    div(this.btnName)
      .class(this.menuBtnCss)
      .onClick(() => { this.navigator.to(this.btnPath); this.handleClickShowMenu() })
      .onMouseEnter(() => { this.isHover = true })
      .onMouseLeave(() => { this.isHover = false })
  }

  menuBtnCss = css`
    font-size: 20px;
    line-height: 30px;
    padding: 10px 20px;
    background-color: ${this.isHover || this.isSelected ? this.theme.hoverColor : ""};
    border-radius: 5px;
    color: ${this.theme.textColor};
    cursor: pointer;
  `
}

export default ShortHeaderMenuItem as Pretty as Typed<ShortHeaderMenuItemProps>
