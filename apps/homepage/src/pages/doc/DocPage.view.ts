import { View } from "@dlightjs/dlight"
import { Env, Pretty, Typed, div, env, required } from "@dlightjs/types"
import DlightDoc from "dlight-doc"
import { css } from "@iandx/easy-css"
import FileStructure from "./FileStructure.view"
import { findCertainFile, getPrevNext } from "../../utils/utilFunc"
import { DocsStructureMap } from "../../utils/const"
import { DocsStructureMapType } from "../../utils/types"
import Header from "../home/Header.view"

class DocPage extends View {
  @Env path: string = required
  mdString: string = ""
  selectedName: string = ""
  prevFile: DocsStructureMapType | undefined
  nextFile: DocsStructureMapType | undefined
  scrollView: any

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
        .className(this.rowFlexCss)
      {
        div()
          .className(this.fileStructureWrapCss)
        {
          FileStructure()
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
  `

  docWrapCss = css`
    width: calc(100% - 212px);
  `
  rowFlexCss = css`
    display: flex;
    flex-direction: row;
  `
}

export default DocPage as Pretty as Typed
