import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, Prop, RequiredProp } from "@dlightjs/types"
import { Route, RouterSpace, VStack } from "@dlightjs/components"
import { css } from "@iandx/easy-css"
// import { Nuti } from "@dlightjs/material-icons"

class NavButton extends View {
  @Env navigator: any = required
  @Env theme: any = required
  @Prop _$content: RequiredProp<string> = required
  @Prop handleClickNav: RequiredProp<() => void> = required

  // guideMDString = ""
  // async didMount() {
  //   fetch("README-dep.md")
  //     .then(async response => await response.text())
  //     .then(content => {
  //       console.log(content)
  //       this.guideMDString = content
  //     })
  //     .catch(err => console.log(err))
  // }


  Body() {
    button(this._$content)
      .className(this.navBtnCss)
      .onclick(this.handleClickNav)
  }

  navBtnCss=css`
   background-color: ${this.theme.orange4};
    padding: 8px 16px;
    border-width: 0;
    border-radius: 5px;
    margin-right: 16px;
    color: #526E37;
  `
}

export default NavButton as any as Typed<NavButton>
