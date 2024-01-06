import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import TitleBoard from "./TitleBoard/TitleBoard.view"
import CodeDisplay from "./CodePreview/CodeDisplay.view"
import CodeBlock from "./CodePreview/CodeBlcok.view"
import { ForLoop, forLoopCode } from "./CodePreview/CodeList.view"

@View
class Home {

  View() {
    div()
      .class(this.bgCss)
    {
      TitleBoard()
      CodeBlock()
        .code(forLoopCode)
        .title("For loop")
        .preview(ForLoop)
      // FeatureCardBoard()
    }
  }

  bgCss = css`
    overflow-x: hidden;
  `
}

export default Home as Pretty as Typed
