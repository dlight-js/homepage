import { View, type Typed, Pretty, div } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import TitleBoard from "./TitleBoard/TitleBoard.view"
import CodeBlock from "./CodePreview/CodeBlcok.view"
import forLoop from "./CodePreview/ForLoopExample.view"
import reactivity from "./CodePreview/ReactivityExample.view"
import ifStatement from "./CodePreview/IfExample.view"
import environment from "./CodePreview/EnvExample.view"
import FeatureCardBoard from "./FeatureCard/FeatureCardBoard.view"
import Footer from "./Footer/Footer.view"
@View
class Home {
  Body() {
    div()
      .class(this.bgCss)
    {
      TitleBoard()
      CodeBlock(reactivity)
      CodeBlock(ifStatement)
      CodeBlock(forLoop)
      CodeBlock(environment)
      FeatureCardBoard()
      Footer()
    }
  }

  bgCss = css`
    overflow-x: hidden;
  `
}

export default Home as Pretty as Typed
