import { View } from "@dlightjs/dlight"
import { type Typed, div, Pretty, Env, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { KeyboardArrowLeftFilled, KeyboardArrowRightFilled } from "@dlightjs/material-icons"

export interface PageNavType {
  name: string
  zhName: string
  path: string
}

interface NextPageNavProps {
  nextPage: PageNavType
  prePage: PageNavType
}

@View
class NextPageNav implements NextPageNavProps {
  @Env navigator: any = required
  @Env textColor: string = required
  @Env highlightColor: string = required
  @Env i18n: any = required
  @Prop nextPage = required
  @Prop prePage = required

  hover1 = false
  hover2 = false

  View() {
    div()
      .class(this.nextPageNavWrapCss)
    {
      if (this.prePage) {
        div()
          .class(this.prePageBtnCss)
          .onClick(() => { this.hover1 = false; this.navigator.to(this.prePage.path) })
          .onMouseEnter(() => { this.hover1 = true })
          .onMouseLeave(() => { this.hover1 = false })
        {
          div()
            .class(this.iconCss("prev"))
          {
            KeyboardArrowLeftFilled()
              .color(this.hover1 ? this.highlightColor : this.textColor)
          }
          div(this.i18n(this.prePage.name, this.prePage.zhName))
        }
      }
      if (this.nextPage) {
        div()
          .class(this.nextPageBtnCss)
          .onClick(() => { this.hover2 = false; this.navigator.to(this.nextPage.path) })
          .onMouseEnter(() => { this.hover2 = true })
          .onMouseLeave(() => { this.hover2 = false })
        {
          div(this.i18n(this.nextPage.name, this.nextPage.zhName))
          div()
            .class(this.iconCss("next"))
          {
            KeyboardArrowRightFilled()
              .color(this.hover2 ? this.highlightColor : this.textColor)
          }
        }
      }
    }
  }

  iconCss = (type: string) => css`
    padding-top: 4px;
    ${type === "next" ? "margin-left: 10px" : "margin-right: 10px"};
  `

  pageNavTextBtnCss = css`
    font-size: 16px;
    display: flex;
    align-items: center;
    border: 1px solid ${this.hover1 ? this.highlightColor : this.textColor};
    border-radius: 10px;
    padding: 10px;
    width: calc(80% - 30px);
    min-height: 40px;
    flex-wrap: wrap;
  `

  nextPageNavTextBtnCss = css`
    justify-content: flex-end;
    border: 1px solid ${this.hover2 ? this.highlightColor : this.textColor};
  `

  nextPageNavWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: ${this.nextPage && !this.prePage ? "flex-end" : "space-between"};
    margin-top: 30px;
    padding: 40px 0;
    border-top: solid 1px rgb(226 232 240);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  prePageBtnCss = css`
    /* width: 50%; */
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
    color: ${this.hover1 ? this.highlightColor : this.textColor};
  `

  nextPageBtnCss = css`
    /* width: 50%; */
    padding: 10px 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
    color: ${this.hover2 ? this.highlightColor : this.textColor};
  `
}

export default NextPageNav as Pretty as Typed<NextPageNavProps>
