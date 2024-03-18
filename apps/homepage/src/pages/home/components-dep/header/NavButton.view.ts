import { View, type Typed, button, div, Pretty, ContentProp, Content, Env, Prop, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import MenuItem from "./MenuItem.view"
import { Navigator } from "@dlightjs/components"
import { DocsStructureMapType, ExmaplesCodeDataType } from "../../../../utils/types"

interface NavButtonProps {
  content: ContentProp<string>
  btnPath: string
  handleClickNav: () => void
  structureData: ExmaplesCodeDataType[] | DocsStructureMapType[] | undefined
}

@View
class NavButton implements NavButtonProps {
  @Env i18n: any = required
  @Env navigator: Navigator = required
  @Env theme: any = required
  @Env path = required
  @Content content: any = required
  @Prop handleClickNav = required
  @Prop structureData = required
  @Prop btnPath = required

  isHover = false
  isMenuHover = false
  isShowHoverMenu = !!this.structureData
  isSelect = this.path.startsWith(this.btnPath.split("/")[1])

  Body() {
    div()
      .class(this.wrapCss)
    {
      button(this.content)
        .class(this.navBtnCss)
        .onClick(this.handleClickNav)
        .onMouseEnter(() => { this.isHover = true })
        .onMouseLeave(() => { setTimeout(() => { this.isHover = false }, 100) })
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
    background-color: ${this.isSelect ? this.theme.activeColor : this.isHover ? this.theme.hoverColor : this.theme.bgColor};
    color: ${this.isHover || this.isSelect ? this.theme.textColor : this.theme.textColor};
    font-size: 0.875rem;
    font-weight: 600;
    padding: 8px 12px;
    margin-right: 4px;
    border-width: 0px;
    border-radius: 5px;
    margin-bottom: 5px;
  `

  hoverMenuWrapCss = css`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 102%;
    left: 0;
    background-color: ${this.theme.activeColor};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 8px;
  `
}

export default NavButton as Pretty as Typed<NavButtonProps>
