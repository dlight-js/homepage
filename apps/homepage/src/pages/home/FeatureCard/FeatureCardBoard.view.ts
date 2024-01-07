import { View } from "@dlightjs/dlight"
import { div, type Pretty, type Typed } from "@dlightjs/types"
import FeatureCardGroup from "./FeatureCardGroup.view"
import { FeatureData } from "../../../const/homeData"
import { css } from "@iandx/easy-css"

@View
class FeatureCardBoard {
  featureData = FeatureData

  View() {
    div()
      .class(this.featureCardWrap)
    {
      FeatureCardGroup()
        .data(this.featureData.slice(0, 2))
      FeatureCardGroup()
        .data(this.featureData.slice(2, 4))
    }
  }

  featureCardWrap = css`
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    padding: 0 30px;
  `
}

export default FeatureCardBoard as Pretty as Typed
