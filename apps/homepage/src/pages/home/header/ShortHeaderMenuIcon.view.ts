import { View } from "@dlightjs/dlight"
import { MenuRound, CloseRound } from "@dlightjs/material-icons"
import { Env, Pretty, Prop, Typed, div, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface ShortHeaderMenuIconProps {
  isShortHeader: boolean
  isShowMenu: boolean
  handleClickShowMenu: () => void
}

class ShortHeaderMenuIcon extends View {
  @Env theme: any = required
  @Env isMobile: boolean = required
  @Prop isShortHeader = required
  @Prop isShowMenu = required
  @Prop handleClickShowMenu = required
  Body() {
    div()
      .className(this.menuBtnWrapCss)
    {
      if (this.isShortHeader && !this.isShowMenu) {
        MenuRound()
          .className(this.iconSizeCss)
          .color(this.theme.green9)
          .ontouchstart(() => {
            if (this.isMobile) this.handleClickShowMenu()
          })
          .onclick(() => {
            if (!this.isMobile) this.handleClickShowMenu()
          })
      } else if (this.isShortHeader && this.isShowMenu) {
        CloseRound()
          .className(this.iconSizeCss)
          .color(this.theme.green9)
          .ontouchstart(() => {
            if (this.isMobile) this.handleClickShowMenu()
          })
          .onclick(() => {
            if (!this.isMobile) this.handleClickShowMenu()
          })
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
