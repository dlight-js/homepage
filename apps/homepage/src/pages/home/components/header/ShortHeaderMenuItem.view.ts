import { Env, Prop, View, required } from "@dlightjs/dlight"
import { Pretty, Typed, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { Navigator } from "@dlightjs/components"

interface ShortHeaderMenuItemProps {
  btnName: string
  btnPath: string
}

@View
class ShortHeaderMenuItem {
  @Env theme: any = required
  @Env navigator: Navigator = required
  @Env path: string = required
  @Prop btnName = required
  @Prop btnPath = required
  isSelected = this.btnName === "Documents" ? this.path.includes("docs") : this.path.includes(this.btnPath.replace("/", ""))
  isHover = false
  Body() {
    div(this.btnName)
      .className(this.menuBtnCss)
      .onclick(() => { this.navigator.to(this.btnPath) })
      .onmouseenter(() => { this.isHover = true })
      .onmouseleave(() => { this.isHover = false })
  }

  menuBtnCss = css`
    font-size: 20px;
    line-height: 30px;
    padding: 10px 20px;
    background-color: ${this.isHover || this.isSelected ? this.theme.orange4 : ""};
    border-radius: 5px;
    color: ${this.theme.green12};
    cursor: pointer;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `
}

export default ShortHeaderMenuItem as Pretty as Typed<ShortHeaderMenuItemProps>
