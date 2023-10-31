import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, img, Pretty, div, button, h2 } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../utils/utilFunc"

interface ExampleResultProps {
  count: number
  doubleCount: number
  incrementCount: () => void
  incrementDoubleCount: () => void
}

@View
class ExampleResult implements ExampleResultProps {
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Prop count: number = required
  @Prop doubleCount: number = required
  @Prop incrementCount: () => void = required
  @Prop incrementDoubleCount: () => void = required
  isDark = this.themeType === "dark"

  Body() {
    div()
      .className(this.exampleResultWrapCss)
    {
      img()
        .src("/imgs/logo-leading-png.svg")
        .alt("DLight Logo")
        .width(30)
        .style({ transform: "rotate(-90deg)" })
      h2("Hi, DLight~")
        .style({
          margin: "5px",
          fontFamily: "Comic Sans MS",
          color: this.theme.secondaryTextColor
        })
      button("Count++")
        .onclick(this.incrementCount)
        .className(this.beautifulBtn$)
      button("DoubleCount++")
        .onclick(this.incrementDoubleCount)
        .className(this.beautifulBtn$)
      div(`DoubleCount: ${this.doubleCount}`)
        .style({
          margin: "10px 5px 0px 5px",
          fontSize: "20px",
          fontFamily: "Comic Sans MS",
          color: this.theme.secondaryTextColor
        })
        .id("double-count-display")
    }
  }

  exampleResultWrapCss = css`
    margin: 40px;
    width: max-content;
    padding: 15px 30px;
    display: block;
    /* transform: ${`translate(${getSize(220)}, ${getSize(-220)})`}; */
    background-color: ${this.isDark ? "#2B2B2B" : "white"};
    border-radius: 15px;
    box-shadow: 0 0 10px 0px ${this.isDark ? "#1a1a1a" : "#A9A9A9"};
  `

  doubleCountCss$ = css`
    font-size: 20px;
    margin: 10px 5px 0px 5px;
    font-family: "Comic Sans MS";
  `

  beautifulBtn$ = css`
    margin: 10px;
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
    font-size: 18px;
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
  `
}

export default ExampleResult as Pretty as Typed<ExampleResultProps>
