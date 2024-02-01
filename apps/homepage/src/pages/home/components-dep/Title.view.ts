import { View } from "@dlightjs/dlight"
import { div, button, Pretty, Typed, Env, required } from "@dlightjs/types"
import { css } from "@emotion/css"
import { getSize } from "../../../utils/utilFunc"
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
  @Env i18n: any = required
  isCenterTitle = this.windowWidth < 1019
  isCenterStyle = this.isCenterTitle || this.isMobile

  listenWindowWidth() {
    if (this.windowWidth < 1019 && !this.isCenterTitle) {
      this.isCenterTitle = true
    } else {
      this.isCenterTitle = false
    }
  }

  View() {
    div()
      .class(this.titleWrapCss)
    {
      div(this.i18n("DX-first UI Rendering Library", "开发者优先的UI渲染库"))
        .class(this.titleDescriptionCss)
      div(this.i18n("Unlocking View Building in Familiar JS Syntax with an Intuitive API", "用熟悉的JS语法解锁视图构建，提供直观的API"))
        .class(this.introDescriptionCss)
      button(this.i18n("Get Started", "快速上手"))
        .class(this.homeStartBtnCss)
        .onClick(() => { this.navigator.to("./docs/getting-started") })
    }
  }

  titleDescriptionCss = css`
    /* color: ${this.theme.primaryTextColor}; */
    color: ${this.theme.green9};
    font-weight: bold;
    font-size: ${getSize(50)};
    margin-top: 10px;
    text-align: ${this.isCenterStyle ? "center" : "left"};;
  `

  introDescriptionCss = css`
    font-size: ${getSize(20)};
    line-height: ${getSize(30)};
    margin-top: 10px;
    /* color: ${this.theme.primaryTextColor}; */
    color: ${this.theme.introColor};
    text-align: ${this.isCenterStyle ? "center" : "left"};;
  `

  homeStartBtnCss = css`
    color: ${this.theme.primaryTextColor};
    background-color: ${this.theme.startBtnColor};
    padding: 12px 12px;
    border-radius: 5px;
    box-shadow: 1px 1px 10px ${this.theme.shadowColor};
    border-width: 0;
    margin-top: 25px;
    cursor: pointer;
  `

  titleWrapCss = css`
    margin: ${getSize(65)} 10% 0 10%;
    display: flex;
    flex-direction: column;
    /* align-items: ${this.isCenterStyle ? "center" : "flex-start"}; */
    align-items: center;
    justify-content: center;
    /* width: ${getSize(500)}; */
    min-width: ${getSize(430)};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `
}

export default Title as Pretty as Typed<TitleProps>
