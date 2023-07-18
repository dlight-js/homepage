import DLight, { CustomNode, View } from "@dlightjs/dlight"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { code, pre, Typed } from "@dlightjs/types"
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
  testMDString = `
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

hhh
**b*o*ld**

***hhh*hh**

*italic*~~ddd~~test \`function test { console.log('hello')}\`

[haha](https://www.baidu.com)

\`\`\`js [config.js]
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
  guideMDString = ""
  async didMount() {
    fetch("README-dep.md")
      .then(async response => await response.text())
      .then(content => {
        console.log(content)
        this.guideMDString = content
      })
      .catch(err => console.log(err))
  }

  Body() {
    MarkitView(this.guideMDString)
  }
}

export default DlightDoc as any as Typed<DlightDoc>
