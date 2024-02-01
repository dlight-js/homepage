import { View } from "@dlightjs/dlight"
import { type Typed, img, Pretty, div, Env, Watch, required } from "@dlightjs/types"
import { css } from "@emotion/css"
import ExampleResult from "./ExampleResult.view"
import ReactiveGraph from "./reactiveGraph/ReactiveGraph.view"
import { getSize } from "../../../utils/utilFunc"

@View
class Example {
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env isMobile: boolean = required
  @Env windowWidth: number = required
  isDark = this.themeType === "dark"
  count = 0
  doubleCount = this.count * 2
  isChangedblCount = false
  isChangeCount = false
  scale = this.windowWidth / 1200 < 0.7 ? 0.7 : this.windowWidth / 1200
  isShowCode = false

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

  @Watch
  getScale() {
    if (this.isMobile) {
      this.scale = 0.5
    } else {
      this.scale = this.windowWidth / 1200 < 0.7 ? 0.7 : this.windowWidth / 1200
    }
  }

  View() {
    if (this.isShowCode) {
      div()
        .class(this.codeWrapCss)
      {
        img()
          .src(this.isDark ? "/imgs/code-example-dark.png" : "/imgs/code-example-light.png")
          .alt("code-example")
          .class(this.codeExampleCss)
      }
    } else {
      div()
        .class(this.exampleWrapCss)
      {
        div()
          .class(this.overlapCss)
        {
          ExampleResult()
            .count(this.count)
            .doubleCount(this.doubleCount)
            .incrementCount(this.incrementCount)
            .incrementDoubleCount(this.incrementDoubleCount)
          ReactiveGraph()
            .count(this.count)
            .dblCount(this.doubleCount)
            .isChangedblCount(this.isChangedblCount)
        }
      }
    }
    div(this.isShowCode ? "Show Example" : "Show Code")
      .class(this.showCodeCss)
      .onClick(() => {
        this.isShowCode = !this.isShowCode
      })
  }

  exampleWrapCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: ${this.scale * 60}px;
    transform: ${`translateX(${this.isMobile ? -80 : 20 * this.scale}px)`} scale(${this.scale});
  `

  codeExampleCss = css`
    width: ${getSize(400)};
    position: absolute;
  `

  codeWrapCss = css`
    margin: 0 auto;
    margin-top: ${this.scale * 60}px;
    width: ${getSize(400)};
    height: ${getSize(480)};
  `

  overlapCss = css`
    position: relative;
  `
  showCodeCss = css`
    margin-bottom: ${this.scale * 60}px;
    cursor: pointer;
    font-size: 18px;
    width: max-content;
    color: ${this.theme.tertiaryTextColor};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `
}

export default Example as Pretty as Typed
