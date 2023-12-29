import { View } from "@dlightjs/dlight"
import { Pretty, Prop, Typed, img, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import clsx from "clsx"

interface LogoProps {
  isRotate: boolean
  class?: string
}

@View
class Logo implements LogoProps {
  @Prop isRotate = required
  @Prop class?: string

  View() {
    img()
      .src("/imgs/logo-leading-png.svg")
      .class(clsx(this.logoCss, this.class))
  }

  logoCss = css`
    margin: 5px;
    width: 30px;
    height: 30px;
    transform: ${this.isRotate ? "rotate(-90deg)" : ""};
  `
}

export default Logo as Pretty as Typed<LogoProps>
