import { Spacer, HStack } from "@dlightjs/components"
import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, img } from "@dlightjs/types"
import { ArrayView, CounterView, HelloView, indexCode, ToggleView, WrapperView } from "../utils/const"

import DLightEditor from "dlight-editor"

class Playground extends View {
  @Env navigator: any = required
  toggle: boolean = false

  Body() {
    div()
      .className("mx-4 py-2 cursor-pointer")
    {
      HStack()
      {
        img()
          .src("logo_title.png")
          .className("h-8")
          .onclick(() => {
            console.log(this.navigator)
            this.navigator.to("/")
          })
        Spacer()
        button("change Theme")
          .onclick(() => {
            this.toggle = !this.toggle
          })
      }
    }

    DLightEditor()
      .modules([{
        code: indexCode,
        path: "/index.ts"
      }, 
      // {
      //   code: HelloView,
      //   path: "/hello.ts"
      // }, {
      //   code: CounterView,
      //   path: "/counter.ts"
      // }, {
      //   code: ArrayView,
      //   path: "/array.ts"
      // }, {
      //   code: ToggleView,
      //   path: "/toggle.ts"
      // }, {
      //   code: WrapperView,
      //   path: "/wrapper.ts"
      // }
      ])
      // .height("700px")
      // .width("900px")
      .themeType(this.toggle ? "dark" : "light")
  }
}

export default Playground as any as Typed<Playground>
