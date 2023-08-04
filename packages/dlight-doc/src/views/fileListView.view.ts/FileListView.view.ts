import { View } from "@dlightjs/dlight"
import { Prop, required, Typed } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class CatalogueView extends View {
  @Prop _$content = required

  didMount() {
    console.log(this._$content)
  }

  Body() {

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
