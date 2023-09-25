import { Prop, View, required } from "@dlightjs/dlight"
import { Pretty, Typed, img } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface LogoTitleProps {
  onclick: () => void
  isShow: boolean
}

@View
class LogoTitle implements LogoTitleProps {
  @Prop onclick = required
  @Prop isShow = required

  Body() {
    img()
      .src("/imgs/light.svg")
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
