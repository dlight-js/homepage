import { Content, Prop, required, View } from "@dlightjs/dlight"
import { ContentProp, div, htmlTag, Pretty, Typed } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { InlineRenderer } from "@dlightjs/markit"

interface HeadingBlockProps {
  content: ContentProp<any>
  props: any
}

@View
class HeadingBlock implements HeadingBlockProps {
  @Prop @Content content: any = required
  @Prop props = required

  headdingName = `h${this.props.headingLevel}`

  Body() {
    htmlTag(this.headdingName)()
      .id(this.content[0].content)
      .className(this.dlightMarkitHeading)
    {
      for (const content of this.content) {
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
