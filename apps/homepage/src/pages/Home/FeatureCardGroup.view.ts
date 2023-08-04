import { View } from "@dlightjs/dlight"
import { type Typed, required, Prop, RequiredProp } from "@dlightjs/types"
import { div } from "@dlightjs/easy-css"
import FeatureCard, { FeatureDataType } from "./FeatureCard.view"

class FeatureCardGroup extends View {
  @Prop data: RequiredProp<FeatureDataType[]> = required

  Body() {
    div()
      .grid()
      .gridTemplateColumns("repeat( auto-fit, minmax(260px, 1fr) )")
    {
      for (const feature of this.data) {
        FeatureCard()
          .data(feature)
      }
    }
  }
}

export default FeatureCardGroup as any as Typed<FeatureCardGroup>
