import { View } from "@dlightjs/dlight"
import { div, Prop, required, Typed } from "@dlightjs/types"
import { InlineRenderer } from "@dlightjs/markit"
import { css } from "@dlightjs/easy-css"

class CatalogueView extends View {
  @Prop _$content = required

  didMount() {
    console.log(this._$content)
  }

  Body() {
    div()
      .className(this.dlightDocCatalogueBorderCss)
    {
      for (const heading of this._$content) {
        div()
          .className(this.dlightDocHeading1)
        {
          for (const item of heading.content) {
            InlineRenderer[item.type](item.content)
              .props(item.props)
          }
        }
      }
    }
  }

  /** @style */
  dlightDocCatalogueBorderCss = css`
      border-left: solid 1px gray;
      padding-left: 20px;
      width: 268px;
      max-width: 268px;
    `
  dlightDocHeading1 = css`
    font-size: 0.875rem;
    margin: 10px 0;
    color: #6b7280;
  `
}

export default CatalogueView as any as Typed<CatalogueView>
