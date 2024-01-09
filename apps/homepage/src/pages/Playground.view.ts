import { View } from "@dlightjs/dlight"
import { type Typed, div, Pretty, Env, required } from "@dlightjs/types"
import { Navigator } from "@dlightjs/components"
import { ArrayView, CounterView, HelloView, indexCode, ToggleView, WrapperView } from "../const/playgroundCodeTemplate"
import DLightEditor from "dlight-editor"
import { css } from "@iandx/easy-css"
import { Loading } from "../common"

const defaultModules = [{
  code: indexCode,
  path: "/index.js"
},
{
  code: HelloView,
  path: "/hello.view.js"
}, {
  code: CounterView,
  path: "/counter.view.js"
}, {
  code: ArrayView,
  path: "/array.view.js"
}, {
  code: ToggleView,
  path: "/toggle.view.js"
}, {
  code: WrapperView,
  path: "/wrapper.view.js"
}
]

@View
class Playground {
  @Env navigator: Navigator = required
  @Env themeType: "light" | "dark" = required
  @Env updateThemeType: () => void = required
  @Env isMobile: boolean = required
  @Env isShortView: boolean = required
  isLoading = true
  isDark: boolean = this.themeType === "dark"
  modules: any = (() => {
    localStorage.removeItem("dlight_playground_code")
    const code = localStorage.getItem("dlight_playground_code")
    return code ? JSON.parse(code).modules : defaultModules
  })()

  endLoading = (() => {
    setTimeout(() => {
      this.isLoading = false
    }, 1000)
  })()

  View() {
    div()
      .class(this.playGroundWrapperCss)
    {
      if (this.isLoading) {
        Loading()
      } else {
        DLightEditor()
          .modules(this.modules)
          .height("calc(100vh - 60px)")
          .onSave((newCode: any) => {
            // localStorage.setItem("dlight_playground_code", JSON.stringify(newCode))
          })
          .themeType(this.themeType)
          .isVertical(this.isMobile || this.isShortView)
      }
    }
  }

  iconCss = css`
    cursor: pointer;
    padding-top: 4px;
  `

  ml10 = css`
    margin-left: 10px;
  `

  playGroundTitleCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    font-size: 20px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.isDark ? "#ddd" : "#333333"};
    font-weight: 500;
    cursor: default;
  `

  playGroundWrapperCss = css`
    height: calc(100vh - 60px);
    overflow: hidden;
  `

  playGroundHeaderCss = css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 5px 30px;
    border-bottom: solid 2px rgba(53,77,29,0.2);
    z-index: 100;
    background-color: ${this.isDark ? "#1C1C1E" : "#FFF"};
  `

  dlightEditorCss = css`
    /* height: 500px; */
  `

  logoCss = css`
    height: 30px;
    cursor: pointer;
  `
}

export default Playground as Pretty as Typed
