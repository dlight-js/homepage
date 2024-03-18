import { View, Env, Pretty, Prop, Typed, div, required } from "@dlightjs/dlight"
import { MenuRound, CloseRound } from "@dlightjs/material-icons"
import { css } from "@emotion/css"

interface ShortHeaderMenuIconProps {
  isShortHeader: boolean
  isShowMenu: boolean
  handleClickShowMenu: () => void
}

@View
class ShortHeaderMenuIcon {
  @Env theme: any = required
  @Env isMobile: boolean = required
  @Prop isShortHeader = required
  @Prop isShowMenu = required
  @Prop handleClickShowMenu = required
  Body() {
    div()
      .class(this.menuBtnWrapCss)
    {
      if (this.isShortHeader && !this.isShowMenu) {
        MenuRound()
          .class(this.iconSizeCss)
          .color(this.theme.highlightColor)
          .onClick(this.handleClickShowMenu)
      } else if (this.isShortHeader && this.isShowMenu) {
        CloseRound()
          .class(this.iconSizeCss)
          .color(this.theme.highlightColor)
          .onClick(this.handleClickShowMenu)
      }
    }
  }

  iconSizeCss = css`
    width: 25px;
    height: 25px;
    margin: 10px;
    cursor: pointer;
  `

  menuBtnWrapCss = css`
    margin-left: 10px;
  `
}

export default ShortHeaderMenuIcon as Pretty as Typed<ShortHeaderMenuIconProps>
