import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, div, Pretty } from "@dlightjs/types"
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
  handleChangeTitleStyle: (value: boolean) => void
}

@View
class Header implements HeaderProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env updateThemeType: any = required
  @Env updateStyle: (value: boolean) => void = required
  @Env isShortView: boolean = required
  @Prop handleClickNav = required
  @Prop themeType = required
  @Prop isNeedAnimation = required
  @Prop handleChangeTitleStyle = required
  navBtn = HeaderData
  style2 = !this.isNeedAnimation
  isShowShadow = !this.isNeedAnimation
  isShowMenu = false

  listenScroll() {
    // 为了保证兼容性，这里取两个值，哪个有值取哪一个
    // scrollTop就是触发滚轮事件时滚轮的高度
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

  didMount() {
    window.onscroll = this.isNeedAnimation ? this.listenScroll : null
  }

  willUnmount() {
    window.onscroll = null
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
            .isShortHeader(this.isShortView)
            .isShowMenu(this.isShowMenu)
            .handleClickShowMenu(this.handleClickShowMenu)
          AnimatedLogo()
            .isStyle2(this.style2)
            .isShortHeader(this.isShortView)
          if (!this.isShortView) {
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
    if (this.isShortView && this.isShowMenu) {
      ShortHeaderMenu()
    }
  }

  headerHeightCss = css`
    height: 48px;
    padding: 6px 0;
    min-width: ${getSize(430)};
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
  `
}

export default Header as Pretty as Typed<HeaderProps>
