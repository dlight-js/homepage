import { View } from "@dlightjs/dlight"
import { type Typed, img, Pretty, div, button, h2, Env, Prop, required } from "@dlightjs/types"
import { css } from "@emotion/css"

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

  View() {
    div()
      .class(this.exampleResultWrapCss)
    {
      div()
        .class(this.horizontalCss)
      {
        img()
          .src("/imgs/logo-leading-png.svg")
          .alt("DLight Logo")
          .width(30)
          .style({ transform: "rotate(-90deg)" })
        h2("Hi, DLight~")
          .style({
            fontSize: "20px",
            margin: "5px",
            fontFamily: "Comic Sans MS",
            color: this.theme.primaryTextColor
          })
      }
      button("Count++")
        .onClick(this.incrementCount)
        .class(this.beautifulBtn)
      button("DoubleCount++")
        .onClick(this.incrementDoubleCount)
        .class(this.beautifulBtn)
      div(`DoubleCount: ${this.doubleCount}`)
        .style({
          fontSize: "20px",
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
    bottom: 50px;
    left: 0;
    padding: 15px;
    /* background-color: ${this.isDark ? "#F5F5F5" : "white"}; */
    background-color: ${this.theme.codeBgColor};
    border-radius: 15px;
    box-shadow: 0 0 10px 0px ${this.theme.shadowColor};
    z-index: 5;
    transform: translateY(60px);
  `

  horizontalCss = css`
    display: flex;
    flex-direction: row;
    align-items: center;
  `

  doubleCountCss = css`
    font-size: 20px;
    margin: 10px 5px 0px 5px;
    font-family: "Comic Sans MS";
  `

  beautifulBtn = css`
    margin: 5px;
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
    font-size: 18px;
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
  `
}

export default ExampleResult as Pretty as Typed<ExampleResultProps>
