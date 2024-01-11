import { View } from "@dlightjs/dlight"
import { CloseFilled } from "@dlightjs/material-icons"
import { div, span, type Pretty, type Typed, Prop, required, Env } from "@dlightjs/types"
import clsx from "clsx"
import { Color } from "../../utils/const"
import { css } from "@iandx/easy-css"

interface TabItemProps {
  tabKey: string
  tabName: string
  type: string
  updateModulePath: (currPath: string, newPath: string) => void
  handleDeleteTab: (tabName: string) => void
}

@View
class TabItem {
  /** @prop */
  @Env theme: Color = required
  @Prop tabKey = required
  @Prop tabName = required
  @Prop type = required
  @Prop changeTabName = required
  @Prop handleDeleteTab = required

  /** @reactive */
  tabElement?: HTMLSpanElement
  isTabEdit = false

  /** @func */
  clickTabOutside(event: Event) {
    if (!this.tabElement?.contains(event.target as any)) {
      this.isTabEdit = false
    }
  }

  onKeyDown(e: any) {
    if (e.key === "Enter" && this.isTabEdit) {
      e.preventDefault()
      this.tabElement?.blur()
    }
  }

  /** @lifecycle */
  didMount() {
    document.addEventListener("keydown", this.onKeyDown.bind(this))
    document.addEventListener("click", this.clickTabOutside.bind(this))
  }

  willUnmount() {
    document.removeEventListener("keydown", this.onKeyDown.bind(this))
    document.removeEventListener("click", this.clickTabOutside.bind(this))
  }

  TabToName(tab: string) {
    return tab.replace(/^(.+?).js/, "$1").replace(/^(.+?).css/, "$1")
  }

  View() {
    div()
      .class(this.rowDisplayCss)
    {
      div()
        .class(this.tabNameCss)
      {
        span(this.TabToName(this.tabName))
          .class(clsx(this.tabNameSpanCss, this.tabName === "index.js" ? this.preventSelectCss : undefined))
          .element(this.tabElement)
          .contentEditable(`${this.tabKey === this.tabName && this.isTabEdit && this.tabName !== "index.js"}`)
          .onBlur((e) => {
            this.changeTabName(this.tabName, `${e?.target?.innerText}.${this.type}`)
          })
          .onDblClick((e: any) => {
            this.isTabEdit = true
            e.target.focus()
          })
        span(`.${this.type}`)
          .class(this.preventSelectCss)
      }

      if (this.tabName !== "index.js") {
        CloseFilled()
          .height(16)
          .class(this.deleteIconCss)
          .color(this.theme.primary)
          .onClick(e => {
            e.stopPropagation()
            this.handleDeleteTab(this.tabName)
          })
      }
    }
  }

  rowDisplayCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
  `

  tabNameCss = css`
    line-height: 30px;
    font-size: 18px;
    background-color: ${this.theme.background};
    border-width: 0px;
  `

  tabNameSpanCss = css`
    color: ${this.theme.text};
    padding: 2px;
    cursor: pointer;
    -moz-user-select: none;
    -webkit-user-select: none;
  `

  preventSelectCss = css`
    color: ${this.theme.text};
    -moz-user-select: none;
    -webkit-user-select: none;
  `

  deleteIconCss = css`
    height: 16px;
    cursor: pointer;
    padding-left: 5px;
  `
}

export default TabItem as Pretty as Typed<TabItemProps>
