import { Env, View, required } from "@dlightjs/dlight"
import { type Typed, img, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../utils/utilFunc"

@View
class Example {
  @Env theme: any = required
  @Env isMobile: boolean = required
  count = 2

  Body() {
    div()
      .className(this.exampleWrapCss)
    {
      img()
        .src("/imgs/code-example.png")
        .alt("code-example")
        .className(this.codeExampleCss)
      img()
        .src("/imgs/code-example-result.png")
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
    width: ${getSize(38)};
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
    min-width: ${getSize(140)};
    padding: ${getSize(16)} ${getSize(24)};
    text-decoration: none;
    user-select: none;
    -webkit-user-select: none;
    touch-action: manipulation;
    white-space: nowrap;
    cursor: pointer;
    transform: ${`translate(${getSize(250)}, ${getSize(-263)})`};
  `

  exampleWrapCss = css`
    padding-top: ${getSize(60)};
  `

  codeResultExampleCss = css`
    width: ${getSize(200)};
    display: block;
    transform: ${`translate(${getSize(220)}, ${getSize(-180)})`};
  `

  codeExampleCss = css`
    width: ${getSize(400)};
  `
}

export default Example as Pretty as Typed
