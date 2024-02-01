import { View } from "@dlightjs/dlight"
import { a, Content, ContentProp, div, Env, Pretty, Prop, required, Typed, Watch } from "@dlightjs/types"
import { InlineRenderer } from "@dlightjs/markit"
import { css } from "@emotion/css"
import clsx from "clsx"

interface CatalogueViewProps {
  content: ContentProp
  currentIndex: number
  isShowShadow: boolean
  updateCurrentIndex: (index: number) => void
  scrollToTop: (e: any) => void
}

@View
class CatalogueView implements CatalogueViewProps {
  @Env i18n: any = required
  @Env textColor: string = required
  @Env highlightColor: string = required
  @Content content: any = required
  @Prop currentIndex = required
  @Prop isShowShadow = required
  @Prop updateCurrentIndex = required
  @Prop scrollToTop = required

  View() {
    div(this.i18n("To Top", "回到顶部"))
      .style({ textDecoration: "underline", fontWeight: 600, cursor: "pointer", width: "max-content" })
      .class(this.dlightDocHeadingLinkCss(-1))
      .onClick(this.scrollToTop)
    for (const [index, heading] of Object.entries(this.content)) {
      for (const item of heading.content) {
        a()
          .href(`#${item.content}`)
          .onClick((e) => {
            e.stopPropagation()
            this.updateCurrentIndex(Number(index))
          })
          .class(clsx(this.dlightDocHeadingLinkCss(Number(index)), heading.props.headingLevel > 1 ? this.dlightDocSecondaryHeadCss : this.dlightDocPrimaryHeadCss))
        {
          InlineRenderer[item.type](item.content)
            .props(item.props)
        }
      }
    }
  }

  /** @style */
  toTopCss = css`
    text-decoration: underline;
    font-weight: 600;
    cursor: pointer;
    width: max-content;
  `

  dlightDocHeadingLinkCss = (index: number) => css`
    display: block;
    text-decoration: none;
    font-size: 0.875rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.75rem;
    padding-left: 20px;
    color: ${index === this.currentIndex ? this.highlightColor : this.textColor};
    border-left: ${index === this.currentIndex ? `solid 2px ${this.highlightColor}` : undefined};
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
}

export default CatalogueView as Pretty as Typed<CatalogueViewProps>
