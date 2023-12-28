import { View } from "@dlightjs/dlight"
import { MenuRound, AlignHorizontalLeftRound } from "@dlightjs/material-icons"
import { Env, Pretty, Prop, Typed, Watch, div, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { shortViewWidth } from "../../const/pageSetting"

interface MenuBtnProps {
  hanleClickOpenMenu?: (value: boolean) => void
  hanleClickOpenOutline?: (value: boolean) => void
  setMenuOpenBtnEl?: (el: HTMLElement) => void
  limitWidth?: number
  title?: string
}

@View
class MenuBtn implements MenuBtnProps {
  @Env windowWidth: number = required
  @Env theme: any = required
  @Env i18n: any = required
  @Prop hanleClickOpenMenu = required
  @Prop hanleClickOpenOutline = required
  @Prop setMenuOpenBtnEl = required
  @Prop limitWidth = shortViewWidth
  @Prop title = ""
  el: HTMLElement = null as any
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

  View() {
    if (this.isShow) {
      div()
        .class(this.shortViewSubHeaderWrapCss)
      {
        if (this.hanleClickOpenMenu) {
          div()
            .class(this.btnCss)
            .onClick(this.hanleClickOpenMenu)
            .element(this.el)
          {
            MenuRound()
              .class(this.iconCss)
              .color(this.theme.green9)
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
        if (this.hanleClickOpenOutline) {
          div()
            .class(this.btnCss)
            .onClick(this.hanleClickOpenOutline)
          {
            div(this.i18n("Outline", "大纲"))
            AlignHorizontalLeftRound()
              .class(this.iconCss)
              .color(this.theme.green9)
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
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* color: rgba(82,110,52,0.7); */
    color: ${this.theme.green9};
    padding: 0 10px;
    box-shadow: 0 1px 5px -3px ${this.theme.shadowColor};
    background-color: ${this.theme.primaryBgColor};
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
