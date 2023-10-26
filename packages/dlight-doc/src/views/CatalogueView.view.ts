import { Content, Prop, required, View } from "@dlightjs/dlight"
import { a, ContentProp, div, Pretty, Typed } from "@dlightjs/types"
import { InlineRenderer } from "@dlightjs/markit"
import { css } from "@iandx/easy-css"

interface CatalogueViewProps {
  content: ContentProp
  currentIndex: number
  isShowShadow: boolean
  updateCurrentIndex: (index: number) => void
  scrollToTop: (e: any) => void
}

@View
class CatalogueView implements CatalogueViewProps {
  @Prop @Content content: any = required
  @Prop currentIndex = required
  @Prop isShowShadow = required
  @Prop updateCurrentIndex = required
  @Prop scrollToTop = required

  Body() {
    div("To Top")
      .style({ textDecoration: "underline", fontWeight: 600, cursor: "pointer", width: "max-content" })
      .className(this.dlightDocHeadingLinkCss(-1))
      .onclick(this.scrollToTop)
    for (const [index, heading] of this.content.entries()) {
      for (const item of heading.content) {
        a()
          .href(`#${item.content}`)
          .onclick((e) => {
            e.stopPropagation()
            this.updateCurrentIndex(index)
          })
          .className(this.dlightDocHeadingLinkCss(index))
          .className(heading.props.headingLevel > 1 ? this.dlightDocSecondaryHeadCss : this.dlightDocPrimaryHeadCss)
        {
          InlineRenderer[item.type](item.content)
            .props(item.props)
        }
      }
    }
  }

  /** @style */
  dlightDocCatalogueWrapCss = css`
      right: 0;
      position: fixed;
      width: 248px;
      max-width: 248px;
      padding-bottom: 25px;
      padding-right: 20px;
      background-color: white;
      padding-top: ${this.isShowShadow ? "30px" : "0"};
      box-shadow: ${this.isShowShadow ? "0 2px 8px 0 #A9A9A9" : ""};
    `

  dlightDocHeadingLinkCss = (index: number) => css`
    display: block;
    text-decoration: none;
    font-size: 0.875rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.75rem;
    padding-left: 20px;
    color: ${index === this.currentIndex ? "#daa172" : "#445d2a"};
    border-left: ${index === this.currentIndex ? "solid 2px #daa172" : undefined};
    width: calc(100% - 30px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `

  dlightDocSecondaryHeadCss = css`
    margin-left: 20px;
  `

  dlightDocPrimaryHeadCss = css`
    font-weight: 600;
  `
  dligthDocToTopCss = css`
    text-decoration: underline;
    font-weight: 600;
  `
}

export default CatalogueView as Pretty as Typed<CatalogueViewProps>
