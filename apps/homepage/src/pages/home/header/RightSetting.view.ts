import { View } from "@dlightjs/dlight"
import { Env, Pretty, Typed, a, div, img, required } from "@dlightjs/types"
import { LightModeOutlined, TranslateOutlined } from "@dlightjs/material-icons"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../utils/utilFunc"

class RightSetting extends View {
  @Env theme: any = required
  @Env updateThemeType: any = required

  @View
  NavForwardIcon({ src, href }: any): any {
    a()
      .href(href)
    {
      img()
        .className(this.iconSizeCss)
        .src(src)
    }
  }

  Body() {
    div()
      .className(this.sectionNav)
    {
      LightModeOutlined()
        .className(this.iconSizeCss)
        .color(this.theme.green9)
        .onclick(this.updateThemeType)
      TranslateOutlined()
        .className(this.iconSizeCss)
        .color(this.theme.green9)
        .onclick(() => {})
      this.NavForwardIcon({})
        .src("/github.svg")
        .href("https://github.com/dlight-js/dlight")
      this.NavForwardIcon({})
        .src("/discord.svg")
    }
  }

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

  iconSizeCss = css`
    width: 25px;
    height: 25px;
    margin: 10px;
    cursor: pointer;
    `
}

export default RightSetting as Pretty as Typed
