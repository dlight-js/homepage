import { CustomNode, View } from "@dlightjs/dlight"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { Prop, required, RequiredProp } from "@dlightjs/types"
import "highlight.js/styles/github.css"
import AdvantageBlock from "./advantageBlock/AdvantageBlock.view"

addBlockRule({
  name: "CodeBlock",
  rule: {
    getProps: raw => {
      const text = raw.replace(/ *```|```$/g, "")
      let [language, title] = (text.match(/^.+?\n/g) ?? ["text"])[0].replace("```", "").trim().split("[")
      if (title) {
        title = title.replace("]", "")
      }
      return { language, title }
    }
  },
  view: AdvantageBlock
})

class DlightDoc extends View {
  @Prop _$content: RequiredProp<string> = required
  cata = []

  didMount(_els: HTMLElement[], _node: CustomNode): void {
    console.log(this.cata)
  }

  getCatalogue = (cata) => {
    this.cata = cata
  }

  Body() {
    MarkitView(this._$content)
      .getCatalogue(this.getCatalogue)
  }
}

// export default DlightDoc as any as Typed<DlightDoc>
export default DlightDoc
