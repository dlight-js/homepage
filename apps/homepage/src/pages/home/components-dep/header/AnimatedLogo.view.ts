
import { Navigator } from "@dlightjs/components"
import { View, Env, Pretty, Prop, Typed, div, required } from "@dlightjs/dlight"
import { Logo, LogoTitle } from "../../../../logo"
import { css } from "@emotion/css"

interface AnimatedLogoProps {
  isStyle2: boolean
  isShortHeader: boolean
}

@View
class AnimatedLogo implements AnimatedLogoProps {
  @Env navigator: Navigator = required
  @Prop isStyle2 = required
  @Prop isShortHeader = required

  Body() {
    div()
      .onClick(() => { this.navigator.to("/") })
      .class(this.logoWrapCss)
    {
      div()
        .class(this.transitionCss)
      {
        Logo()
          .isRotate(this.isStyle2)
        LogoTitle()
          .isShow(this.isStyle2)
      }
    }
  }

  logoWrapCss = css`
    cursor: pointer;
    margin-left: ${this.isShortHeader ? "5px" : "30px"};
  `

  transitionCss = css`
    img {
      transition: all 0.5s;
    }
  `
}

export default AnimatedLogo as Pretty as Typed<AnimatedLogoProps>
