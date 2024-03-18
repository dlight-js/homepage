import { View, type Typed, div, Pretty, Env, Prop, required } from "@dlightjs/dlight"
import NavButton from "./NavButton.view"
import { css } from "@emotion/css"
import { Navigator } from "@dlightjs/components"
import { HeaderData } from "../../../../const/homeData"
import { getSize } from "../../../../utils/utilFunc"
import RightSetting from "./RightSetting.view"
import ShortHeaderMenu from "./ShortHeaderMenu.view"
import AnimatedLogo from "./AnimatedLogo.view"
import ShortHeaderMenuIcon from "./ShortHeaderMenuIcon.view"

interface HeaderProps {
  handleClickNav: (tabKey: string) => void
  themeType: string
  handleChangeTitleStyle: (value: boolean) => void
}

@View
class Header implements HeaderProps {
  @Env navigator: Navigator = required
  @Env path = required
  @Env theme: any = required
  @Env isShortView: boolean = required
  @Env windowWidth: number = required
  @Env i18n: any = required
  @Prop handleClickNav = required
  @Prop themeType = required
  @Prop handleChangeTitleStyle = required
  navBtn = HeaderData
  isNeedAnimation = this.path !== undefined && this.path.trim() === ""
  style2 = !this.isNeedAnimation
  isShowShadow = !this.isNeedAnimation
  isCenterTitle = window.innerWidth < 1019
  isShowMenu = false

  didMount() {
    window.onscroll = this.isNeedAnimation ? this.listenScroll : null
  }

  willUnmount() {
    window.onscroll = null
  }

  listenScroll() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    if (scrollTop > 0) {
      this.style2 = true
      setTimeout(() => {
        this.isShowShadow = true
      }, 10)
    }
    if (this.style2 && scrollTop <= 0) {
      this.style2 = false
      this.isShowShadow = false
    }
  }

  handleClickShowMenu() {
    this.isShowMenu = !this.isShowMenu
  }

  listenWindowWidth() {
    if (this.windowWidth > 818 && this.isShowMenu) {
      this.isShowMenu = false
    }
  }

  Body() {
    div()
      .class(this.headerHeightCss)
    {
      div()
        .class(this.headerWrapCss)
      {
        div()
          .class(this.sectionNav)
        {
          ShortHeaderMenuIcon()
            .isShortHeader(this.isShortView)
            .isShowMenu(this.isShowMenu)
            .handleClickShowMenu(this.handleClickShowMenu)
          AnimatedLogo()
            .isStyle2(this.style2)
            .isShortHeader(this.isShortView)
          if (!this.isShortView) {
            for (const { btnName, zhBtnName, path, structureData } of this.navBtn) {
              NavButton(this.i18n(btnName, zhBtnName))
                .handleClickNav(() => { this.navigator.to(path) })
                .structureData(structureData)
                .btnPath(path)
            }
          }
        }
        RightSetting()
      }
    }
    if (this.isShortView && this.isShowMenu) {
      ShortHeaderMenu()
        .handleClickShowMenu(this.handleClickShowMenu)
    }
  }

  headerHeightCss = css`
    height: 60px;
    min-width: ${getSize(430)};
  `

  headerWrapCss = css`
    box-shadow: ${this.isShowShadow ? `0 1px 5px -3px ${this.theme.shadowColor}` : ""};
    background-color: ${this.theme.bgColor};
    position: ${this.isNeedAnimation ? "fixed" : "relative"};
    top: 0;
    display: flex;
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    min-width: ${getSize(430)};
  `

  sectionNav = css`
    margin-right: ${getSize(10)};
    display: flex;
    flex-direction: row;
    align-items: center;
  `
}

export default Header as Pretty as Typed<HeaderProps>
