import { View, Env, required, env, Watch } from "@dlightjs/dlight"
import { Pretty, Typed, div } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import { css } from "@iandx/easy-css"
import FileStructure from "./FileStructure.view"
import { findCertainFile, flatFileStructureData } from "../../utils/utilFunc"
import { FileMap } from "../../const/docsData"
import { DocsStructureMapType } from "../../utils/types"
import Header from "../home/components/header/Header.view"
import MenuBtn from "./MenuBtn.view"
import { PageNavType } from "./types"
import SideMenu from "../../common/sideMenu/SideMenu.view"
import Skeleton from "../../common/loading/Skeleton.view"
import ErrorPage from "../ErrorPage.view"

@View
class DocPage {
  @Env path: string = required
  @Env isMobile: boolean = required
  @Env isShortView: boolean = required
  @Env navigator: any = required
  @Env language: any = required
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

  closeMenu(e: any) {
    if (e.target !== this.menuEl && e.target !== this.menuOpenBtnEl && this.isOpenMenu) {
      this.isOpenMenu = false
    }
  }

  // willMount() {
  //   document.addEventListener("click", this.closeMenu.bind(this))
  // }

  // willunMount() {
  //   document.removeEventListener("click", this.closeMenu.bind(this))
  // }

  // pathWatcher is a function that will be executed when the path changes
  @Watch
    pathWatcher = (() => {
      this.isLoading = true
      this.isFail = false
      const [fileData, fileIndex] = findCertainFile({ mapData: this.flatfileData, filePath: "/" + this.path })
      const filePath = `/${this.path}${fileData?.children ? "/index.md" : ".md"}`
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
      fetch(this.language === "en" ? filePath : filePath.split("docs")[0] + "docs/zh" + filePath.split("docs")[1])
        .then(async data => {
          if (!data.ok) {
            throw new Error("not found")
          } else {
            return await data.text()
          }
        })
        .then(text => { this.mdString = text })
        .catch(err => { console.log(err); this.isFail = true })
      this.selectedName = fileData?.name ?? ""
      this.isLoading = false
    })()

  hanleClickOpenMenu(e: any) {
    e.stopPropagation()
    this.isOpenMenu = true
  }

  updateOpenMenuStatus() {
    this.isOpenMenu = !this.isOpenMenu
  }

  hanleClickOpenOutline() {
    this.isOpenOutline = { value: true }
  }

  Body() {
    Header()
    env()
      .selectedName(this.selectedName)
      // .prePage(this.prevFile)
      // .nextPage(this.nextFile)
    {
      // if (this.isLoading) {
      //   Skeleton()
      // } else {
      MenuBtn()
        .hanleClickOpenMenu(this.hanleClickOpenMenu)
        .hanleClickOpenOutline(this.hanleClickOpenOutline)
        .setMenuOpenBtnEl(this.setMenuOpenBtnEl)
      div()
        .className(this.rowFlexCss)
      {
        if ((!this.isMobile && !this.isShortView) || (this.isShortView && this.isOpenMenu) || (this.isMobile && this.isOpenMenu)) {
          SideMenu()
            .menuOpenBtnEl(this.menuOpenBtnEl)
            .isOpen(this.isOpenMenu)
            .updateOpenMenuStatus(this.updateOpenMenuStatus)
          {
            div()
              .className(this.fileStructureWrapCss)
              .element(this.menuEl)
            {
              FileStructure()
                .structureData(FileMap[this.fileType])
            }
          }
        }
        div()
          .element(this.scrollView)
          .className(this.docWrapCss)
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
            }
          }
        }
      }
      // }
    }
  }

  fileStructureWrapCss = css`
    padding: 1rem;
    width: 212px;
    height: calc(100vh - 92px);
    background-color: white;
    box-shadow: ${this.isOpenMenu ? "0 2px 8px 0 #A9A9A9" : ""};
    margin-top: ${this.isMobile || this.isShortView ? "-52px" : ""};
    overflow: scroll;
  `

  docWrapCss = css`
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
  `
}

export default DocPage as Pretty as Typed
