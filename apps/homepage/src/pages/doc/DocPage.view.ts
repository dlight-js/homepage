import { View } from "@dlightjs/dlight"
import { Env, Pretty, Typed, div, env, required } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import { css } from "@iandx/easy-css"
import FileStructure from "./FileStructure.view"
import { findCertainFile, getPrevNext } from "../../utils/utilFunc"
import { DocsStructureMap } from "../../utils/const"
import { DocsStructureMapType } from "../../utils/types"
import Header from "../home/header/Header.view"
import { MenuRound } from "@dlightjs/material-icons"

class DocPage extends View {
  @Env path: string = required
  @Env isMobile: boolean = required
  mdString: string = ""
  selectedName: string = ""
  prevFile: DocsStructureMapType | undefined
  nextFile: DocsStructureMapType | undefined
  scrollView: any
  isOpenMenu = false

  // pathWatcher is a function that will be executed when the path changes
  pathWatcher = (() => {
    const fileData = findCertainFile({ mapData: getPrevNext(DocsStructureMap), filePath: this.path })
    const filePath = `/${this.path}${fileData?.children ? "/index.md" : ".md"}`
    fetch(filePath)
      .then(async data => await data.text())
      .then(text => { this.mdString = text })
      .catch(err => console.log(err))
    this.selectedName = fileData?.name ?? ""
    this.prevFile = fileData?.prev
    this.nextFile = fileData?.next
  })()

  Body() {
    Header()
    env()
      .selectedName(this.selectedName)
      .prePage(this.prevFile)
      .nextPage(this.nextFile)
    {
      div()
        .className(this.reverseFlexCss)
        .onclick(() => { this.isOpenMenu = !this.isOpenMenu })
      {
        MenuRound()
        div("Menu")
      }
      div()
        .className(this.rowFlexCss)
      {
        if (!this.isMobile || (this.isMobile && this.isOpenMenu)) {
          div()
            .className(this.fileStructureWrapCss)
          {
            FileStructure()
          }
        }
        div()
          .element(this.scrollView)
          .className(this.docWrapCss)
        {
          DlightDoc(this.mdString)
        }
      }
    }
  }

  fileStructureWrapCss = css`
    padding: 1rem;
    width: 212px;
    height: 100%;
    background-color: white;
    z-index: ${this.isOpenMenu ? 100 : ""};
    position: ${this.isOpenMenu ? "absolute" : ""};
  `

  docWrapCss = css`
    width: ${this.isMobile ? "100%" : "calc(100% - 212px)"};
    overflow-x: hidden;
  `

  rowFlexCss = css`
    display: flex;
    flex-direction: row;
    overflow-x: hidden;
  `

  reverseFlexCss = css`
    display: flex;
    flex-direction: row-reverse;
  `
}

export default DocPage as Pretty as Typed
