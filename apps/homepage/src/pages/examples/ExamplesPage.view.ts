import { View } from "@dlightjs/dlight"
import { css } from "@iandx/easy-css"
import { type Typed, div, Pretty, Env, Prop, required, Watch } from "@dlightjs/types"
import DLightEditor from "dlight-editor"
import { ExamplesCodeData } from "../../const/examplesCodeData"
import { ExmaplesCodeDataType } from "../../utils/types"
import { RoutesEnv } from "@dlightjs/components"
import { Loading } from "../../common"
import ExampleMenu from "./ExampleMenu.view"
import MenuBtn from "../doc/MenuBtn.view"
import SideMenu from "../../common/sideMenu/SideMenu.view"

interface NewPlayGroundProps {
  modules: any
  isVertical: boolean
}

@View
class NewPlayGround implements NewPlayGroundProps {
  @Prop modules: any
  @Prop isVertical: boolean = false
  @Env themeType: "light" | "dark" = required
  a = true
  onChange = (() => {
    if (this.modules) {
      this.a = !this.a
    }
  })()

  View() {
    if (this.a) {
      DLightEditor()
        .modules(this.modules)
        .height(this.isVertical ? "calc(100vh - 113px)" : "calc(100vh - 60px)")
        .width("100%")
        .themeType(this.themeType)
        .isVertical(this.isVertical)
    } else {
      DLightEditor()
        .modules(this.modules)
        .height(this.isVertical ? "calc(100vh - 113px)" : "calc(100vh - 60px)")
        .width("100%")
        .themeType(this.themeType)
        .isVertical(this.isVertical)
    }
  }
}

@View
class ExamplesPage implements RoutesEnv {
  @Env navigator: RoutesEnv["navigator"] = required
  @Env path: RoutesEnv["path"] = required
  @Env theme: any = required
  @Env themeType: "light" | "dark" = required
  @Env isShortView: boolean = required
  isLoading = true
  isMenuOpen = false // only true when isShortView is true and menu is in open status
  examples: ExmaplesCodeDataType[] = ExamplesCodeData
  modules: any = this.examples[0].children![0].modules
  selectedTitle: string = this.examples[0].children![0].title
  menuOpenBtnEl: any
  header: string = "Introduction"
  endLoading = (() => {
    setTimeout(() => {
      this.isLoading = false
    }, 500)
  })()

  @Watch
  pathWatcher() {
    const pathSplit = this.path!.split("/")
    const title = pathSplit[pathSplit.length - 2]
    const subTitle = pathSplit[pathSplit.length - 1]
    // ---- First letter to uppercase, replace "-" to " "
    this.selectedTitle = subTitle.split("-").map((item: string) => {
      return item[0]?.toUpperCase() + item.slice(1)
    }).join(" ")
    this.header = title.split("-").map((item: string) => {
      return item[0]?.toUpperCase() + item.slice(1)
    }).join(" ")
    const root = this.examples.find((item) => item.title === this.header)
    this.modules = root?.children?.find((item) => item.title === this.selectedTitle)?.modules
  }

  setMenuOpenBtnEl(el: any) {
    this.menuOpenBtnEl = el
  }

  openMenu(e: any) {
    e.stopPropagation()
    this.isMenuOpen = true
  }

  closeMenu() {
    this.isMenuOpen = false
  }

  View() {
    div()
      .class(this.exampleBgCss)
    {
      MenuBtn()
        .handleClickOpenMenu(this.openMenu)
        .handleClickOpenOutline(undefined)
        .setMenuOpenBtnEl(this.setMenuOpenBtnEl)
        .title(`${this.header} / ${this.selectedTitle}`)
      if (this.isLoading) {
        Loading()
      } else {
        div()
          .class(this.examplesPageWrapCss)
        {
          SideMenu()
            .isOpen(this.isMenuOpen)
            .closeMenu(this.closeMenu)
            .menuElement(".examples-list-wrap-css")
          {
            ExampleMenu()
              .isOpen(this.isMenuOpen)
              .examples(this.examples)
              .selectedTitle(this.selectedTitle)
          }
          div()
            .class(this.dlightEditorWrapCss)
          {
            (NewPlayGround as Pretty as Typed<NewPlayGroundProps>)()
              .modules(this.modules)
              .isVertical(this.isShortView)
          }
        }
      }
    }
  }

  exampleBgCss = css`
    background-color: ${this.theme.bgColor};
    height: calc(100vh - 60px);
  `

  examplesPageWrapCss = css`
    width: 100vw;
    display: flex;
    flex-direction: row;
    align-items: ${this.isMenuOpen ? "" : "center"};
    /* background-color: ${this.theme.orange1}; */
  `

  dlightEditorWrapCss = css`
    display: block;
    width: ${this.isShortView ? "100%" : "calc(100% - 240px)"};
  `
}

export default ExamplesPage as Pretty as Typed
