import { View } from "@dlightjs/dlight"
import { type Typed, env, Pretty } from "@dlightjs/types"
import { Route, RouterSpace } from "@dlightjs/components"
import { colors } from "./utils/const"
import Home from "./pages/home/Home.view"

class App extends View {
  themeType = "light"
  theme = colors[this.themeType]
  isMobile = /Android|iPhone/i.test(navigator.userAgent)

  updateThemeType() {
    this.themeType = this.themeType === "light" ? "dark" : "light"
  }

  Body() {
    env()
      .updateThemeType(this.updateThemeType)
      .themeType(this.themeType)
      .theme(this.theme)
      .isMobile(this.isMobile)
    {
      RouterSpace()
      {
        Route("docs")
          .lazyLoad(async() => await import("./pages/doc/DocPage.view"))
        Route("playground")
          .lazyLoad(async() => await import("./pages/Playground.view"))
        Route("examples")
          .lazyLoad(async() => await import("./pages/examples/ExamplesPage.view"))
        Route("ecosystem")
          .lazyLoad(async() => await import("./pages/doc/DocPage.view"))
        Route(".")
        {
          Home()
        }
        Route()
          .lazyLoad(async() => await import("./pages/ErrorPage.view"))
      }
    }
  }
}

export default App as Pretty as Typed
