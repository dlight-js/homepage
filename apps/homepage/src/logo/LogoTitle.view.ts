import { View, Pretty, Prop, Typed, img, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"

interface LogoTitleProps {
  onClick: () => void
  isShow: boolean
}

@View
class LogoTitle implements LogoTitleProps {
  @Prop onClick = required
  @Prop isShow = required

  Body() {
    img()
      .src("/imgs/light.svg")
      .alt("DLight Title Logo")
      .class(this.logoCss)
      .onClick(this.onClick)
  }

  logoCss = css`
    width: ${this.isShow ? "70px" : 0};
    height: 30px;

    padding-bottom: 2px;
    margin-right: 25px;
  `
}

export default LogoTitle as Pretty as Typed<LogoTitleProps>
