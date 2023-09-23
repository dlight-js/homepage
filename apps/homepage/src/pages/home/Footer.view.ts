import { View } from "@dlightjs/dlight"
import { type Typed, required, Env, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

class Footer extends View {
  @Env theme: any = required

  Body() {
    div()
      .className(this.footerWrapCss)
    {
      div()
        .className(this.textWrapCss)
      {
        div("Built with DLight and ❤️")
        div("by @iandx and @orange04")
      }
    }
  }

  textWrapCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
  `

  footerWrapCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8%;
    margin-top: 80px;
    padding: 30px 0;
    border-top: solid 1px rgba(82,110,52,0.2);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgba(82,110,52,0.7);
    cursor: default;
  `
}

export default Footer as Pretty as Typed
