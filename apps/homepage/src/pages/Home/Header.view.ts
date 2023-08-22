import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required, Prop, RequiredProp, img, SubView, a } from "@dlightjs/types"
import LogoTitle from "../../Icon/LogoTitle.view"
import NavButton from "./NavButton.view"
import Logo from "../../Icon/Logo.view"
import { css } from "@dlightjs/easy-css"

class Header extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop handleClickNav: RequiredProp<(tabKey: string) => void> = required
  @Prop themeType: RequiredProp<string> = required
  navBtn = ["Documents", "Playground", "Ecosystem"]
  style2 = false

  @SubView
  NavIcon({ src, onclick, isBorder, href }: any): any {
    a()
      .href(href)
    {
      img()
        .className(this.IconSizeCss)
        .className(isBorder ? this.IconBorderCss : "")
        .src(src)
        .onclick(onclick)
    }
  }

  handleClickNavIcon() {
    console.log("hhhh")
  }

  listenScroll = function () {
    // 为了保证兼容性，这里取两个值，哪个有值取哪一个
    // scrollTop就是触发滚轮事件时滚轮的高度
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    // console.log("滚动距离" + scrollTop);
    if (scrollTop > 500) {
      this.style2 = true
    }
    if (this.style2 && scrollTop < 500) {
      this.style2 = false
    }
  }.bind(this)

  didMount() {
    window.onscroll = this.listenScroll
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
            .onclick(() => { this.navigator.to("..") })
            .className(this.logoWrapCss)
          {
            if (this.style2) {
              LogoTitle()
            } else {
              Logo()
            }
          }
          for (const btn of this.navBtn) {
            NavButton(btn)
              .handleClickNav(() => { this.navigator.to(`../${btn.toLowerCase()}`) })
          }
        }
        div()
          .className(this.sectionNav)
        {
          this.NavIcon({})
            .src("./github.svg")
            .onclick(this.handleClickNavIcon)
            .href("https://github.com/dlight-js/dlight")
          this.NavIcon({})
            .src("./discord.svg")
            .onclick(this.handleClickNavIcon)
          this.NavIcon({})
            .src("./lightMode.svg")
            .onclick(this.handleClickNavIcon)
            .isBorder()
          this.NavIcon({})
            .src("./language.svg")
            .onclick(this.handleClickNavIcon)
            .isBorder()
        }
      }
    }
  }

  headerHeightCss = css`
    height: 80px;
  `

  headerWrapCss = css`
    background-color: ${this.style2 ? this.theme.orange4 : this.theme.orange2};
    position: fixed;
    top: 0;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 5px 16px;
    z-index: 100;
  `

  sectionNav = css`
    margin-right: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    overflow: scroll;
    ::-webkit-scrollbar {
      display: none;
    }
  `

  logoWrapCss = css`
    margin-right: 16px;
    cursor: pointer;
  `
  IconSizeCss = css`
    width: 30px;
    height: 30px;
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
