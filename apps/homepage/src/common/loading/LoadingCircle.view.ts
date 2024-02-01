import { View } from "@dlightjs/dlight"
import { div, Env, type Pretty, type Typed, required } from "@dlightjs/types"
import { css } from "@emotion/css"

@View
class LoadingCircle {
  @Env theme: any = required

  View() {
    div()
      .class(this.wrapperCss)
    {
      div()
        .class(this.loadingCss)
    }
  }

  wrapperCss = css`
    height: calc(100vh - 65px);
    display: flex;
    justify-content: center;
    align-items: center;
  `

  loadingCss = css`
    border: 5px solid #f3f3f3;
    border-radius: 50%;
    border-top: 5px solid ${this.theme.reverseHLColor};
    width: 40px;
    height: 40px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;

    @-webkit-keyframes spin {
        0% { -webkit-transform: rotate(0deg); }
        100% { -webkit-transform: rotate(360deg); }
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
  `
}

export default LoadingCircle as Pretty as Typed
