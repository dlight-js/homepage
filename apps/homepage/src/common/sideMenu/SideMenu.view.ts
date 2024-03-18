import { View, type Typed, div, Pretty, Children, Env, Prop, Watch, required } from "@dlightjs/dlight"
import { Navigator } from "@dlightjs/components"
import { css } from "@emotion/css"
import { shortViewWidth } from "../../const/pageSetting"

interface SideMenuProps {
  isOpen: boolean
  closeMenu: () => void
  limitWidth?: number
  menuElement?: string
}

@View
class SideMenu implements SideMenuProps {
  @Env navigator: Navigator = required
  @Env themeType: "light" | "dark" = required
  @Env isShortView: boolean = required
  @Env theme: any = required
  @Env i18n: any = required
  @Env windowWidth: number = required
  @Prop limitWidth = shortViewWidth
  @Prop isOpen = false
  @Prop closeMenu = required
  @Prop menuElement = ""
  @Children children: any
  isShortStyle = false

  closeMenuWhenClickOutside(e: any) {
    const specificParent = e.target.closest(this.menuElement)
    if (!specificParent) {
      this.closeMenu()
    }
  }

  @Watch
  handleWindowResize() {
    if (this.windowWidth < this.limitWidth) {
      this.isShortStyle = true
    } else {
      if (this.isOpen) {
        this.closeMenu()
      }
      this.isShortStyle = false
    }
  }

  willMount() {
    window.addEventListener("click", this.closeMenuWhenClickOutside.bind(this))
  }

  willUnmount() {
    window.removeEventListener("click", this.closeMenuWhenClickOutside.bind(this))
  }

  Body() {
    div()
      .class(this.sideMenuWrapCss)
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
