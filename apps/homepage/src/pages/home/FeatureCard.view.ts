import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required, Prop, img, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../utils/utilFunc"
import { Navigator } from "@dlightjs/components"

export interface FeatureDataType {
  title: string
  imgUrl: string
  content: string
}

interface FeatureCardProps {
  data: FeatureDataType
}

class FeatureCard extends View implements FeatureCardProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Prop data = required

  Body() {
    div()
      .className(this.featureCardWrapCss)
    {
      img()
        .src(this.data.imgUrl)
        .className(this.featureCardIconCss)
      div(this.data.title)
        .className(this.featureCardTitleCss)
      div(this.data.content)
        .className(this.featureCardContentCss)
    }
  }

  featureCardWrapCss = css`
    flex: 1;
    flex-shrink: 1;
    box-sizing: border-box;
    min-width: ${getSize(270)};
    margin: ${getSize(20)} ${getSize(8)};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: ${getSize(350)};
    border-radius: 15px;
    background-color: ${this.theme.orange4};
    color: ${this.theme.green12};
  `

  featureCardIconCss = css`
    width: ${getSize(50)};
    height: ${getSize(50)};
  `

  featureCardTitleCss = css`
    font-size: ${getSize(20)};
    font-weight: 600;
    margin: ${getSize(18)} 0;
  `

  featureCardContentCss = css`
    font-size: ${getSize(17)};
    font-weight: light;
    width: 60%;
    display: flex;
    flex-wrap: wrap;
  `
}

export default FeatureCard as Pretty as Typed<FeatureCardProps>
