import { View } from "@dlightjs/dlight"
import { type Typed, env } from "@dlightjs/types"
import { Route, RouterSpace } from "@dlightjs/components"
import Home from "./pages/Home/Home.view"
import ErrorPage from "./pages/ErrorPage.view"
import Playground from "./pages/Playground.view"
import DocPage from "./pages/DocPage.view"
import { colors } from "./utils/const"

class App extends View {
  themeType = "light"
  theme = colors[this.themeType]

  Body() {
    env()
      .theme(this.theme)
    {
      RouterSpace()
      {
        Route("guides")
        {
          DocPage()
            .fileName("./guides.md")
        }
        Route("tutorial")
        {
          DocPage()
        }
        Route("examples")
        {
          DocPage()
            .fileName("./examples.md")
        }
        Route("playground")
        {
          Playground()
        }
        Route("ecosystem")
        {
          DocPage()
            .fileName("./ecosystem.md")
        }
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
