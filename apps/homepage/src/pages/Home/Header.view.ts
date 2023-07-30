import { CustomNode, View } from "@dlightjs/dlight"
import { type Typed, div, Env, required, Prop, RequiredProp, img, SubView, a, env } from "@dlightjs/types"
import LogoTitle from "../../Icon/LogoTitle.view"
import NavButton from "./NavButton.view"
import Logo from "../../Icon/Logo.view"
import { css } from "@iandx/easy-css"

class Header extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop handleClickNav: RequiredProp<(tabKey: string) => void> = required
  @Prop themeType: RequiredProp<string> = required
  navBtn = ["Guides", "Tutorial", "Examples", "Playground", "Ecosystem"]
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

  listenScroll = function() {
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

  didMount(_els: HTMLElement[], _node: CustomNode): void {
    window.onscroll = this.listenScroll
  }

  Body() {
    div()
      .className(this.headerWrapCss)
    {
      div()
        .className(this.sectionNav)
      {
        div()
        div()
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
            .handleClickNav(() => { this.navigator.to(`./${btn.toLowerCase()}`) })
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

  headerWrapCss = css`
    background-color: ${this.style2 ? this.theme.orange4 : this.theme.orange2};
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    /* padding: ${this.style2 ? "0 16px" : "16px 16px"}; */
    padding: 0 16px;
    z-index: 100;
  `

  sectionNav = css`
    flex: 1;
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  logoWrapCss = css`
    margin-right: 16px;
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
