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
      div()
        .className(this.horizontalCss)
      {
        img()
          .src("/imgs/logo-leading-png.svg")
          .alt("DLight Logo")
          .width(Number(getSize(30).replace("px", "")))
          .style({ transform: "rotate(-90deg)" })
        h2("Hi, DLight~")
          .style({
            fontSize: getSize(20),
            margin: getSize(5),
            fontFamily: "Comic Sans MS",
            color: this.theme.primaryTextColor
          })
      }
      button("Count++")
        .onclick(this.incrementCount)
        .className(this.beautifulBtn$)
      button("DoubleCount++")
        .onclick(this.incrementDoubleCount)
        .className(this.beautifulBtn$)
      div(`DoubleCount: ${this.doubleCount}`)
        .style({
          fontSize: getSize(20),
          fontFamily: "Comic Sans MS",
          color: this.theme.primaryTextColor
        })
        .id("double-count-display")
    }
  }

  exampleResultWrapCss = css`
    position: absolute;
    width: max-content;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    bottom: ${getSize(50)};
    right: 0;
    padding: ${getSize(15)} ${getSize(15)};
    transform: ${`translateX(${getSize(80)})`};
    /* background-color: ${this.isDark ? "#F5F5F5" : "white"}; */
    background-color: ${this.theme.codeBgColor};
    border-radius: 15px;
    box-shadow: 0 0 10px 0px ${this.theme.shadowColor};
    z-index: 5;
  `

  horizontalCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  doubleCountCss$ = css`
    font-size: ${getSize(20)};
    margin: 10px 5px 0px 5px;
    font-family: "Comic Sans MS";
  `

  beautifulBtn$ = css`
    margin: ${getSize(5)};
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
    font-size: ${getSize(18)};
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
