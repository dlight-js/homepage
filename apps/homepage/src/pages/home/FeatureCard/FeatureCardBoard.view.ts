import { View } from "@dlightjs/dlight"
import { div, SubTyped, type Pretty, type Typed, Env, required, h1, p } from "@dlightjs/types"
import { FeatureData } from "../../../const/homeData"
import { css } from "@iandx/easy-css"
import FeatureCard from "./FeatureCard.view"
import { EnvType } from "../../../App.view"

@View
class FeatureCardBoard implements EnvType {
  @Env isShortView: EnvType["isShortView"] = required
  @Env i18n: EnvType["i18n"] = required

  @View
    CardGroup = (({ leftData, rightData }: { leftData: any, rightData: any }) => {
      div()
        .class(this.featureGroupWrapCss)
      {
        FeatureCard()
          .data(leftData)
        FeatureCard()
          .data(rightData)
      }
    }) as Pretty as SubTyped<{ leftData: any, rightData: any }>

  featureGroupWrapCss = css`
    display: flex;
    align-items: stretch;
  `
  View() {
    div().class(this.wrapperCss); {
      div().class(this.titleWrapperCss); {
        h1(this.i18n!("Features", "特性"))
          .class(this.titleCss)
        p(this.i18n!("Things that every framework brags about...", "每个框架都在吹嘘的东西..."))
      }
      if (this.isShortView) {
        this.CardGroup()
          .leftData(FeatureData[0])
          .rightData(FeatureData[1])
        this.CardGroup()
          .leftData(FeatureData[2])
          .rightData(FeatureData[3])
      } else {
        div()
          .class(this.featureGroupWrapCss)
        {
          for (const data of FeatureData) {
            FeatureCard()
              .data(data)
          }
        }
      }
    }
  }

  wrapperCss = css`
    display: flex;
    flex-direction: column;
    align-items: ${this.isShortView ? "flex-start" : "center"};
    justify-content: ${this.isShortView ? "flex-start" : "center"};
    margin: 120px 25px;
  `

  titleWrapperCss = css`
    display: flex;
    flex-direction: column;
    align-items: ${this.isShortView ? "flex-start" : "center"};
    justify-content: ${this.isShortView ? "flex-start" : "center"};
    margin: 0 15px;
  `

  titleCss = css`
    margin: 0;
  `
}

export default FeatureCardBoard as Pretty as Typed
