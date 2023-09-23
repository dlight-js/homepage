import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required, Prop, RequiredProp, img } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

export interface FeatureDataType {
  title: string
  imgUrl: string
  content: string
}

class FeatureCard extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop data: RequiredProp<FeatureDataType> = required

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
    min-width: 270px;
    margin: 20px 8px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 350px;
    border-radius: 15px;
    background-color: ${this.theme.orange4};
    color: ${this.theme.green12};
  `

  featureCardIconCss = css`
    width: 50px;
    height: 50px;
  `
  featureCardTitleCss = css`
    font-size: 20px;
    font-weight: 600;
    margin: 18px 0;
  `
  featureCardContentCss = css`
    font-size: 17px;
    font-weight: light;
    width: 60%;
    display: flex;
    flex-wrap: wrap;
  `
}

export default FeatureCard as any as Typed<FeatureCard>
