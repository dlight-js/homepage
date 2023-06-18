import DLight, { View } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required, Prop, RequiredProp, img } from "@dlightjs/types"
import { HStack, Route, RouterSpace, VStack } from "@dlightjs/components"
import { HelpCenterFilled } from "@dlightjs/material-icons"
import LogoTitle from "../../Icon/LogoTitle.view"
import NavButton from "./NavButton.view"
import Logo from "../../Icon/Logo.view"

class Header extends View {
  @Env navigator: any = required
  @Prop handleClickNav: RequiredProp<(tabKey: string) => void> = required
  navBtn = ["Guides", "Examples", "Tutorial", "Blog", "Ecosystem"]

  Body() {
    HStack()
    {
      Logo()
        .width(50)
        .height(50)
      for (const btn of this.navBtn) {
        NavButton(btn)
      }
    }
  }
}

export default Header as any as Typed<Header>
