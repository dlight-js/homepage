import { View } from "@dlightjs/dlight"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { div, Prop, required, RequiredProp, Typed } from "@dlightjs/types"
import "highlight.js/styles/github.css"
import AdvantageBlock from "./advantageBlock/AdvantageBlock.view"
import CatalogueView from "./catalogueView/CatalogueView.view"
import { css } from "@dlightjs/easy-css"

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
  testMDString = `
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

hhh
**b*o*ld**

***hhh*hh**

*italic*~~ddd~~test \`function test { console.log('hello')}\`

## 标题2

[haha](https://www.baidu.com)

\`\`\`js
console.log('hello sd dyh');
function test () {
  const hh = 1
}
Body() {
  div()
    .className(this.dlightMarkitCodeBlock)
  {
    div(this.title)
      .className(this.dlightMarkitCodeBlockHeader)
    div()
      .className(this.dlightMarkitCode)
    {
      pre()
      {
        code()
          .innerHTML(this.highlightedCode)
      }
      div("copy")
    }
  }
}
\`\`\`

\`\`\`python
print("hhh")
a=12
b=15
c=a+b
\`\`\`

# heading1

## heading2

### heading3

----[dashed]
  `
  docAst: any = []
  cata = []

  getAst = (ast) => {
    this.docAst = ast
  }

  Body() {
    div()
      .className(this.dlightDocWrap)
    {
      div()
        .className(this.dlightContentWrap)
      {
        MarkitView(this.testMDString)
          .getAst(this.getAst)
      }
      CatalogueView(this.docAst.filter(paragraph => paragraph.type === "Heading"))
    }
  }

  dlightContentWrap = css`
    flex-grow: 1;
  `

  dlightDocWrap = css`
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
  `
}

export default DlightDoc as any as Typed<DlightDoc>
// export default DlightDoc
