import { View } from "@dlightjs/dlight"
import { Env, Pretty, Typed, Watch, div, env, required, tr } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import { css } from "@iandx/easy-css"
import { findCertainFile, flatFileStructureData } from "../../utils/utilFunc"
import { FileMap } from "../../const/docsData"
import { DocsStructureMapType } from "../../utils/types"
import MenuBtn from "./MenuBtn.view"
import { PageNavType } from "./types"
import SideMenu from "../../common/sideMenu/SideMenu.view"
import Skeleton from "../../common/loading/Skeleton.view"
import ErrorPage from "../ErrorPage.view"
import FileMenu from "./FileMenu.view"

@View
class DocPage {
  @Env path: string = required
  @Env isMobile: boolean = required
  @Env isShortView: boolean = required
  @Env navigator: any = required
  @Env language: any = required
  @Env themeType: string = required
  @Env theme: any = required
  isLoading = true
  isFail = false
  mdString: string = ""
  selectedName: string = ""
  prevFile: DocsStructureMapType | undefined
  nextFile: DocsStructureMapType | undefined
  scrollView: any
  isOpenMenu = false
  isOpenOutline = { value: false }
  menuEl: HTMLElement | undefined = undefined
  menuOpenBtnEl: HTMLElement | undefined = undefined
  fileType = this.path.split("/")[0] as "ecosystem" | "docs"
  flatfileData = flatFileStructureData(FileMap[this.fileType])
  prePageNav: PageNavType | undefined
  nextPageNav: PageNavType | undefined

  setMenuOpenBtnEl(el: any) {
    this.menuOpenBtnEl = el
  }

  closeMenu() {
    this.isOpenMenu = false
  }

  // pathWatcher is a function that will be executed when the path changes
  @Watch
  pathWatcher() {
    this.isLoading = true
    this.isFail = false
    const [fileData, fileIndex] = findCertainFile({ mapData: this.flatfileData, filePath: "/" + this.path })
    const filePath = this.path.startsWith("docs/") ? `/${this.path}${fileData?.children ? "/index.md" : ".md"}` : ""
    this.nextPageNav = fileIndex < this.flatfileData.length - 1
      ? {
          name: this.flatfileData[fileIndex + 1].name,
          zhName: this.flatfileData[fileIndex + 1].zhName,
          path: this.flatfileData[fileIndex + 1].path
        }
      : undefined
    this.prePageNav = fileIndex > 0
      ? {
          name: this.flatfileData[fileIndex - 1].name,
          zhName: this.flatfileData[fileIndex - 1].zhName,
          path: this.flatfileData[fileIndex - 1].path
        }
      : undefined
    if (filePath !== "") {
      fetch(this.language === "en" ? filePath : filePath.split("docs")[0] + "docs/zh" + filePath.split("docs")[1])
        .then(async data => {
          if (data.ok) {
            return await data.text()
          }
          return ""
        })
        .then(text => { this.mdString = text; this.isLoading = false })
        .catch(() => { this.isFail = true })
    }
    this.selectedName = fileData?.name ?? ""
  }

  @Watch
  watchIsShortView() {
    if (!this.isShortView) {
      this.isOpenOutline = { value: false }
    }
  }

  handleClickOpenMenu(e: any) {
    e.stopPropagation()
    this.isOpenMenu = true
  }

  handleClickOpenOutline() {
    this.isOpenOutline = { value: true }
  }

  View() {
    env()
      .selectedName(this.selectedName)
    {
      MenuBtn()
        .handleClickOpenMenu(this.handleClickOpenMenu)
        .handleClickOpenOutline(this.handleClickOpenOutline)
        .setMenuOpenBtnEl(this.setMenuOpenBtnEl)
      div()
        .class(this.rowFlexCss)
      {
        if ((!this.isMobile && !this.isShortView) || (this.isShortView && this.isOpenMenu) || (this.isMobile && this.isOpenMenu)) {
          SideMenu()
            .isOpen(this.isOpenMenu)
            .closeMenu(this.closeMenu)
            .menuElement("#file-structure-wrap")
          {
            div()
              .id("file-structure-wrap")
              .class(this.fileStructureWrapCss)
            {
              FileMenu()
                .structureData(FileMap[this.fileType])
            }
          }
        }
        div()
          .element(this.scrollView)
          .class(this.docWrapCss)
        {
          if (this.isFail) {
            ErrorPage()
              .errorInfo("🥲 Sorry, can't find the content.")
              .btnText("back to getting started")
              .btnEvent(() => { this.navigator.to("/docs/getting-started") })
          } else {
            if (this.isLoading) {
              div()
                .style({ marginTop: "40px" })
              {
                Skeleton()
                  .width(window.innerWidth > 1135 ? "calc(100% - 320px)" : "calc(100% - 40px)")
              }
            } else {
              DlightDoc(this.mdString)
                .title(this.selectedName)
                .isShowCatalogue(this.isOpenOutline.value)
                .nextPageNav(this.nextPageNav)
                .prePageNav(this.prePageNav)
                .textColor(this.theme.textColor)
                .highlightColor(this.theme.highlightColor)
                .codeBgColor(this.theme.codeBgColor)
                .codeBlockHeaderColor(this.theme.codeBlockHeaderColor)
                .codeTextColor(this.theme.codeTextColor)
                .themeType(this.themeType)
            }
          }
        }
      }
    }
  }

  fileStructureWrapCss = css`
    padding: 1rem;
    width: 212px;
    height: calc(100vh - 92px);
    background-color: ${this.theme.bgColor};
    box-shadow: ${this.isOpenMenu ? `0 2px 8px 0 ${this.theme.shadowColor}` : ""};
    margin-top: ${this.isMobile || this.isShortView ? "-52px" : ""};
    overflow: scroll;
  `

  docWrapCss = css`
    background-color: ${this.theme.bgColor};
    width: ${this.isMobile || this.isShortView ? "100%" : "calc(100% - 212px)"};
    overflow-x: hidden;
    padding-left: 5%;
    z-index: 10;
    height: ${this.isMobile || this.isShortView ? "calc(100vh - 112px)" : "calc(100vh - 65px)"};
  `

  rowFlexCss = css`
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
    background-color: ${this.theme.bgColor};
  `
}

export default DocPage as Pretty as Typed
