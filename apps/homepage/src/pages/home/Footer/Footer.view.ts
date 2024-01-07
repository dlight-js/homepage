import { View } from "@dlightjs/dlight"
import { a, div, Env, required, type Pretty, type Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { Logo } from "../../../logo"
import { EnvType } from "../../../App.view"

@View
class Footer implements EnvType {
  @Env theme: EnvType["theme"] = required
  View() {
    div().class(this.idCss); {
      Logo().height("15px").width("15px").isRotate(true)
      div(" 2023  ")
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
    color: ${this.theme?.activeColor};
  `
}

export default Footer as Pretty as Typed
