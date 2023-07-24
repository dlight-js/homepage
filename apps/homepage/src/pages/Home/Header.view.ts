import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, Prop, RequiredProp, img, SubView, a, env } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { HelpCenterFilled } from "@dlightjs/material-icons"
import LogoTitle from "../../Icon/LogoTitle.view"
import NavButton from "./NavButton.view"
import Logo from "../../Icon/Logo.view"
import { css } from "@iandx/easy-css"

class Header extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop handleClickNav: RequiredProp<(tabKey: string) => void> = required
  @Prop themeType: RequiredProp<string> = required
  navBtn = ["Guides", "Examples", "Tutorial", "Blog", "Ecosystem"]

  @SubView
  NavIcon({src, onclick, isBorder, href}: any):any {
    a()
    .href(href)
    {
      img()
      .className(this.IconSizeCss)
      .className(isBorder?this.IconBorderCss:"")
      .src(src)
      .onclick(onclick)
    }
  }

  handleClickNavIcon() {
    console.log("hhhh")
  }

  Body() {
      div()
      .className(this.headerWrapCss)
    {
      div()
        .className(this.sectionNav)
      {
        div()
        .className(this.logoWrapCss)
        {
          Logo()
        }
        for (const btn of this.navBtn) {
          NavButton(btn)
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
    background-color: ${this.theme.orange2};
    position: fixed;
    top: 0;
    display: flex;
    width: 100%;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 16px 16px;
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
