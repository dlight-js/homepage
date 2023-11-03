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
  isChangedblCount = false
  isChangeCount = false

  incrementCount() {
    if (!this.isChangeCount && !this.isChangedblCount) {
      this.count++
      this.isChangeCount = true
      setTimeout(() => {
        this.isChangeCount = false
      }, 4000)
    }
  }

  incrementDoubleCount() {
    if (!this.isChangedblCount && !this.isChangeCount) {
      this.doubleCount++
      this.isChangedblCount = true
      setTimeout(() => {
        this.isChangedblCount = false
      }, 3000)
    }
  }

  Body() {
    div()
      .className(this.exampleWrapCss)
    {
      div()
        .className(this.overlapCss)
      {
        img()
          // .src(this.isDark ? "/imgs/code-example-dark.png" : "/imgs/code-example-light.png")
          .src("/imgs/code-example-light.png")
          .alt("code-example")
          .className(this.codeExampleCss)
        ExampleResult()
          .count(this.count)
          .doubleCount(this.doubleCount)
          .incrementCount(this.incrementCount)
          .incrementDoubleCount(this.incrementDoubleCount)
      }
      ReactiveGraph()
        .count(this.count)
        .dblCount(this.doubleCount)
        .isChangedblCount(this.isChangedblCount)
    }
  }

  exampleWrapCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    transform: translateX(100px);
  `

  codeExampleCss = css`
    width: ${getSize(400)};
    opacity: 0.9;
    position: absolute;
  `

  overlapCss = css`
    width: 400px;
    height: 480px;
    margin: 50px 0;
    position: relative;
  `
}

export default Example as Pretty as Typed
