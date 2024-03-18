import { View, ContentProp, div, tag, Pretty, Typed, Content, Prop, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { InlineRenderer } from "@dlightjs/markit"

interface HeadingBlockProps {
  content: ContentProp<any>
  mdProps: any
}

@View
class HeadingBlock implements HeadingBlockProps {
  @Content content: any = required
  @Prop mdProps = required

  headingName = `h${this.mdProps.headingLevel}`

  Body() {
    tag(this.headingName)()
      .id(this.content[0].content)
      .class(this.dlightMarkitHeading)
    {
      for (const content of this.content) {
        InlineRenderer[content.type](content.content)
          .mdProps(content.props)
      }
    }
    if (this.mdProps.headingLevel === 1) {
      div()
        .class(this.dlightMarkitHeading1UnderLineCss)
    }
  }

  dlightMarkitHeading = css``

  dlightMarkitHeading1UnderLineCss = css`
    height: 1px;
    width: 100%;
    margin-top: -10px;
    margin-bottom: 20px;
    border-radius: 10px;
    background-color: rgba(44, 50, 56, 0.2);
  `
}

export default HeadingBlock as Pretty as Typed<HeadingBlockProps>
