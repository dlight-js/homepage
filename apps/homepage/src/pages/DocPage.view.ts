import { View } from "@dlightjs/dlight"
import { Typed } from "@dlightjs/types"
import DlightDoc from "dlight-doc"

class DocPage extends View {
  Body() {
    DlightDoc()
  }
}

export default DocPage as any as Typed<DocPage>
