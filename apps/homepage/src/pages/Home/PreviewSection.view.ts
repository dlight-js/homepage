import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, Prop, RequiredProp } from "@dlightjs/types"
import { Route, RouterSpace, VStack } from "@dlightjs/components"
import { css } from "@iandx/easy-css"
import DLightEditor from "dlight-editor"
import { PreviewCode } from "../../utils/const"


class PreviewSection extends View {
  @Env navigator: any = required
  @Env theme: any = required

  Body() {
    div()
        .className(this.previewWrapCss)
    {
        div("preview testtest")
        DLightEditor()
            .modules([{
                code: PreviewCode,
                path: "/index.ts"
            },])
            .width("500px")
            .height("500px")
            .themeType("light")
    }
  }

  previewWrapCss = css`
    margin: 108px auto;
    padding: 50px;
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    background-color: ${this.theme.orange4};
    width: 600px;
    height: 680px;
  `

}

export default PreviewSection as any as Typed<PreviewSection>
