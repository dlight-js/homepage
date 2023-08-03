import { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required } from "@dlightjs/types"
import Header from "./Header.view"
import { css } from "@iandx/easy-css"
import { featureData } from "../../utils/const"
import FeatureCard from "./FeatureCard.view"
import PreviewSection from "./PreviewSection.view"

class Home extends View {
  @Env navigator = required
  @Env theme: any = required
  featureData = featureData

  Body() {
    div()
      .className(this.bgCss)
    {
      Header()
      div()
        .className(this.titleWrapCss)
      {
        div("DLight.js")
          .className(this.homeTitleCss)
        div("DX-first UI Rendering Library")
          .className(this.titleDescriptionCss)
        button("Get Started")
          .className(this.homeStartBtnCss)
          .onclick(() => { this.navigator.to("./guides") })
      }
      div()
        .className(this.featureCardWrap)
      {
        for (const feature of this.featureData) {
          FeatureCard()
            .data(feature)
        }
      }
      PreviewSection()
    }
  }

  bgCss = css`
    background-color: ${this.theme.orange2};
  `

  homeTitleCss = css`
    color: ${this.theme.orange10};
    font-family: Inter;
    font-weight: bold;
    font-size: 60px;
    text-shadow: 0 3px 5px;
  `

  titleDescriptionCss = css`
    color: ${this.theme.green12};
    font-weight: bold;
    font-size: 40px;
    margin: 32px 0;
    text-align: center;
  `

  homeStartBtnCss = css`
    color: #fff;
    background-color: ${this.theme.orange6};
    padding: 12px 12px;
    border-radius: 5px;
    box-shadow: 2px 2px 5px;
    border-width: 0;
  `

  titleWrapCss = css`
    padding: 256px 0 156px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  `

  featureCardWrap = css`
    display: grid;
    grid-template-columns: repeat( auto-fit, minmax(max(50%, 450px), 1fr) );
    align-items: center;
    justify-content: center;
    padding: 0 20px;
  `
}

export default Home as any as Typed<Home>
