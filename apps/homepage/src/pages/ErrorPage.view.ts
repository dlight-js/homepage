import { VStack, Spacer } from "@dlightjs/components"
import DLight, { View, $ } from "@dlightjs/dlight"
import { type Typed, div, button, Env, required } from "@dlightjs/types"

class ErrorPage extends View {
  @Env navigator: any = required

  Body() {
    VStack()
      .height("100vh")
      .width("100%")
      .alignment("center")
    {
      Spacer()
      div("🥲 Sorry, there is no content here.")
        .className("text-2xl py-8")
      button("back to home")
        .className("text-white bg-yellow-400 hover:bg-yellow-500 focus:outline-none focus:ring-4 focus:ring-yellow-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:focus:ring-yellow-900")
        .onclick(() => {
          console.log(this.navigator)
          this.navigator.to("/")
        })
      Spacer()
    }
  }
}

export default ErrorPage as any as Typed<ErrorPage>
