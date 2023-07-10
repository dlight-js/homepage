import DLight, { View } from "@dlightjs/dlight"
import MarkitView, { addBlockRule } from "@dlightjs/markit"
import { code, div, pre, Typed } from "@dlightjs/types"
import hljs from "highlight.js/lib/core"
import javascript from "highlight.js/lib/languages/javascript"
import "highlight.js/styles/github.css"

class DlightDoc extends View {
  testMDString = `
Here's a simple footnote,[^1] and here's a longer one.[^bignote]

hhh
**b*o*ld**

***hhh*hh**

*italic*~~ddd~~test \`function test { console.log('hello')}\`

[haha](https://www.baidu.com)

\`\`\`js
console.log('hello');
\`\`\`

# heading1

## heading2

### heading3

----[dashed]
`
  highlightedCode
  willMount() {
    // const highlighter = await getHighlighter({
    //   theme: t,
    //   langs: ["javascript", "python"]
    // })
    // const code = "console.log(\"Here is your code.\");"
    hljs.registerLanguage("javascript", javascript)
    const highlightedCode = hljs.highlightAuto("console.log(\"Here is your code.\");").value
    this.highlightedCode = highlightedCode
    console.log(highlightedCode, "看看输出")
  }

  Body() {
    pre()
    {
      code()
        .innerHTML(this.highlightedCode)
    }
    MarkitView(this.testMDString)
  }
}

export default DlightDoc as any as Typed<DlightDoc>
