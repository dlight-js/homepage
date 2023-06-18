import DLight, { CustomNode, View } from "@dlightjs/dlight"
import { div, Typed } from "@dlightjs/types"
import { parse } from "@iandx/markit"

const testMDString = `
hhh
`

class Paragraph extends View {
  @Prop _$content
  Body() {
    div(this._$content)
      ._color("red")
  }
}

const BlockRenderer = {
  Paragraph
}

class MyView extends View {
  /** @prop */

  /** @reactive */
  markitAst: any[] = []

  /** @member */

  /** @function */

  /** @lifecycle */
  didMount(_els: HTMLElement[], _node: CustomNode): void {
    this.markitAst = parse(testMDString)
    console.log(this.markitAst)
    console.log(this.markitAst.map(ast => BlockRenderer[ast.type]))
  }

  /** @view */
  Body() {
    for (const ast of this.markitAst) {
      BlockRenderer[ast.type](ast.content)
    }
  }
}

export default MyView as any as Typed<MyView>
