import { View } from "@dlightjs/dlight"
import { type Typed, button, div, Pretty, ContentProp, Content, Env, Prop, required } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import MenuItem from "./MenuItem.view"
import { Navigator } from "@dlightjs/components"
import { DocsStructureMapType, ExmaplesCodeDataType } from "../../../../utils/types"

interface NavButtonProps {
  content: ContentProp<string>
  handleClickNav: () => void
  structureData: ExmaplesCodeDataType[] | DocsStructureMapType[] | undefined
}

@View
class NavButton implements NavButtonProps {
  @Env i18n: any = required
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Content content: any = required
  @Prop handleClickNav = required
  @Prop structureData = required

  isHover = false
  isMenuHover = false
  isShowHoverMenu = !!this.structureData

  View() {
    div()
      .class(this.wrapCss)
    {
      button(this.content)
        .class(this.navBtnCss)
        .onClick(this.handleClickNav)
        .onMouseEnter(() => { this.isHover = true })
        .onMouseLeave(() => { setTimeout(() => { this.isHover = false }, 100) })
      // if (this.isShowHoverMenu) {
      //   div()
      //     .class(this.iconCss)
      //   {
      //     KeyboardArrowDownRound()
      //   }
      // }
      if (this.isShowHoverMenu && (this.isMenuHover || this.isHover)) {
        div()
          .class(this.hoverMenuWrapCss)
          .onMouseEnter(() => { this.isMenuHover = true; this.isHover = true })
          .onMouseLeave(() => { this.isMenuHover = false; this.isHover = false })
        {
          for (const { name, zhName, title, path } of this.structureData) {
            MenuItem()
              .name(this.i18n(name || title, zhName))
              .path(path)
          }
        }
      }
    }
  }

  iconCss = css`
    padding-top: 4px;
    margin-right: 6px;
  `

  wrapCss = css`
    position: relative;
    display: flex;
    align-items: center;
  `

  navBtnCss = css`
    cursor: pointer;
    background-color: ${this.isHover ? this.theme.homeBtnColor : this.theme.primaryBgColor};
    color: ${this.isHover ? this.theme.primaryTextColor : this.theme.primaryTextColor};
    font-size: 0.875rem;
    font-weight: 600;
    padding: 8px 12px;
    margin-right: 4px;
    /* padding-right: 6px; */
    border-width: 0;
    border-radius: 5px;
    margin-bottom: 5px;
  `

  hoverMenuWrapCss = css`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 102%;
    left: 0;
    background-color: ${this.theme.homeBtnColor};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 8px;
  `
}

export default NavButton as Pretty as Typed<NavButtonProps>
