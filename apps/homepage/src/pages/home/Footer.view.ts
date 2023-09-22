import { View } from "@dlightjs/dlight"
import { type Typed, required, img, Env } from "@dlightjs/types"
import { css, div } from "@dlightjs/easy-css"

class Footer extends View {
  @Env theme: any = required

  Body() {
    div()
      .className(this.footerWrapCss)
    {
      img()
        .src("./logo-png.svg")
      div("built with heart 💝")
        .onmouseenter(() => {})
    }
  }

  footerWrapCss = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 8%;
    padding: 30px 0;
    border-top: solid 1px rgba(82,110,52,0.2);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.theme.green11};
    cursor: default;
  `
}

export default Footer as any as Typed<Footer>
