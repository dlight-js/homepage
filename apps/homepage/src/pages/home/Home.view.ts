import { Env, View, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div } from "@dlightjs/types"
import Header from "./components/header"
import { css } from "@iandx/easy-css"
import { FeatureData } from "../../const/homeData"
import FeatureCardGroup from "./components/FeatureCardGroup.view"
import Footer from "./components/Footer.view"
import Example from "./components/Example.view"
import { getSize } from "../../utils/utilFunc"
import Title from "./components/Title.view"

@View
class Home {
  @Env navigator = required
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env isMobile: boolean = required
  featureData = FeatureData
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
        Title()
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
      Footer()
    }
  }

  bgCss = css`
    /* background: ${this.themeType === "dark" ? "linear-gradient(#330172, #000000)" : "linear-gradient(#fff9f4, #fff9f4)"}; */
    background-color: ${this.theme.primaryBgColor};
    overflow-x: hidden;
  `

  titleExampleWrapCss = css`
    padding: 0 ${getSize(10)};
    margin-top: ${getSize(30)};
    display: ${this.isMobile ? "block" : "flex"};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  `

  featureCardWrap = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
  `
}

export default Home as Pretty as Typed
