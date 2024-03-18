import { View, div, Pretty, type Typed } from "@dlightjs/dlight"
import { ArrayView, colors, CounterView, HelloView, indexCode, ToggleView, WrapperView } from "./utils/const"
import Playground from "./views/Playground.view"

@View
class App {
  toggle = true
  theme = colors[this.toggle ? "dark" : "light"]

  toggleTheme() {
    this.toggle = !this.toggle
    this.theme = colors[this.toggle ? "dark" : "light"]
  }

  Body() {
    div()
    {
      Playground()
        .modules([{
          code: indexCode,
          path: "/index.js"
        }, {
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
        ])
      // .height("700px")
      // .width("900px")
        .themeType(this.toggle ? "dark" : "light")
    }
  }
}

export default App as Pretty as Typed
