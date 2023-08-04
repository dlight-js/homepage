import { View } from "@dlightjs/dlight"
import { htmlTag, Prop, required } from "@dlightjs/types"
import { div, css } from "@dlightjs/easy-css"
import { InlineRenderer } from "@dlightjs/markit"

class HeadingBlock extends View {
  @Prop _$content = required
  @Prop props = required
  headdingName = `h${this.props.headingLevel}`

  Body() {
    htmlTag(this.headdingName)()
      .className(this.dlightMarkitHeading)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
    if (this.props.headingLevel === 1) {
      div()
        .height("1px")
        .width("90%")
        .marginTop("-10px")
        .marginBottom("20px")
        .rounded()
        .bgSlate200()
    }
  }

  dlightMarkitHeading = css``
}

export default HeadingBlock
