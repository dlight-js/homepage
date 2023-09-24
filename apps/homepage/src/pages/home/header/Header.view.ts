import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required, Prop, Pretty } from "@dlightjs/types"
import NavButton from "./NavButton.view"
import { css } from "@iandx/easy-css"
import { Navigator } from "@dlightjs/components"
import { HeaderData } from "../../../utils/const"
import { getSize } from "../../../utils/utilFunc"
import RightSetting from "./RightSetting.view"
import ShortHeaderMenu from "./ShortHeaderMenu.view"
import AnimatedLogo from "./AnimatedLogo.view"
import ShortHeaderMenuIcon from "./ShortHeaderMenuIcon.view"

interface HeaderProps {
  handleClickNav: (tabKey: string) => void
  themeType: string
  isNeedAnimation: boolean
}

class Header extends View implements HeaderProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env updateThemeType: any = required
  @Prop handleClickNav = required
  @Prop themeType = required
  @Prop isNeedAnimation = required
  navBtn = HeaderData
  style2 = !this.isNeedAnimation
  isShowShadow = !this.isNeedAnimation
  isShortHeader = window.innerWidth < 818
  isShowMenu = false

  listenScroll() {
    // 为了保证兼容性，这里取两个值，哪个有值取哪一个
    // scrollTop就是触发滚轮事件时滚轮的高度
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    // console.log("滚动距离" + scrollTop);
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

  handleWindowResize() {
    if (window.innerWidth < 818) {
      this.isShortHeader = true
    } else {
      this.isShortHeader = false
      this.isShowMenu = false
    }
  }

  handleClickShowMenu() {
    this.isShowMenu = !this.isShowMenu
  }

  didMount() {
    window.onscroll = this.isNeedAnimation ? this.listenScroll : null
    window.addEventListener("resize", this.handleWindowResize)
  }

  willUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  Body() {
    div()
      .className(this.headerHeightCss)
    {
      div()
        .className(this.headerWrapCss)
      {
        div()
          .className(this.sectionNav)
        {
          ShortHeaderMenuIcon()
            .isShortHeader(this.isShortHeader)
            .isShowMenu(this.isShowMenu)
            .handleClickShowMenu(this.handleClickShowMenu)
          AnimatedLogo()
            .isStyle2(this.style2)
            .isShortHeader(this.isShortHeader)
          if (!this.isShortHeader) {
            for (const { btnName, path, structureData } of this.navBtn) {
              NavButton(btnName)
                .handleClickNav(() => { this.navigator.to(path) })
                .structureData(structureData)
            }
          }
        }
        RightSetting()
      }
    }
    if (this.isShortHeader && this.isShowMenu) {
      ShortHeaderMenu()
    }
  }

  headerHeightCss = css`
    height: 48px;
    padding: 6px 0;
    min-width: 430px;
  `

  headerWrapCss = css`
    box-shadow: ${this.isShowShadow ? "0 1px 5px -3px #A9A9A9" : ""};
    background-color: ${this.theme.orange1};
    position: fixed;
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
    /* overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    } */
  `
}

export default Header as Pretty as Typed<HeaderProps>
