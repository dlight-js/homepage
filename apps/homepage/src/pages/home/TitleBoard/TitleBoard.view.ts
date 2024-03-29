import { View, Env, Pretty, Typed, div, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { EnvType } from "../../../App.view"
import SloganSpitter from "./SloganSpitter.view"
import Title from "./Title.view"
import GetStarted from "./GetStarted.view"

@View
class TitleBoard implements EnvType {
  @Env theme: EnvType["theme"]
  @Env language: EnvType["language"]
  @Env isShortView: EnvType["isShortView"] = required

  Body() {
    div()
      .class(this.wrapperCss)
    {
      Title([["DLight", this.theme!.titleColor], ".js"])
      Title([[
        this.language === "en" ? "DX-first" : "开发者体验优先",
        this.theme!.reverseHLColor
      ],
      this.language === "en" ? " UI Rendering Library" : "的UI渲染库"])
      SloganSpitter()
      GetStarted()
    }
  }

  wrapperCss = css`
    display: flex;
    flex-direction: column;
    align-items: ${this.isShortView ? "flex-start" : "center"};
    justify-content: ${this.isShortView ? "flex-start" : "center"};
    margin: 120px 40px;
  `
}

export default TitleBoard as Pretty as Typed
