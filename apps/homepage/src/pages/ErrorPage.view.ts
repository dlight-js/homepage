import { VStack, Spacer, Navigator } from "@dlightjs/components"
import { Env, View, required } from "@dlightjs/dlight"
import { type Typed, div, button, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"

@View
class ErrorPage {
  @Env navigator: Navigator = required
  testTable = ["html elements", "text nodes", "custom components", "if statements", "for loops"]
  tdTable = ["HTMLNode", "TextNode", "CustomNode", "IfNode", "ForNode"]
  test = ["1", "2"]

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
      table()
        .className(this.tableCss)
      {
        tr()
        {
          for (const cell of this.testTable) {
            th()
              .className(this.thCss)
            {
              div(cell)
            }
          }
        }
        for (const k of this.test) {
          tr()
            .className(this.trCss)
          {
            for (const cell of this.tdTable) {
              td()
                .className(this.tdCss)
              {
                div(cell)
              }
            }
          }
        }
      }
      Spacer()
    }
  }

  trCss = css`
  `

  tableCss = css`
    border-collapse: collapse;
  `
  thCss = css`
    /* border: solid 1px gray; */
    /* border-spacing: 0; */
    border-bottom: solid 1px #cecece;
    padding: 10px;
    text-align: left;
  `
  tdCss = css`
    border-bottom: solid 1px rgb(226 232 240);
    padding: 15px;
    text-align: center;
  `
}

export default ErrorPage as Pretty as Typed
