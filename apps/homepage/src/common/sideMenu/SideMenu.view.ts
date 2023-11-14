import { Env, Prop, View, required, Children, Watch, _ } from "@dlightjs/dlight"
import { type Typed, div, Pretty } from "@dlightjs/types"
import { Navigator } from "@dlightjs/components"
import { css } from "@iandx/easy-css"
import { shortViewWidth } from "../../const/pageSetting"

interface SideMenuProps {
  isOpen: boolean
  updateOpenMenuStatus: () => void
  limitWidth?: number
  menuOpenBtnEl?: HTMLElement
}

@View
class SideMenu implements SideMenuProps {
  @Children children: any
  @Env navigator: Navigator = required
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env i18n: any = required
  @Env windowWidth: number = required
  @Prop menuOpenBtnEl = undefined
  @Prop limitWidth = shortViewWidth
  @Prop isOpen = false
  @Prop updateOpenMenuStatus = required
  isShortStyle = false

  closeMenu(e: any) {
    if (this.isOpen && e.target !== this.menuOpenBtnEl) {
      this.updateOpenMenuStatus()
    }
  }

  willMount() {
    document.addEventListener("click", this.closeMenu.bind(this), true)
  }

  willunMount() {
    document.removeEventListener("click", this.closeMenu.bind(this))
  }

  @Watch
  handleWindowResize() {
    if (this.windowWidth < this.limitWidth) {
      this.isShortStyle = true
    } else {
      if (this.isOpen) {
        this.updateOpenMenuStatus()
      }
      this.isShortStyle = false
    }
  }

  Body() {
    div()
      .className(this.sideMenuWrapCss)
    {
      if (!this.isShortStyle || this.isOpen) {
        this.children
      }
    }
  }

  sideMenuWrapCss = css`
    width: max-content;
    position: ${this.isOpen ? "absolute" : "default"};
    height: max-content;
    z-index: ${this.isOpen ? 50 : ""};
  `
}

export default SideMenu as Pretty as Typed<SideMenuProps>
