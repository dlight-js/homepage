import { View, type Typed, Pretty, div, ContentProp, Content, Env, Prop, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import clsx from "clsx"

interface ShapeProps {
  content: ContentProp<string>
  onClick?: () => void
  shape?: "circle" | "square"
  isStartPulse?: boolean
}

@View
class Shape implements ShapeProps {
  @Env theme: any = required
  @Env themeType: "light" | "dark" = required
  @Env i18n: any = required
  @Content content = required
  @Prop onClick?: (() => void) | undefined
  @Prop shape: "circle" | "square" = "circle"
  @Prop isStartPulse = false
  isLight = this.themeType === "light"

  Body() {
    div()
    {
      div(this.content)
        .class(clsx(this.shapeCss, this.shape === "circle" ? this.circleShapeCss : this.squareShapeCss, this.isStartPulse ? this.pulseCss : ""))
    }
  }

  shapeCss = css`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: ${this.isStartPulse || this.isLight ? "0 0 10px 0 #A9A9A9" : "0 0 10px 0 #1a1a1a"};
    z-index: 10;
    background-color: ${this.isStartPulse && this.isLight ? this.theme.pulseColor : this.theme.codeBgColor};
    transition: background-color 0.3s;
  `

  pulseCss = css`
    animation: pulse 1s ease-in-out;
  `

  circleShapeCss = css`
    width: 110px;
    height: 110px;
    border-radius: 50%;
  `

  squareShapeCss = css`
    width: 130px;
    height: 100px;
    border-radius: 15px;

  `

  pulseAnimation = css`
    @keyframes pulse {
      0% {
          transform: scale(1);
      }
      25% {
          transform: scale(1.1);
      }
      50% {
          transform: scale(1);
      }
      75% {
          transform: scale(1.1);
      }
      100% {
          transform: scale(1);
      }
    }
  `
}

export default Shape as Pretty as Typed<ShapeProps>
