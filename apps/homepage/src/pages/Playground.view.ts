import { Env, View, required } from "@dlightjs/dlight"
import { type Typed, img, div, Pretty } from "@dlightjs/types"
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
  isLoading = true
  toggle: boolean = false
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
      .className(this.playGroundHeaderCss)
    {
      div()
        .className(this.playGroundTitleCss)
      {
        img()
          .className(this.logoCss)
          .src("/imgs/logo-png.svg")
          .onclick(() => {
            this.navigator.to("..")
          })
        div("Playground")
          .className(this.ml10)
      }
      if (this.toggle) {
        LightModeOutlined()
          .color("#ddd")
          .className(this.iconCss)
          .onclick(() => { this.toggle = !this.toggle })
      } else {
        DarkModeOutlined()
          .className(this.iconCss)
          .onclick(() => { this.toggle = !this.toggle })
      }
    }
  }

  Body() {
    this.PlayGroundHeader()
    if (this.isLoading) {
      Loading()
    } else {
      div()
        .className(this.dlightEditorCss)
      {
        DLightEditor()
          .modules(this.modules)
          .height("93vh")
          .onSave((newCode: any) => {
            localStorage.setItem("dlight_playground_code", JSON.stringify(newCode))
          })
          .themeType(this.toggle ? "dark" : "light")
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
    color: ${this.toggle ? "#ddd" : "#333333"};
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
    background-color: ${this.toggle ? "#1C1C1E" : "#FFF"};
  `

  dlightEditorCss = css`
    height: 500px;
  `

  logoCss = css`
    height: 30px;
    cursor: pointer;
  `
}

export default Playground as Pretty as Typed
