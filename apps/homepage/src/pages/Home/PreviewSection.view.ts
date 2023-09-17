import { View } from "@dlightjs/dlight"
import { type Typed, div, Env, required } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import DLightEditor from "dlight-editor"
import { PreviewCode } from "../../utils/const"

class PreviewSection extends View {
  @Env navigator: any = required
  @Env theme: any = required

  Body() {
    div()
      .className(this.previewWrapCss)
    {
      div()
      {
        div("This is a title")
        div(`In the bustling heart of the city, life pulses with an unyielding energy that seems to infuse every corner with a sense of purpose. Tall skyscrapers reach for the heavens, casting elongated shadows that dance upon the streets below. Amidst the urban cacophony, a symphony of cultures intertwines, creating a vibrant tapestry of diversity.
        Coffee shops exude the rich aroma of freshly ground beans, inviting passersby to take a momentary escape from the rush. Pedestrians hurry along the sidewalks, their footsteps echoing a rhythm of urgency, while artists display their creations on makeshift galleries, adding splashes of color to the gray concrete.
        `)
        div()
        {
          div("View More Examples")
        }
      }
      div()
        .style({
          height: "500px"
        })
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
    border-radius: 15px;
    background-color: ${this.theme.orange4};
    width: 60%;
    min-width: 550px;
    height: 680px;
  `
}

export default PreviewSection as any as Typed<PreviewSection>
