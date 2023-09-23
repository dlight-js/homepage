import { View } from "@dlightjs/dlight"
import { type Typed, button, Env, required, Pretty, div } from "@dlightjs/types"
import Header from "./Header.view"
import { css } from "@iandx/easy-css"
import { featureData } from "../../utils/const"
import PreviewSection from "./PreviewSection.view"
import FeatureCardGroup from "./FeatureCardGroup.view"
import Footer from "./Footer.view"
import Example from "./Example.view"
import { getSize } from "../../utils/utilFunc"

class Home extends View {
  @Env navigator = required
  @Env theme: any = required
  @Env isMobile: boolean = required
  featureData = featureData
  count = 2

  Body() {
    div()
      .className(this.bgCss)
    {
      Header()
        .isNeedAnimation(true)
      div()
        .className(this.titleExampleWrapCss)
      {
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
        Example()
      }
      div()
        .className(this.featureCardWrap)
      {
        FeatureCardGroup()
          .data(this.featureData.slice(0, 2))
        FeatureCardGroup()
          .data(this.featureData.slice(2, 4))
      }
      // PreviewSection()
      Footer()
    }
  }

  bgCss = css`
    background-color: ${this.theme.orange1};
    overflow-x: hidden;
  `

  titleExampleWrapCss = css`
    margin-top: ${getSize(30)};
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: center;
    flex-wrap: wrap;
  `

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
    text-align: ${this.isMobile ? "center" : ""};;
  `

  introDescriptionCss = css`
    font-size: ${getSize(25)};
    line-height: ${getSize(35)};
    margin-top: 10px;
    color: ${this.theme.green12};
    text-align: ${this.isMobile ? "center" : ""};;
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
    align-items: flex-start;
    align-items: ${this.isMobile ? "center" : ""};
    justify-content: center;
    width: ${getSize(500)};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin-right: ${this.isMobile ? "0" : "10%"};
  `

  featureCardWrap = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
    margin-top: -120px;
  `
}

export default Home as Pretty as Typed
