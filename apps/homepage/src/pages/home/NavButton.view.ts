import { View } from "@dlightjs/dlight"
import { type Typed, button, Env, required, Prop, RequiredProp, div } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"
import MenuItem from "./MenuItem.view"

class NavButton extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop _$content: RequiredProp<string> = required
  @Prop handleClickNav: RequiredProp<() => void> = required
  @Prop structureData: RequiredProp<any> = required

  isHover = false
  isMenuHover = false
  isShowHoverMenu = !!this.structureData

  Body() {
    div()
      .className(this.wrapCss)
    {
      button(this._$content)
        .className(this.navBtnCss)
        .onclick(this.handleClickNav)
        .onmouseenter(() => { this.isHover = true })
        .onmouseleave(() => { setTimeout(() => { this.isHover = false }, 0) })
      // if (this.isShowHoverMenu) {
      //   div()
      //     .className(this.iconCss)
      //   {
      //     KeyboardArrowDownRound()
      //   }
      // }
      if (this.isShowHoverMenu && (this.isMenuHover || this.isHover)) {
        div()
          .className(this.hoverMenuWrapCss)
          .onmouseenter(() => { this.isMenuHover = true })
          .onmouseleave(() => { this.isMenuHover = false })
        {
          for (const { name, title, path } of this.structureData) {
            MenuItem()
              .name(name || title)
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
    background-color: ${this.isHover ? this.theme.orange4 : this.theme.orange2};
    color: ${this.isHover ? this.theme.text : this.theme.green11};
    font-size: 0.875rem;
    font-weight: 600;
    padding: 8px 12px;
    margin-right: 4px;
    /* padding-right: 6px; */
    border-width: 0;
    border-radius: 5px;
  `

  hoverMenuWrapCss = css`
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 102%;
    left: 0;
    background-color: ${this.theme.orange4};
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    padding: 10px;
    border-radius: 8px;
  `
}

export default NavButton as any as Typed<NavButton>
