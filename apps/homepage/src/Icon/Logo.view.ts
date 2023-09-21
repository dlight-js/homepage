import { View } from "@dlightjs/dlight"
import { DLightIconType } from "@dlightjs/material-icons"
import { Prop, RequiredProp, Typed, img, required } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class Logo extends View {
  _$forwardProps = true
  @Prop isRotate: RequiredProp<boolean> = required
  // Body() {
  //   DLightIcon()
  //     .forwardProps(true)
  //     .content(`<circle cx="11.539" cy="56.5114" r="11.539" fill="#F1D6A0"/>
  //     <circle cx="11.539" cy="106.809" r="11.539" fill="#BAE291"/>
  //     <circle cx="62.7245" cy="118.201" r="9.46788" fill="#FABE8E"/>
  //     <circle cx="53.2569" cy="9.46788" r="9.46788" fill="#FABE8E"/>
  //     <path fill-rule="evenodd" clip-rule="evenodd" d="M43.7891 9.46776C43.7891 9.4678 43.7891 9.46784 43.7891 9.46788L43.7891 80.477C43.7891 85.7059 48.028 89.9449 53.2569 89.9449C58.4859 89.9449 62.7248 85.7059 62.7248 80.477L62.7248 9.46788C62.7248 4.23891 58.4859 -2.28567e-07 53.2569 0C53.2569 0 53.2569 0 53.2569 0V9.46776H43.7891Z" fill="#FABE8E"/>
  //     <path fill-rule="evenodd" clip-rule="evenodd" d="M43.7888 0H43.7891V9.46783H53.257V0H61.9684C98.4727 0 129 28.0799 129 63.839C129 99.3508 98.8933 127.289 62.7246 127.674V108.737C89.4376 108.357 110.064 87.9099 110.064 63.839C110.064 39.5414 89.0473 18.9358 61.9684 18.9358H43.7888V0Z" fill="#FABE8E"/>
  //     `)
  //     .viewBox("0 0 129 128")
  //     .name("Logo")
  // }
  Body() {
    img()
      .src("/logo-leading-png.svg")
      .className(this.logoCss)
  }

  logoCss = css`
    margin: 5px;
    width: 30px;
    height: 30px;
    transform: ${this.isRotate ? "rotate(-90deg)" : ""};
  `
}

export default Logo as any as Typed<Logo>
