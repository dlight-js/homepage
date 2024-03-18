import { View, Env, Pretty, Prop, Typed, Watch, div, required } from "@dlightjs/dlight"
import { MenuRound, AlignHorizontalLeftRound } from "@dlightjs/material-icons"
import { css } from "@emotion/css"
import { shortViewWidth } from "../../const/pageSetting"

interface MenuBtnProps {
  handleClickOpenMenu?: (value: boolean) => void
  handleClickOpenOutline?: (value: boolean) => void
  setMenuOpenBtnEl?: (el: HTMLElement) => void
  limitWidth?: number
  title?: string
}

@View
class MenuBtn implements MenuBtnProps {
  @Env windowWidth: number = required
  @Env theme: any = required
  @Env i18n: any = required
  @Prop handleClickOpenMenu = required
  @Prop handleClickOpenOutline = required
  @Prop setMenuOpenBtnEl = required
  @Prop limitWidth = shortViewWidth
  @Prop title = ""
  el: HTMLDivElement = null as any
  isShow: boolean = this.windowWidth < this.limitWidth

  didMount() {
    if (this.setMenuOpenBtnEl) {
      this.setMenuOpenBtnEl(this.el)
    }
  }

  @Watch
  handleWindowResize() {
    if (this.windowWidth < this.limitWidth && !this.isShow) {
      this.isShow = true
    } else if (this.isShow && this.windowWidth >= this.limitWidth) {
      this.isShow = false
    }
  }

  Body() {
    if (this.isShow) {
      div()
        .class(this.shortViewSubHeaderWrapCss)
      {
        if (this.handleClickOpenMenu) {
          div()
            .class(this.btnCss)
            .onClick(this.handleClickOpenMenu)
            .ref(this.el)
          {
            MenuRound()
              .class(this.iconCss)
              .color(this.theme.textColor)
              .width(16)
            div(this.i18n("Menu", "菜单"))
          }
        }
        if (this.title) {
          div()
            .class(this.titleCss)
          {
            div(this.title)
          }
        }
        if (this.handleClickOpenOutline) {
          div()
            .class(this.btnCss)
            .onClick(this.handleClickOpenOutline)
          {
            div(this.i18n("Outline", "大纲"))
            AlignHorizontalLeftRound()
              .class(this.iconCss)
              .color(this.theme.textColor)
              .width(16)
          }
        }
      }
    }
  }

  shortViewSubHeaderWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${this.theme.textColor};
    padding: 0 10px;
    box-shadow: 0 1px 5px -3px ${this.theme.shadowColor};
    background-color: ${this.theme.bgColor};
  `

  titleCss = css`
    flex: 1;
    margin: auto 10px;
    font-weight: 600;
  `

  btnCss = css`
    margin: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  `

  iconCss = css`
    padding-top: 4px;
    margin: 0 8px;
  `
}

export default MenuBtn as Pretty as Typed<MenuBtnProps>
