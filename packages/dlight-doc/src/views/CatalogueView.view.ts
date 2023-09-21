import { View } from "@dlightjs/dlight"
import { a, div, Prop, required, RequiredProp, Typed } from "@dlightjs/types"
import { InlineRenderer } from "@dlightjs/markit"
import { css } from "@dlightjs/easy-css"

class CatalogueView extends View {
  @Prop _$content = required
  @Prop currentIndex: RequiredProp<number> = required
  @Prop updateCurrentIndex: RequiredProp<(index: number) => void> = required

  Body() {
    div()
      .className(this.dlightDocCatalogueWrapCss)
    {
      for (const [index, heading] of this._$content.entries()) {
        div()
          .className(heading.props.headingLevel > 1 ? this.dlightDocSecondaryHeadCss : this.dlightDocPrimaryHeadCss)
        {
          for (const item of heading.content) {
            a()
              .href(`#${item.content}`)
              .onclick(() => { this.updateCurrentIndex(index) })
              .className(this.dlightDocHeadingLinkCss(index))
            {
              InlineRenderer[item.type](item.content)
                .props(item.props)
            }
          }
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
      margin-right: 20px;
    `
  dlightDocHeadingLinkCss = (index: number) => css`
    text-decoration: none;
    font-size: 0.875rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.75rem;
    padding-left: 20px;
    color: ${index === this.currentIndex ? "#daa172" : "#445d2a"};
    border-left: ${index === this.currentIndex ? "solid 2px #daa172" : undefined};
  `

  dlightDocSecondaryHeadCss = css`
    margin-left: 20px;
  `

  dlightDocPrimaryHeadCss = css`
    font-weight: 600;
  `
}

export default CatalogueView as any as Typed<CatalogueView>
