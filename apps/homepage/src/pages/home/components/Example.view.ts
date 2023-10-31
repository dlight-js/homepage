import { Env, View, required } from "@dlightjs/dlight"
import { type Typed, img, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../utils/utilFunc"
import ExampleResult from "./ExampleResult.view"
import ReactiveGraph from "./reactiveGraph/ReactiveGraph.view"

@View
class Example {
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env isMobile: boolean = required
  isDark = this.themeType === "dark"
  count = 0
  doubleCount = this.count * 2

  incrementCount() {
    this.count++
  }

  incrementDoubleCount() {
    this.doubleCount++
  }

  Body() {
    div()
      .className(this.exampleWrapCss)
    {
      img()
        .src(this.isDark ? "/imgs/code-example-dark.png" : "/imgs/code-example-light.png")
        .alt("code-example")
        .className(this.codeExampleCss)
      ExampleResult()
        .count(this.count)
        .doubleCount(this.doubleCount)
        .incrementCount(this.incrementCount)
        .incrementDoubleCount(this.incrementDoubleCount)
      ReactiveGraph()
        .count(this.count)
        .dblCount(this.doubleCount)
    }
  }

  exampleWrapCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  codeExampleCss = css`
    width: ${getSize(400)};
  `
}

export default Example as Pretty as Typed
