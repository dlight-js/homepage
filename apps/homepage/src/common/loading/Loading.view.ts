import { View } from "@dlightjs/dlight"
import { type Typed, div, Pretty, img, Env, required } from "@dlightjs/types"
import { css } from "@emotion/css"
import { Navigator } from "@dlightjs/components"
import { EnvType } from "../../App.view"
import clsx from "clsx"

@View
class Loading implements EnvType {
  @Env navigator: Navigator = required
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env i18n: any = required

  View() {
    div()
      .class(this.loadingWrapCss)
    {
      div()
        .class(this.ballWrapCss)
      {
        div()
          .class(clsx(this.ballCss, this.ballLeftCss))
        div()
          .class(clsx(this.ballCss, this.ballRightCss))
      }
      img()
        .alt("Loading")
        .src("/imgs/D.svg")
        .class(this.imgCss)
    }
  }

  loadingWrapCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh;
  `

  ballWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  `

  imgCss = css`
        width: 50px;
        height: 50px;
  `

  ballCss = css`
    width: 12px;
    height: 12px;
    border-radius: 50%;
    position: relative;
  `

  ballLeftCss = css`
    background-color: #BAE291;
    animation: leftBall 2s infinite;
  `

  ballRightCss = css`
    background-color: #F1D6A0;
    animation: rightBall 2s infinite;
  `

  leftBall = css`
    @keyframes leftBall {
            0%, 100% {
                transform: translateX(-12px);
            }
            25% {
                transform: translateX(-25px);
            }
            50% {
                transform: translateX(-12px);
            }
        }
  `

  rightBall = css`
    @keyframes rightBall {
            0%, 50% {
                transform: translateX(2px);
            }
            75% {
                transform: translateX(15px);
            }
            100% {
                transform: translateX(2px);
            }
        }
  `
}

export default Loading as Pretty as Typed
