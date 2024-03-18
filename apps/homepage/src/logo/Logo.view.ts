import { View, Pretty, Prop, Typed, img, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import clsx from "clsx"

interface LogoProps {
  isRotate: boolean
  class?: string
  width?: string
  height?: string
}

@View
class Logo implements LogoProps {
  @Prop isRotate = required
  @Prop class?: string
  @Prop width = "30px"
  @Prop height = "30px"

  Body() {
    img()
      .src("/imgs/logo-leading-png.svg")
      .alt("DLight Logo")
      .class(clsx(this.logoCss, this.class))
  }

  logoCss = css`
    margin: 5px;
    width: ${this.width};
    height: ${this.height};
    transform: ${this.isRotate ? "rotate(-90deg)" : ""};
  `
}

export default Logo as Pretty as Typed<LogoProps>
