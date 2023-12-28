import { View } from "@dlightjs/dlight"
import { type Typed, div, Pretty, Env, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { KeyboardArrowLeftFilled, KeyboardArrowRightFilled } from "@dlightjs/material-icons"
import clsx from "clsx"

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
  @Env theme: any = required
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
          .style({ color: this.hover1 ? "#daa172" : this.theme.primaryText })
          .onClick(() => { this.hover1 = false; this.navigator.to(this.prePage.path) })
          .onMouseEnter(() => { this.hover1 = true })
          .onMouseLeave(() => { this.hover1 = false })
        {
          div()
            .class(this.iconCss("prev"))
          {
            KeyboardArrowLeftFilled()
              .color(this.hover1 ? "#daa172" : this.theme.primaryText)
          }
          div()
            .class(this.pageNavTextBtnCss)
          {
            div(this.i18n(this.prePage.name, this.prePage.zhName))
          }
        }
      }
      if (this.nextPage) {
        div()
          .class(this.nextPageBtnCss)
          .style({ color: this.hover2 ? "#daa172" : this.theme.primaryText })
          .onClick(() => { this.hover2 = false; this.navigator.to(this.nextPage.path) })
          .onMouseOver(() => { this.hover2 = true })
          .onMouseLeave(() => { this.hover2 = false })
        {
          div()
            .class(clsx(this.pageNavTextBtnCss, this.nextPageNavTextBtnCss))
          {
            div(this.i18n(this.nextPage.name, this.nextPage.zhName))
          }
          div()
            .class(this.iconCss("next"))
          {
            KeyboardArrowRightFilled()
              .color(this.hover2 ? "#daa172" : this.theme.primaryText)
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
    border: 1px solid ${this.hover1 ? "#daa172" : this.theme.primaryText};
    border-radius: 10px;
    padding: 10px;
    width: calc(80% - 30px);
    min-height: 40px;
    flex-wrap: wrap;
  `

  nextPageNavTextBtnCss = css`
    justify-content: flex-end;
    border: 1px solid ${this.hover2 ? "#daa172" : this.theme.primaryText};
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
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  `
  nextPageBtnCss = css`
    width: 50%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  `
}

export default NextPageNav as Pretty as Typed<NextPageNavProps>
