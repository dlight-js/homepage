import { View } from "@dlightjs/dlight"
import { type Typed, button, Env, required, Prop, RequiredProp } from "@dlightjs/types"
import { css } from "@dlightjs/easy-css"

class NavButton extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop _$content: RequiredProp<string> = required
  @Prop handleClickNav: RequiredProp<() => void> = required

  Body() {
    button(this._$content)
      .className(this.navBtnCss)
      .onclick(this.handleClickNav)
  }

  navBtnCss = css`
    cursor: pointer;
    background-color: ${this.theme.orange4};
    padding: 8px 16px;
    border-width: 0;
    border-radius: 5px;
    margin-right: 16px;
    color: #526E37;
  `
}

export default NavButton as any as Typed<NavButton>
