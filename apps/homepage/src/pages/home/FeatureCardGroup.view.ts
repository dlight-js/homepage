import { View } from "@dlightjs/dlight"
import { type Typed, required, Prop, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import FeatureCard, { FeatureDataType } from "./FeatureCard.view"
import { getSize } from "../../utils/utilFunc"

interface FeatureCardGroupProps {
  data: FeatureDataType[]
}

class FeatureCardGroup extends View implements FeatureCardGroupProps {
  @Prop data = required

  Body() {
    div()
      .className(this.featureGroupWrapCss)
    {
      for (const feature of this.data) {
        FeatureCard()
          .data(feature)
      }
    }
  }

  featureGroupWrapCss = css`
    box-sizing: border-box;
    max-width: ${getSize(580)};
    display: flex;
    flex: 1;
    flex-wrap: wrap;
  `
}

export default FeatureCardGroup as Pretty as Typed<FeatureCardGroupProps>
