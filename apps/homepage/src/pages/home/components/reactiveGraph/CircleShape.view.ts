import { Content, Env, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div, ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../../utils/utilFunc"

interface CircleShapeProps {
  content: ContentProp<string>
  onclick?: () => void
}

@View
class CircleShape implements CircleShapeProps {
  @Env theme: any = required
  @Env i18n: any = required
  @Prop @Content content = required
  @Prop onclick?: (() => void) | undefined

  Body() {
    div()
      .className(this.circleShapeWrapCss)
    {
      div(this.content)
        .className(this.circleShapeCss)
        .onclick(this.onclick)
    }
  }

  circleShapeCss = css`
    width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    position: relative;
    /* margin: 20px; */
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center;
    box-shadow: 0 0 10px 0 #A9A9A9;
    z-index: 10;
  `

  circleShapeWrapCss = css`
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgba(82,110,52,0.7);
    cursor: default;
  `
}

export default CircleShape as Pretty as Typed<CircleShapeProps>
