import DLight, { View } from "@dlightjs/dlight"
import { button, div, type Typed } from "@dlightjs/types"
import { ArrayView, colors, CounterView, HelloView, indexCode, ToggleView, WrapperView } from "./utils/const"
import Playground from "./views/Playground.view"

class App extends View {
  toggle = true
  theme = colors[this.toggle ? "dark" : "light"]

  Body() {
    div()
    {
      // div()
      // {
      //   button("这是换主题sb")
      //     .onclick(() => {
      //       this.toggle = !this.toggle
      //     })
      // }

      Playground()
        .modules([{
          code: indexCode,
          path: "/index.ts"
        }, {
          code: HelloView,
          path: "/hello.ts"
        }, {
          code: CounterView,
          path: "/counter.ts"
        }, {
          code: ArrayView,
          path: "/array.ts"
        }, {
          code: ToggleView,
          path: "/toggle.ts"
        }, {
          code: WrapperView,
          path: "/wrapper.ts"
        }
        ])
        // .height("700px")
        // .width("900px")
        .themeType(this.toggle ? "dark" : "light")
    }
  }
}

export default App as any as Typed<App>
