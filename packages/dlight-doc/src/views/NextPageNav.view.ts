import { View } from "@dlightjs/dlight"
import { type Typed, Prop, required, div, Env, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { KeyboardArrowLeftFilled, KeyboardArrowRightFilled } from "@dlightjs/material-icons"

interface NextPageNavProps {
  navigator: any
  nextPage: any
  prePage: any
  updateCurrentIndex: (index: number) => void
}

class NextPageNav extends View implements NextPageNavProps {
  @Env navigator: any = required
  @Env nextPage = required
  @Env prePage = required
  @Prop updateCurrentIndex = required

  hover1 = false
  hover2 = false
  handleClickNext() {
    this.navigator.to("/" + this.nextPage.path)
    this.updateCurrentIndex(0)
    this.hover2 = false
  }

  handleClickPre() {
    this.navigator.to("/" + this.prePage.path)
    this.updateCurrentIndex(0)
    this.hover1 = false
  }

  Body() {
    div()
      .className(this.nextPageNavWrapCss)
    {
      if (this.prePage) {
        div()
          .className(this.prePageBtnCss)
          .style({ color: this.hover1 ? "#daa172" : "#445d2a" })
          .onclick(this.handleClickPre)
          .onmouseenter(() => { this.hover1 = true })
          .onmouseleave(() => { this.hover1 = false })
        {
          div()
            .className(this.iconCss("prev"))
          {
            KeyboardArrowLeftFilled()
              .color(this.hover1 ? "#daa172" : "#445d2a")
          }
          div(this.prePage.name)
        }
      }
      if (this.nextPage) {
        div()
          .className(this.nextPageBtnCss)
          .style({ color: this.hover2 ? "#daa172" : "#445d2a" })
          .onclick(this.handleClickNext)
          .onmouseover(() => { this.hover2 = true })
          .onmouseleave(() => { this.hover2 = false })
        {
          div(this.nextPage.name)
          div()
            .className(this.iconCss("next"))
          {
            KeyboardArrowRightFilled()
              .color(this.hover2 ? "#daa172" : "#445d2a")
          }
        }
      }
    }
  }

  iconCss = (type: string) => css`
    padding-top: 4px;
    ${type === "next" ? "margin-left: 10px" : "margin-right: 10px"};
  `

  nextPageNavWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: ${this.nextPage && !this.prePage ? "flex-end" : "space-between"};
    margin-top: 30px;
    padding: 40px 0;
    border-top: solid 1px rgb(226 232 240);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    font-weight: 600;
  `

  prePageBtnCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    cursor: pointer;
  `
  nextPageBtnCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
    cursor: pointer;
  `
}

export default NextPageNav as Pretty as Typed<NextPageNavProps>
