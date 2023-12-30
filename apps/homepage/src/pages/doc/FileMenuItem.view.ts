import { View } from "@dlightjs/dlight"
import { type Typed, Pretty, div, Env, Prop, Watch, required } from "@dlightjs/types"
import { DocsStructureMapType } from "../../utils/types"
import { css } from "@iandx/easy-css"
import { Navigator } from "@dlightjs/components"
import { KeyboardArrowRightFilled } from "@dlightjs/material-icons"
import clsx from "clsx"

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

  View() {
    div()
    {
      div()
        .class(this.fileNameCss)
        .onClick(this.handleClickFile)
        .onMouseOver(() => { this.isHover = true })
        .onMouseOut(() => { this.isHover = false })
      {
        div()
          .class(this.menuItemCss)
        {
          div()
            .class(this.activeLightCss)
          div(this.i18n(this.name, this.zhName))
            .class(this.textCss)
        }
        if (this.children) {
          div()
            .class(clsx(this.iconCss, this.iconAnimationCss, (this.isOpen || this.isPathActive) ? this.arrowDownCss : ""))
          {
            KeyboardArrowRightFilled()
              .class(this.iconCss)
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
              .class(this.subMenuCss)
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

  menuItemCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  `

  activeLightCss = css`
    height: 18px;
    width: 2px;
    margin-right: 10px;
    background-color: ${this.isChoose ? this.theme.docActiveColor : this.isHover ? this.theme.docHoverColor : "transparent"};
  `

  textCss = css`
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    font-size: 0.875rem;
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
    padding: 0px 10px;
    margin: 5px 0px;
    /* border-left: ${this.isChoose ? `2px solid ${this.theme.docActiveColor}` : this.isHover ? `2px solid ${this.theme.docHoverColor}` : "0px solid #ddd"};; */
    /* background-color: ${this.isHover || this.isChoose ? this.theme.homeBtnColor : this.theme.primaryBgColor}; */
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
