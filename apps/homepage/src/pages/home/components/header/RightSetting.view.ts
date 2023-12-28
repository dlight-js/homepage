import { View } from "@dlightjs/dlight"
import { Env, Pretty, Typed, a, div, img, required } from "@dlightjs/types"
import { LightModeOutlined, TranslateOutlined } from "@dlightjs/material-icons"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../../utils/utilFunc"

@View
class RightSetting {
  @Env theme: any = required
  @Env toogleLanguage: any = required
  @Env updateThemeType: any = required

  @View
  NavForwardIcon({ src, href }: any): any {
    a()
      .href(href)
    {
      img()
        .class(this.iconSizeCss)
        .src(src)
    }
  }

  View() {
    div()
      .class(this.sectionNav)
    {
      LightModeOutlined()
        .class(this.iconSizeCss)
        .color(this.theme.green9)
        .onClick(this.updateThemeType)
        // .onDblClick(() => { console.log("double click") })
      TranslateOutlined()
        .class(this.iconSizeCss)
        .color(this.theme.green9)
        .onClick(this.toogleLanguage)
        .onDblClick(() => { console.log("double click") })
      this.NavForwardIcon({})
        .src("/imgs/github.svg")
        .href("https://github.com/dlight-js/dlight")
      this.NavForwardIcon({})
        .src("/imgs/discord.svg")
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
