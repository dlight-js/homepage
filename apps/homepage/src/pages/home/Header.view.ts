import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required, Prop, RequiredProp, img, SubView, a } from "@dlightjs/types"
import LogoTitle from "../../Icon/LogoTitle.view"
import NavButton from "./NavButton.view"
import Logo from "../../Icon/Logo.view"
import { css } from "@dlightjs/easy-css"
import { Transition, TransitionGroup } from "@dlightjs/components"
import { MenuRound, CloseRound, LightModeOutlined, TranslateOutlined } from "@dlightjs/material-icons"
import FileStructure from "../doc/FileStructure.view"
import { HeaderData } from "../../utils/const"

class Header extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Env updateThemeType: any = required
  @Prop handleClickNav: RequiredProp<(tabKey: string) => void> = required
  @Prop themeType: RequiredProp<string> = required
  @Prop isNeedAnimation: RequiredProp<boolean> = required
  navBtn = HeaderData
  style2 = !this.isNeedAnimation
  isShowShadow = !this.isNeedAnimation
  isShortHeader = window.innerWidth < 818
  isShowMenu = false

  @SubView
  NavForwardIcon({ src, href }: any): any {
    a()
      .href(href)
    {
      img()
        .className(this.IconSizeCss)
        .src(src)
    }
  }

  @SubView
  NavFuncIcon({ src, onclick }: any): any {
    img()
      .className(this.IconSizeCss)
      // .className(this.IconBorderCss)
      .src(src)
      .onclick(onclick)
  }

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
          div()
            .style({ marginLeft: "5px" })
          {
            if (this.isShortHeader && !this.isShowMenu) {
              MenuRound()
                .className(this.IconSizeCss)
                .color(this.theme.green9)
                .onclick(() => {
                  this.isShowMenu = true
                })
            } else if (this.isShortHeader && this.isShowMenu) {
              CloseRound()
                .className(this.IconSizeCss)
                .color(this.theme.green9)
                .onclick(() => {
                  this.isShowMenu = false
                })
            }
          }

          div()
            .onclick(() => { this.navigator.to("/") })
            .className(this.logoWrapCss)
          {
            TransitionGroup()
              .delay({
                disappear: 0.2
              })
            {
              Logo()
                .isRotate(this.style2)
            }
            TransitionGroup()
            {
              LogoTitle()
                .isShow(this.style2)
            }
          }
          if (!this.isShortHeader) {
            Transition()
            {
              for (const { btnName, path, structureData } of this.navBtn) {
                NavButton(btnName)
                  .handleClickNav(() => { this.navigator.to(path) })
                  .structureData(structureData)
              }
            }
          }
        }
        div()
          .className(this.sectionNav)
        {
          LightModeOutlined()
            .className(this.IconSizeCss)
            .color(this.theme.green9)
            .onclick(this.updateThemeType)
          TranslateOutlined()
            .className(this.IconSizeCss)
            .color(this.theme.green9)
            .onclick(() => {})
          this.NavForwardIcon({})
            .src("/github.svg")
            .href("https://github.com/dlight-js/dlight")
          this.NavForwardIcon({})
            .src("/discord.svg")
        }
      }
    }
    if (this.isShortHeader && this.isShowMenu) {
      div()
        .className(this.menuWarpCss)
      {
        FileStructure()
      }
    }
  }

  menuWarpCss = css`
    position: fixed;
    background-color: white;
    padding: 20px 10px;
    width: calc(100% - 20px);
    height: 100%;
    
  `

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
    flex-wrap: wrap;
    width: 100%;
    height: 60px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    z-index: 100;
    min-width: 430px;
  `

  sectionNav = css`
    margin-right: 30px;
    display: flex;
    flex-direction: row;
    align-items: center;
    /* overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    } */
  `

  logoWrapCss = css`
    cursor: pointer;
    margin-left: ${this.isShortHeader ? "5px" : "30px"};
  `

  IconSizeCss = css`
    width: 25px;
    height: 25px;
    margin: 10px;
    cursor: pointer;
  `

  IconBorderCss = css`
    padding: 10px;
    background-color: ${this.theme.orange4};
    border-radius: 5px;
  `
}

export default Header as any as Typed<Header>
