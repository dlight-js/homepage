import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import DLightEditor from "dlight-editor"
import { PreviewCode } from "../../utils/const"
import { KeyboardArrowRightFilled } from "@dlightjs/material-icons"

class PreviewSection extends View {
  @Env navigator: any = required
  @Env theme: any = required

  isHover = false

  Body() {
    div()
      .className(this.previewWrapCss)
    {
      div()
        .className(this.descriptionWrapCss)
      {
        div("This is a title")
          .className(this.titleCss)
        div(`In the bustling heart of the city, life pulses with an unyielding energy that seems to infuse every corner with a sense of purpose. Tall skyscrapers reach for the heavens, casting elongated shadows that dance upon the streets below. Amidst the urban cacophony, a symphony of cultures intertwines, creating a vibrant tapestry of diversity.
        Coffee shops exude the rich aroma of freshly ground beans, inviting passersby to take a momentary escape from the rush. Pedestrians hurry along the sidewalks, their footsteps echoing a rhythm of urgency, while artists display their creations on makeshift galleries, adding splashes of color to the gray concrete.
        `)
          .className(this.contentCss)
        div()
          .className(this.viewMoreCss)
          .onmouseenter(() => { this.isHover = true })
          .onmouseleave(() => { this.isHover = false })
          .onclick(() => { this.navigator.to("/examples") })
        {
          div("View More Examples")
          KeyboardArrowRightFilled()
            .className(this.arrowCss)
            .color(this.theme.green12)
        }
      }
      div()
        .className(this.codeWrapCss)
      {
        DLightEditor()
          .modules([{
            code: PreviewCode,
            path: "/index.ts"
          }])
          .width("500px")
          .height("500px")
          .themeType("light")
      }
    }
  }

  previewWrapCss = css`
    margin: 108px auto;
    padding: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: 15px;
    /* background-color: ${this.theme.orange4}; */
    width: 75%;
    min-width: 550px;
    height: 680px;
    line-height: 1.75rem;
    color: ${this.theme.green12};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  descriptionWrapCss = css`
    width: 40%;
    margin-right: 70px;
  `

  titleCss = css`
    font-size: 35px;
    margin-bottom: 40px;
  `

  contentCss = css`
    margin: 20px 0;
  `

  viewMoreCss = css`
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  `
  arrowCss = css`
    padding-top: 8px;
  `

  codeWrapCss = css`
    height: 500px;
    width: 500px;
    overflow: hidden;
    border-radius: 10px;
  `
}

export default PreviewSection as any as Typed<PreviewSection>
