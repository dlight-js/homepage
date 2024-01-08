import { View } from "@dlightjs/dlight"
import { type Typed, div, img, Pretty, Env, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { Navigator } from "@dlightjs/components"
import { EnvType } from "../../../App.view"

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
class FeatureCard implements FeatureCardProps, EnvType {
  @Env navigator: Navigator = required
  @Env themeType: EnvType["themeType"] = required
  @Env theme: EnvType["theme"] = required
  @Env i18n: EnvType["i18n"] = required
  @Prop data = required

  View() {
    div()
      .class(this.featureCardWrapCss)
    {
      img()
        .src(this.themeType === "dark" ? this.data.darkImgUrl : this.data.imgUrl)
        .class(this.featureCardIconCss)
      div(this.i18n!(this.data.title, this.data.zhTitle))
        .class(this.featureCardTitleCss)
      div(this.i18n!(this.data.content, this.data.zhContent))
        .class(this.featureCardContentCss)
    }
  }

  featureCardWrapCss = css`
    display: flex;
    flex: 1;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px 0;
    margin: 15px;;
    border-radius: 10px;
    box-shadow: 0 0 8px 0 ${this.theme!.lightShadow};
    background-color: ${this.theme?.secondBg};
  `

  featureCardIconCss = css`
    width: 30px;
    height: 30px;
  `

  featureCardTitleCss = css`
    font-size: large;
    font-weight: 600;
    margin: 14px 0;
  `

  featureCardContentCss = css`
    font-weight: light;
    width: 80%;
  `
}

export default FeatureCard as Pretty as Typed<FeatureCardProps>
