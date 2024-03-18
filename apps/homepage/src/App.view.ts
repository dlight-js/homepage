import { View, type Typed, Pretty, env, div } from "@dlightjs/dlight"
import { Route, RouteGroup, Navigator } from "@dlightjs/components"
import { Color, colors } from "./const/themes"
import Header from "./pages/home/components-dep/header"
import { css } from "@emotion/css"
import Loading from "./common/loading/Loading.view"

export interface EnvType {
  updateThemeType?: () => void
  themeType?: string
  theme?: Color
  isMobile?: boolean
  isShortView?: boolean
  windowWidth?: number
  i18n?: (enContent: string, zhContent: string) => string
  language?: string
  toggleLanguage?: () => void
  path?: string
  navigator?: any
}

@View
class App {
  themeType = localStorage.getItem("DlightThemeType") ?? "light"
  theme = colors[this.themeType]
  isMobile = /Android|iPhone/i.test(navigator.userAgent)
  isShortView = window.innerWidth < 818
  isCenterTitle = false
  windowWidth = window.innerWidth

  language: "en" | "zh" | string = localStorage.getItem("DlightLanguage") ?? "en"
  toggleLanguage() {
    this.language = this.language === "en" ? "zh" : "en"
    localStorage.setItem("DlightLanguage", this.language)
  }

  i18n = (enContent: string, zhContent: string) => (
    this.language === "en" ? enContent : zhContent
  )

  didMount() {
    window.addEventListener("resize", this.handleWindowResize)
  }

  willUnmount() {
    window.removeEventListener("resize", this.handleWindowResize)
  }

  updateThemeType() {
    this.themeType = this.themeType === "light" ? "dark" : "light"
    localStorage.setItem("DlightThemeType", this.themeType)
  }

  handleWindowResize() {
    this.windowWidth = window.innerWidth
    if (window.innerWidth < 818) {
      this.isShortView = true
    } else {
      this.isShortView = false
    }
  }

  path = ""

  Body() {
    env<EnvType>()
      .updateThemeType(this.updateThemeType)
      .themeType(this.themeType)
      .theme(this.theme)
      .isMobile(this.isMobile)
      .isShortView(this.isShortView)
      .windowWidth(this.windowWidth)
      .i18n(this.i18n)
      .language(this.language)
      .toggleLanguage(this.toggleLanguage)
      .path(this.path)
      .navigator(new Navigator())
    {
      div()
        .class(this.commonCss)
      {
        Header()
        RouteGroup()
          .onPathUpdate(path => {
            this.path = path
          })
          .loading(Loading)
        {
          Route("docs").comp(async() => await import("./pages/doc/DocPage.view"))
          Route("playground").comp(async() => await import("./pages/Playground.view"))
          Route("examples").comp(async() => await import("./pages/examples/ExamplesPage.view"))
          Route("ecosystem").comp(async() => await import("./pages/doc/DocPage.view"))
          Route("").comp(async() => await import("./pages/home/Home.view"))
          Route(".+?").comp(async() => await import("./pages/ErrorPage.view"))
        }
      }
    }
  }

  commonCss = css`
    background-color: ${this.theme.bgColor};
    color: ${this.theme.textColor};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `
}

export default App as Pretty as Typed
