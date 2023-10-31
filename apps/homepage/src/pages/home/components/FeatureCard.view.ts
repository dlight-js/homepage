import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, div, img, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../utils/utilFunc"
import { Navigator } from "@dlightjs/components"

export interface FeatureDataType {
  title: string
  imgUrl: string
  darkImgUrl: string
  content: string
  zhContent: string
}

interface FeatureCardProps {
  data: FeatureDataType
}

@View
class FeatureCard implements FeatureCardProps {
  @Env navigator: Navigator = required
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env i18n: any = required
  @Prop data = required

  Body() {
    div()
      .className(this.featureCardWrapCss)
    {
      img()
        .src(this.themeType === "dark" ? this.data.darkImgUrl : this.data.imgUrl)
        .className(this.featureCardIconCss)
      div(this.i18n(this.data.title, this.data.zhTitle))
        .className(this.featureCardTitleCss)
      div(this.i18n(this.data.content, this.data.zhContent))
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
    background-color: ${this.theme.secondaryBgColor};
    ${this.themeType === "dark" ? "box-shadow: 0 0 15px -3px #ABA0C0;" : ""}
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.theme.primaryTextColor};
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
    color: ${this.theme.secondaryTextColor};
    display: flex;
    flex-wrap: wrap;
  `
}

export default FeatureCard as Pretty as Typed<FeatureCardProps>
