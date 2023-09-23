import { View } from "@dlightjs/dlight"
import { type Typed, Env, required, Prop, div, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { DocsStructureMapType } from "../../utils/types"
import { KeyboardArrowRightFilled, KeyboardArrowDownFilled } from "@dlightjs/material-icons"
import FileStructure from "./FileStructure.view"
import { unfoldAnimate } from "../../utils/animations"
import { Navigator } from "@dlightjs/components"

interface FileNameProps {
  name: string
  filePath: string
  children: DocsStructureMapType | undefined
}

class FileName extends View implements FileNameProps {
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env selectedName: string = required
  @Env path: string = required
  @Prop name = required
  @Prop filePath = required
  @Prop children = required

  // isOpen = this.path.startsWith(this.filePath)

  isChoose = this.selectedName === this.name
  isOpen = false
  isHover = false
  content: any
  // nextHeight: number | undefined = this.isOpen ? undefined : 0
  nextHeight: number | undefined = 0
  targetHeight = 0

  updateNextHeight(nextHeight: number) {
    this.nextHeight = nextHeight

    // cancel inherited height limit
    if (Math.abs(this.nextHeight - this.targetHeight) < 1 && this.targetHeight !== 0) {
      this.nextHeight = undefined
    }
  }

  handleClickFile() {
    if (this.isChoose || !this.isOpen) {
      // update open status
      this.isOpen = !this.isOpen
      // fold animate
      if (this.children) {
        const currentHeight = parseFloat(getComputedStyle(this.content).height)
        this.targetHeight = this.isOpen ? this.content.scrollHeight : 0
        unfoldAnimate(this.targetHeight, currentHeight, this.updateNextHeight)
      }
    }
    this.navigator.to("/" + this.filePath)
  }

  Body() {
    div()
      .className(this.fileColumnCss)
    {
      div()
        .className(this.fileNameCss)
        .onclick(this.handleClickFile)
        .onmouseover(() => { this.isHover = true })
        .onmouseout(() => { this.isHover = false })
      {
        div(this.name)
        if (this.children) {
          div()
            .className(this.iconCss)
          {
            if (this.isOpen) {
              KeyboardArrowDownFilled()
                .height(20)
                .width(20)
                .color(this.theme.green12)
            } else {
              KeyboardArrowRightFilled()
                .height(20)
                .width(20)
                .color(this.theme.green12)
            }
          }
        }
      }
      if (this.children) {
        div()
          .element(this.content)
          .className(this.indentationCss)
        {
          FileStructure()
            .structureData(this.children)
        }
      }
    }
  }

  iconCss = css`
    padding-top: 4px;
  `

  fileColumnCss = css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `

  fileNameCss = css`
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.theme.green12};
    font-weight: ${this.isChoose ? "600" : "normal"};
    height: 33px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 3px 10px;
    margin: 1px 10px;
    border-radius: 5px;
    background-color: ${this.isHover || this.isChoose ? "#fef2e8" : "white"};
    cursor: pointer;
  `

  indentationCss = css`
    height: ${this.nextHeight === undefined ? "undefined" : this.nextHeight + "px"};
    margin: 3px 0 3px 25px;
    overflow: hidden;
    font-size: 14px;
    border-left: solid 1px ${this.theme.orange4};
  `
}

export default FileName as Pretty as Typed<FileNameProps>
