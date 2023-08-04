import { CustomNode, View } from "@dlightjs/dlight"
import { Prop, RequiredProp, Typed, div, required } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import Header from "./Home/Header.view"
import { css } from "@dlightjs/easy-css"

class DocPage extends View {
  @Prop fileName: RequiredProp<string> = required
  mdString: string = ""
  willMount(_els: HTMLElement[], _node: CustomNode): void {
    fetch(this.fileName)
      .then(data => data.text())
      .then(text => this.mdString = text)
      .catch(err => console.log(err))
  }

  Body() {
    Header()
    div()
      .className(this.docWrapCss)
    {
      DlightDoc(this.mdString)
    }
  }

  docWrapCss = css`
    padding: 50px 25px;
  `
}

export default DocPage as any as Typed<DocPage>
