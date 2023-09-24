import { View } from "@dlightjs/dlight"
import { Pretty, Prop, Typed, img, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface LogoTitleProps {
  onclick: () => void
  isShow: boolean
}

class LogoTitle extends View implements LogoTitleProps {
  _$forwardProps = true
  @Prop onclick = required
  @Prop isShow = required

  Body() {
    img()
      .src("/light.svg")
      .className(this.logoCss)
      .onclick(this.onclick)
  }

  logoCss = css`
    width: ${this.isShow ? "70px" : 0};
    height: 30px;

    padding-bottom: 2px;
    margin-right: 25px;
  `
}

export default LogoTitle as Pretty as Typed<LogoTitleProps>
