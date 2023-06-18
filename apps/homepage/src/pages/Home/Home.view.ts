import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required } from "@dlightjs/types"
import { Route, RouterSpace, VStack } from "@dlightjs/components"
import Header from "./Header.view"
// import { Nuti } from "@dlightjs/material-icons"

class Home extends View {
  @Env navigator: any = required

  Body() {
    VStack()
    {
      div("默认？")
      Header()
      button("hello")
        .onclick(() => {
          console.log(this.navigator)
          this.navigator.to("./hello")
        })
      button("documents")
        .onclick(() => {
          console.log(this.navigator)
          this.navigator.to("./documents")
        })
      button("playground")
        .onclick(() => {
          console.log(this.navigator)
          this.navigator.to("./playground")
        })
    }
  }
}

export default Home as any as Typed<Home>
