import { CustomNode, View } from "@dlightjs/dlight"
import { Prop, RequiredProp, Typed, required } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import Header from "./Home/Header.view"

class DocPage extends View {
  @Prop fileName: RequiredProp<string> = required
  mdString: string = ''
  didMount(_els: HTMLElement[], _node: CustomNode): void {
    fetch(this.fileName)
      .then(data => data.text())
      .then(text => this.mdString = text)
      .catch(err => console.log(err))
  }
  Body() {
    Header()
    DlightDoc(this.mdString)
  }
}

export default DocPage as any as Typed<DocPage>
