import { View } from "@dlightjs/dlight"
import { ContentProp, div, tag, Pretty, Typed, Content, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { InlineRenderer } from "@dlightjs/markit"

interface HeadingBlockProps {
  content: ContentProp<any>
  props: any
}

@View
class HeadingBlock implements HeadingBlockProps {
  @Content content: any = required
  @Prop props = required

  headdingName = `h${this.props.headingLevel}`

  View() {
    tag(this.headdingName)()
      .id(this.content[0].content)
      .class(this.dlightMarkitHeading)
    {
      for (const content of this.content) {
        InlineRenderer[content.type](content.content)
          .props(content.props)
      }
    }
    if (this.props.headingLevel === 1) {
      div()
        .class(this.dlightMarkitHeading1UnderLineCss)
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
