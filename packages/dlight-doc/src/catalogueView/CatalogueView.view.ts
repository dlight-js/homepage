import { CustomNode, View } from "@dlightjs/dlight"
import { code, div, pre, Prop, required, Typed } from "@dlightjs/types"

class CatalogueView extends View {
    @Prop _$content = required
    didMount() {
        console.log(this._$content)
    }

    Body() {
        // for(const heading of this._$content) {
        // }
    }

    /** @style */
}

export default CatalogueView as any as Typed<CatalogueView>
