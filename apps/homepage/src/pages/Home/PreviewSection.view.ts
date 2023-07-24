import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, Prop, RequiredProp } from "@dlightjs/types"
import { Route, RouterSpace, VStack } from "@dlightjs/components"
import { css } from "@iandx/easy-css"
import DLightEditor from "dlight-editor"
import { PreviewCode, indexCode } from "../../utils/const"


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
                code: indexCode,
                path: "/index.ts"
            },])
            .themeType("light")
    }
  }

  previewWrapCss = css`
    display: flex;
    flex-direction: row;
    border-radius: 15px;
    width: 70%;
    height: 780px;
  `

}

export default PreviewSection as any as Typed<PreviewSection>
