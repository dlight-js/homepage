import { View } from "@dlightjs/dlight"
import { div, htmlTag, Pretty, Prop, required, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { InlineRenderer } from "@dlightjs/markit"

interface HeadingBlockProps {
  _$content: any
  props: any
}

class HeadingBlock extends View implements HeadingBlockProps {
  @Prop _$content = required
  @Prop props = required

  headdingName = `h${this.props.headingLevel}`

  Body() {
    htmlTag(this.headdingName)()
      .id(this._$content[0].content)
      .className(this.dlightMarkitHeading)
    {
      for (const content of this._$content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
    if (this.props.headingLevel === 1) {
      div()
        .className(this.dlightMarkitHeading1UnderLineCss)
    }
  }

  dlightMarkitHeading = css``

  dlightMarkitHeading1UnderLineCss = css`
    height: 1px;
    width: 90%;
    margin-top: -10px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: rgba(44, 50, 56, 0.2);
  `
}

export default HeadingBlock as Pretty as Typed<HeadingBlockProps>
