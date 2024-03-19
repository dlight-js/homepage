import { View, a, div, Env, required, type Pretty, type Typed } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { Logo } from "../../../logo"
import { EnvType } from "../../../App.view"

@View
class Footer implements EnvType {
  @Env theme: EnvType["theme"] = required
  Body() {
    div().class(this.idCss); {
      Logo().height("15px").width("15px").isRotate(true)
      div(" 2024  ")
      a("DLight.js contributors")
        .href("https://github.com/dlight-js/dlight")
        .class(this.contributorCss)
    }
  }

  idCss = css`
    margin: 100px 0 10px 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    white-space: pre-wrap;
  `

  contributorCss = css`
    text-decoration: none;
    color: ${this.theme?.reverseHLColor};
  `
}

export default Footer as Pretty as Typed
