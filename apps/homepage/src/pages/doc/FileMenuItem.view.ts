import { Env, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div } from "@dlightjs/types"
import { DocsStructureMapType } from "../../utils/types"
import { css } from "@iandx/easy-css"
import { Navigator } from "@dlightjs/components"
import { KeyboardArrowRightFilled } from "@dlightjs/material-icons"

interface FileMenuItemProps {
  name: string
  zhName: string
  filePath: string
  children: DocsStructureMapType | undefined
}

@View
class FileMenuItem implements FileMenuItemProps {
  @Env theme: any = required
  @Env i18n: any = required
  @Env navigator: Navigator = required
  @Env path: string = required
  @Env selectedName: string = required
  @Prop name = required
  @Prop zhName = required
  @Prop filePath = required
  @Prop children = required
  isChoose = this.selectedName === this.name
  hasChildren = !!this.children
  isPathActive = (this.filePath !== `/${this.path}`) && `/${this.path}`.startsWith(this.filePath)
  isOpen = false
  isHover = false

  @Watch
  watchPath() {
    if (this.isPathActive) {
      this.isOpen = true
    }
  }

  handleClickFile() {
    if (this.isChoose) {
      this.isOpen = !this.isOpen
    } else if (!this.isOpen) {
      this.isOpen = true
    }
    this.navigator.to(this.filePath)
  }

  Body() {
    div()
    {
      div()
        .className(this.fileNameCss)
        .onclick(this.handleClickFile)
        .onmouseover(() => { this.isHover = true })
        .onmouseout(() => { this.isHover = false })
      {
        div(this.i18n(this.name, this.zhName))
          .className(this.textCss)
        if (this.children) {
          div()
            .className(this.iconCss)
            .className(this.iconAnimationCss)
            .className(this.isOpen || this.isPathActive ? this.arrowDownCss : "")
          {
            KeyboardArrowRightFilled()
              .className(this.iconCss)
              .height(20)
              .width(20)
              .color(this.theme.green12)
          }
        }
      }
      div()
      {
        if (this.children) {
          for (const subItem of this.children) {
            div()
              .className(this.subMenuCss)
            {
              (FileMenuItem as Pretty as Typed<FileMenuItemProps>)()
                .name(subItem.name)
                .zhName(subItem.zhName)
                .filePath(subItem.path)
                .children(subItem.children)
            }
          }
        }
      }
    }
  }

  subMenuCss = css`
    margin-left: 20px;
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.25s ease-in-out, opacity 0.4s ease;
    max-height: ${this.isOpen || this.isPathActive ? "500px" : "0px"};
    opacity: ${this.isOpen || this.isPathActive ? "1" : "0"};
  `

  textCss = css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  `

  iconCss = css`
    padding-top: 4px;
  `

  iconAnimationCss = css`
    transition: transform 0.3s ease;
  `

  arrowDownCss = css`
    transform: rotate(90deg);
  `

  fileColumnCss = css`
    width: 100%;
    display: flex;
    flex-direction: column;
  `

  fileNameCss = css`
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.theme.docTextColor};
    font-weight: ${this.isChoose ? "600" : "normal"};
    height: 33px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 3px 10px;
    margin: 1px 10px;
    border-radius: 5px;
    background-color: ${this.isHover || this.isChoose ? this.theme.homeBtnColor : this.theme.primaryBgColor};
    cursor: pointer;
  `

  indentationCss = css`
    margin: 3px 0 3px 25px;
    overflow: hidden;
    font-size: 14px;
    border-left: solid 1px ${this.theme.orange4};
  `
}

export default FileMenuItem as Pretty as Typed<FileMenuItemProps>
