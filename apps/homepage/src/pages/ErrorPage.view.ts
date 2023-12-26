import { VStack, Spacer, Navigator } from "@dlightjs/components"
import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, div, button, Pretty } from "@dlightjs/types"

interface ErrorPageProps {
  navigator: Navigator
  errorInfo: string
  btnText: string
  btnEvent: () => void
}

@View
class ErrorPage implements ErrorPageProps {
  @Env navigator: Navigator = required
  @Prop errorInfo: string = "🥲 Sorry, there is no content here."
  @Prop btnText: string = "back to home"
  @Prop btnEvent = () => {
    this.navigator.to("/")
  }

  Body() {
    VStack()
      .height("100vh")
      .width("100%")
      .alignment("center")
    {
      Spacer()
      div(this.errorInfo)
        .className("text-2xl py-8")
      button(this.btnText)
        .onclick(this.btnEvent)
      Spacer()
    }
  }
}

export default ErrorPage as Pretty as Typed<ErrorPageProps>
