import { View, Env, required, env } from "@dlightjs/dlight"
import { Pretty, Typed, div } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import { css } from "@iandx/easy-css"
import FileStructure from "./FileStructure.view"
import { findCertainFile, getPrevNext } from "../../utils/utilFunc"
import { FileMap } from "../../const/docsData"
import { DocsStructureMapType } from "../../utils/types"
import Header from "../home/header/Header.view"
import MenuBtn from "./MenuBtn.view"

@View
class DocPage {
  @Env path: string = required
  @Env isMobile: boolean = required
  @Env isShortView: boolean = required
  mdString: string = ""
  selectedName: string = ""
  prevFile: DocsStructureMapType | undefined
  nextFile: DocsStructureMapType | undefined
  scrollView: any
  isOpenMenu = false
  isOpenOutline = { value: false }
  menuEl: any
  fileType = this.path.split("/")[0] as "ecosystem" | "docs"

  closeMenu(e: any) {
    if (e.target !== this.menuEl && this.isOpenMenu) {
      this.isOpenMenu = false
    }
  }

  willMount() {
    document.addEventListener("click", this.closeMenu.bind(this))
  }

  willunMount() {
    document.removeEventListener("click", this.closeMenu.bind(this))
  }

  // pathWatcher is a function that will be executed when the path changes
  pathWatcher = (() => {
    const fileData = findCertainFile({ mapData: getPrevNext(FileMap[this.fileType]), filePath: this.path })
    const filePath = `/${this.path}${fileData?.children ? "/index.md" : ".md"}`
    fetch(filePath)
      .then(async data => {
        if (!data.ok) {
          throw new Error("not found")
        } else {
          return await data.text()
        }
      })
      .then(text => { this.mdString = text })
      .catch(err => { console.log(err) })
    this.selectedName = fileData?.name ?? ""
    this.prevFile = fileData?.prev
    this.nextFile = fileData?.next
  })()

  hanleClickOpenMenu(e: any) {
    e.stopPropagation()
    console.log(this.isOpenMenu)
    this.isOpenMenu = true
  }

  hanleClickOpenOutline(e: any) {
    e.stopPropagation()
    this.isOpenOutline = { value: true }
  }

  Body() {
    Header()
    env()
      .selectedName(this.selectedName)
      .prePage(this.prevFile)
      .nextPage(this.nextFile)
    {
      MenuBtn()
        .hanleClickOpenMenu(this.hanleClickOpenMenu)
        .hanleClickOpenOutline(this.hanleClickOpenOutline)
      div()
        .className(this.rowFlexCss)
      {
        if ((!this.isMobile && !this.isShortView) || (this.isShortView && this.isOpenMenu) || (this.isMobile && this.isOpenMenu)) {
          div()
            .className(this.fileStructureWrapCss)
            .element(this.menuEl)
          {
            FileStructure()
              .structureData(FileMap[this.fileType])
          }
        }
        div()
          .element(this.scrollView)
          .className(this.docWrapCss)
        {
          DlightDoc(this.mdString)
            .title(this.selectedName)
            .isShowCatalogue(this.isOpenOutline.value)
        }
      }
      // TransitionGroup()
      //   .delay(0)
      //   .duration(0.3)
      // {
      //   div()
      //     .className(this.maskCss)
      // }
    }
  }

  maskCss = css`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(128, 128, 128, 0.7);
    z-index: ${this.isOpenMenu ? 49 : 0};
    opacity: ${this.isOpenMenu ? 100 : 0};
  `

  fileStructureWrapCss = css`
    padding: 1rem;
    width: 212px;
    height: ${this.isMobile || this.isShortView ? "calc(100% - 52px)" : "100%"};
    background-color: white;
    z-index: ${this.isOpenMenu ? 50 : ""};
    position: ${this.isOpenMenu ? "absolute" : "default"};
    box-shadow: ${this.isOpenMenu ? "0 2px 8px 0 #A9A9A9" : ""};
    margin-top: ${this.isMobile || this.isShortView ? "-52px" : ""};
    overflow: scroll;
  `

  docWrapCss = css`
    width: ${this.isMobile || this.isShortView ? "100%" : "calc(100% - 212px)"};
    overflow-x: hidden;
    padding-left: 5%;
    z-index: 10;
    height: calc(82vh - 52px);
  `

  rowFlexCss = css`
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
  `
}

export default DocPage as Pretty as Typed
