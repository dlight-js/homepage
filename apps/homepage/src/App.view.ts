import { View } from "@dlightjs/dlight"
import { type Typed, env, div } from "@dlightjs/types"
import { Route, RouterSpace, lazy } from "@dlightjs/components"
import Home from "./pages/home/Home.view"
import ErrorPage from "./pages/ErrorPage.view"
import Playground from "./pages/Playground.view"
// import DocPage from "./pages/doc/DocPage.view"

import { colors } from "./utils/const"
import ExamplesPage from "./pages/examples/ExamplesPage.view"

class App extends View {
  themeType = "light"
  theme = colors[this.themeType]
  // DocPage = lazy(async() => await import("./pages/doc/DocPage.view"))
  mobileDetail = window.navigator.userAgent.match(/(iPhone|iPod|Android|ios)/i)
  windowWidth = window.innerWidth

  updateThemeType() {
    this.themeType = this.themeType === "light" ? "dark" : "light"
  }

  Body() {
    env()
      .updateThemeType(this.updateThemeType)
      .themeType(this.themeType)
      .theme(this.theme)
      .mobileDetail(this.mobileDetail)
      .windowWidth(this.windowWidth)
    {
      RouterSpace()
      {
        // Route("guides")
        // {
        //   DocPage()
        // }
        // Route("tutorial")
        // {
        //   DocPage()
        // }
        // Route("docs")
        // {
        //   DocPage()
        // }
        Route("playground")
        {
          Playground()
        }
        Route("examples")
        {
          ExamplesPage()
        }
        // Route("ecosystem")
        // {
        //   DocPage()
        // }
        Route(".")
        {
          Home()
        }
        Route()
        {
          ErrorPage()
        }
      }
    }
  }
}

export default App as any as Typed<App>
