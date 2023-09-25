import { View, required, Prop } from "@dlightjs/dlight"
import { Pretty, Typed, img } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

interface LogoProps {
  isRotate: boolean
}

@View
class Logo implements LogoProps {
  @Prop isRotate = required
  Body() {
    img()
      .src("/imgs/logo-leading-png.svg")
      .className(this.logoCss)
  }

  logoCss = css`
    margin: 5px;
    width: 30px;
    height: 30px;
    transform: ${this.isRotate ? "rotate(-90deg)" : ""};
  `
}

export default Logo as Pretty as Typed<LogoProps>
