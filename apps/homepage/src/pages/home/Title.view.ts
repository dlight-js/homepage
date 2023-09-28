import { Env, View, Watch, required } from "@dlightjs/dlight"
import { div, button, Pretty, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../utils/utilFunc"
import { Navigator } from "@dlightjs/components"

interface TitleProps {
  isCenterTitle: boolean
}

@View
class Title implements TitleProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env isMobile: boolean = required
  @Env windowWidth: number = required
  isCenterTitle = this.windowWidth < 1019
  isCenterStyle = this.isCenterTitle || this.isMobile

  listenWindowWidth() {
    if (this.windowWidth < 1019 && !this.isCenterTitle) {
      this.isCenterTitle = true
    } else {
      this.isCenterTitle = false
    }
  }

  Body() {
    div()
      .className(this.titleWrapCss)
    {
      div("DLight.js")
        .className(this.homeTitleCss)
      div("DX-first UI Rendering Library")
        .className(this.titleDescriptionCss)
      div("Unlocking View Building in Familiar JS Syntax with an Intuitive API")
        .className(this.introDescriptionCss)
      button("Get Started")
        .className(this.homeStartBtnCss)
        .onclick(() => { this.navigator.to("./docs/getting-started") })
    }
  }

  homeTitleCss = css`
    color: ${this.theme.orange10};
    font-weight: bold;
    font-size: ${getSize(60)};
    text-shadow: 0 1px 5px;
  `

  titleDescriptionCss = css`
    color: ${this.theme.green12};
    font-weight: bold;
    font-size: ${getSize(50)};
    margin-top: 10px;
    text-align: ${this.isCenterStyle ? "center" : "left"};;
  `

  introDescriptionCss = css`
    font-size: ${getSize(25)};
    line-height: ${getSize(35)};
    margin-top: 10px;
    color: ${this.theme.green12};
    text-align: ${this.isCenterStyle ? "center" : "left"};;
  `

  homeStartBtnCss = css`
    color: ${this.theme.green12};
    background-color: ${this.theme.orange6};
    padding: 12px 12px;
    border-radius: 5px;
    box-shadow: 1px 1px 2px ${this.theme.green10};
    border-width: 0;
    margin-top: 25px;
    cursor: pointer;
  `

  titleWrapCss = css`
    margin: ${getSize(65)} 10% ${getSize(86)} 0;
    display: flex;
    flex-direction: column;
    align-items: ${this.isCenterStyle ? "center" : "flex-start"};
    justify-content: center;
    width: ${getSize(500)};
    min-width: ${getSize(430)};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    /* margin-right: ${this.isMobile ? "0" : "10%"}; */
    margin-left: ${this.isCenterTitle ? "10%" : "0"};
  `
}

export default Title as Pretty as Typed<TitleProps>
