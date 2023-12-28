import { View } from "@dlightjs/dlight"
import { type Typed, img, div, Pretty, Env, required } from "@dlightjs/types"
import { Navigator } from "@dlightjs/components"
import { ArrayView, CounterView, HelloView, indexCode, ToggleView, WrapperView } from "../const/playgroundCodeTemplate"
import DLightEditor from "dlight-editor"
import { DarkModeOutlined, LightModeOutlined } from "@dlightjs/material-icons"
import { css } from "@iandx/easy-css"
import { Loading } from "../common"

const defaultModules = [{
  code: indexCode,
  path: "/index.ts"
},
{
  code: HelloView,
  path: "/hello.view.ts"
}, {
  code: CounterView,
  path: "/counter.view.ts"
}, {
  code: ArrayView,
  path: "/array.view.ts"
}, {
  code: ToggleView,
  path: "/toggle.view.ts"
}, {
  code: WrapperView,
  path: "/wrapper.view.ts"
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
    const code = localStorage.getItem("dlight_playground_code")
    return code ? JSON.parse(code).modules : defaultModules
  })()

  endLoading = (() => {
    setTimeout(() => {
      this.isLoading = false
    }, 1500)
  })()

  @View
  PlayGroundHeader() {
    div()
      .class(this.playGroundHeaderCss)
    {
      div()
        .class(this.playGroundTitleCss)
      {
        img()
          .class(this.logoCss)
          .src("/imgs/logo-png.svg")
          .onClick(() => {
            this.navigator.to("..")
          })
        div("Playground")
          .class(this.ml10)
      }
      if (this.isDark) {
        div()
          .onClick(this.updateThemeType)
        {
          LightModeOutlined()
            .color("#ddd")
            .class(this.iconCss)
        }
      } else {
        div()
          .onClick(this.updateThemeType)
        {
          DarkModeOutlined()
            .class(this.iconCss)
        }
      }
    }
  }

  View() {
    div()
      .style({
        height: "max-content",
        overflow: "hidden"
      })
    {
      this.PlayGroundHeader()
      if (this.isLoading) {
        Loading()
      } else {
        DLightEditor()
          .modules(this.modules)
          .height("calc(100vh - 42px)")
          .onSave((newCode: any) => {
            localStorage.setItem("dlight_playground_code", JSON.stringify(newCode))
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
