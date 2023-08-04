import { CustomNode, View } from "@dlightjs/dlight"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { div, Prop, required, RequiredProp, Typed } from "@dlightjs/types"
import "highlight.js/styles/github.css"
import CatalogueView from "./views/catalogueView/CatalogueView.view"
import { css } from "@dlightjs/easy-css"
import { AdvantageBlock, HeadingBlock } from "./blocks"

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

addBlockRule({
  name: "Heading",
  rule: "default",
  view: HeadingBlock
})

class DlightDoc extends View {
  @Prop _$content: RequiredProp<string> = required

  docAst: any = []
  cata = []

  getAst = (ast) => {
    this.docAst = ast
    console.log(ast)
  }

  Body() {
    div()
      .className(this.dlightDocWrap)
    {
      div()
        .className(this.dlightContentWrap)
      {
        MarkitView(this._$content)
          .getAst(this.getAst)
      }
      CatalogueView(this.docAst.filter(paragraph => paragraph.type === "Heading"))
    }
  }

  dlightContentWrap = css`
    flex-grow: 1;
    width: 60%;
    margin-right: 10%;
  `

  dlightDocWrap = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    .dlight-markit-text {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      word-wrap: break-word;
      color: rgb(51, 65, 85);
      line-height: 1.75rem;
    }
  `
}

export default DlightDoc as any as Typed<DlightDoc>
// export default DlightDoc
