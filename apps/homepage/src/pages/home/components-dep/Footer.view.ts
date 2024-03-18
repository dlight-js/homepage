import { View, type Typed, Pretty, div, Env, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { getSize } from "../../../utils/utilFunc"

@View
class Footer {
  @Env theme: any = required
  @Env i18n: any = required

  Body() {
    div()
      .class(this.footerWrapCss)
    {
      div()
        .class(this.textWrapCss)
      {
        div(this.i18n("Built with DLight and ❤️", "使用 DLight 构建 ❤️"))
        div("by @iandx and @orange04")
      }
    }
  }

  textWrapCss = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: ${getSize(16)};
  `

  footerWrapCss = css`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 8%;
    margin-top: ${getSize(80)};
    padding: ${getSize(30)} 0;
    border-top: solid 1px rgba(82,110,52,0.2);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.theme.tertiaryTextColor};
    cursor: default;
  `
}

export default Footer as Pretty as Typed
