
import { Navigator, Transition } from "@dlightjs/components"
import { View, Env, Prop, required } from "@dlightjs/dlight"
import { Pretty, Typed, div } from "@dlightjs/types"
import { Logo, LogoTitle } from "../../../../logo"
import { css } from "@iandx/easy-css"

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
      .onclick(() => { this.navigator.to("/") })
      .className(this.logoWrapCss)
    {
      Transition()
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
}

export default AnimatedLogo as Pretty as Typed<AnimatedLogoProps>
