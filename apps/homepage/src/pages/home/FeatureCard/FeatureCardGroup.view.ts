import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div, required, Prop } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import FeatureCard, { FeatureDataType } from "./FeatureCard.view"
import { getSize } from "../../../utils/utilFunc"

interface FeatureCardGroupProps {
  data: FeatureDataType[]
}

@View
class FeatureCardGroup implements FeatureCardGroupProps {
  @Prop data = required

  View() {
    div()
      .class(this.featureGroupWrapCss)
    {
      for (const feature of this.data) {
        FeatureCard()
          .data(feature)
      }
    }
  }

  featureGroupWrapCss = css`
    box-sizing: border-box;
    max-width: ${getSize(680)};
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  `
}

export default FeatureCardGroup as Pretty as Typed<FeatureCardGroupProps>
