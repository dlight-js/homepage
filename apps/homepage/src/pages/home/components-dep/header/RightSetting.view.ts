import { View } from "@dlightjs/dlight"
import { Env, Pretty, SubTyped, Typed, a, div, img, required } from "@dlightjs/types"
import { LightModeOutlined, TranslateOutlined } from "@dlightjs/material-icons"
import { css } from "@emotion/css"
import { getSize } from "../../../../utils/utilFunc"

interface NavForwardIconProps {
  src: string
  href: string
}

@View
class RightSetting {
  @Env theme: any = required
  @Env toggleLanguage: any = required
  @Env updateThemeType: any = required

  @View
    NavForwardIcon = (({ src, href }: NavForwardIconProps) => {
      a()
        .href(href)
      {
        img()
          .alt(`${src.split("/").pop()?.split(".")[0]} icon` ?? "")
          .class(this.iconSizeCss)
          .src(src)
      }
    }) as Pretty as SubTyped<NavForwardIconProps>

  View() {
    div()
      .class(this.sectionNav)
    {
      LightModeOutlined()
        .class(this.iconSizeCss)
        .color(this.theme.highlightColor)
        .onClick(this.updateThemeType)
      // TranslateOutlined()
      //   .class(this.iconSizeCss)
      //   .color(this.theme.highlightColor)
      //   .onClick(this.toggleLanguage)
      this.NavForwardIcon()
        .src("/imgs/github.svg")
        .href("https://github.com/dlight-js/dlight")
      this.NavForwardIcon()
        .src("/imgs/discord.svg")
        .href("https://discord.gg/sD57p7NakQ")
    }
  }

  sectionNav = css`
    margin-right: ${getSize(10)};
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  iconSizeCss = css`
    width: 25px;
    height: 25px;
    margin: 10px;
    cursor: pointer;
    `
}

export default RightSetting as Pretty as Typed
