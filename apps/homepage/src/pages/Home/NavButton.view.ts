import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, Prop, RequiredProp } from "@dlightjs/types"
import { Route, RouterSpace, VStack } from "@dlightjs/components"
// import { Nuti } from "@dlightjs/material-icons"

class NavButton extends View {
  @Env navigator: any = required
  @Prop _$content: RequiredProp<string> = required
  @Prop handleClickNav: RequiredProp<() => void> = required

  Body() {
    button(this._$content)
      .className("rounded p-3 text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4")
      .onclick(this.handleClickNav)
  }
}

export default NavButton as any as Typed<NavButton>
