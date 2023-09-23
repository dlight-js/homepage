import { View } from "@dlightjs/dlight"
import { type Typed, required, img, Env } from "@dlightjs/types"
import { css, div } from "@dlightjs/easy-css"

class Example extends View {
  @Env theme: any = required
  count = 2

  Body() {
    div()
          .className(this.exampleWrapCss)
        {
          img()
            .src("/code-example.png")
            .alt("code-example")
            .className(this.codeExampleCss)
          img()
            .src("/code-example-result.png")
            .alt("code-example-result")
            .className(this.codeResultExampleCss)
          div(`Count: ${this.count}`)
            .className(this.countBtnCss)
            .onclick(() => { this.count++ })
        }
  }

  countBtnCss = css`
    align-items: center;
    background-image: linear-gradient(144deg,#AF40FF, #5B42F3 50%,#00DDEB);
    border: 0;
    width: 38px;
    border-radius: 8px;
    box-shadow: rgba(151, 65, 252, 0.2) 0 15px 30px -5px;
    box-sizing: border-box;
    color: #FFFFFF;
    display: flex;
    font-family: Phantomsans, sans-serif;
    font-size: 20px;
    justify-content: center;
    line-height: 1em;
    max-width: 100%;
    min-width: 140px;
    padding: 16px 24px;
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    transform: translate(250px, -263px);
  `

  exampleWrapCss = css`
    padding-top: 30px;
  `

  codeResultExampleCss = css`
    width: 200px;
    display: block;
    transform: translate(220px, -180px);
  `

  codeExampleCss = css`
    width: 400px;
  `

}

export default Example as any as Typed<Example>
