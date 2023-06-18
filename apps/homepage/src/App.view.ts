import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button } from "@dlightjs/types"
import { Route, RouterSpace } from "@dlightjs/components"
import Home from "./pages/Home/Home.view"
import ErrorPage from "./pages/ErrorPage.view"
import Playground from "./pages/Playground.view"
import MyView from "./pages/MarkitPage.view"

class App extends View {
  Body() {
    RouterSpace()
    {
      Route("playground")
      {
        Playground()
      }
      Route("documents")
      {
        div("Documents")
          .className("mt-28 text-red-200")
      }
      Route(".")
      {
        // Home()
        MyView()
      }
      Route()
      {
        ErrorPage()
      }
    }
  }
}

export default App as any as Typed<App>
