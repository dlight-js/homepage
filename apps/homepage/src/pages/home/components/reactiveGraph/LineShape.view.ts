import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div, img } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { ZStack } from "@dlightjs/components"

interface LineShapeProps {
  start: boolean
  type?: "straight" | "downCorner" | "upCorner"
}

@View
class LineShape implements LineShapeProps {
  @Env theme: any = required
  @Env i18n: any = required
  @Prop start = required
  @Prop type: "straight" | "downCorner" | "upCorner" = "straight"

  Body() {
    div()
    {
      ZStack()
        .hAlignment("leading")
      {
        if (this.type === "straight") {
          img()
            .className(this.lineShapeCss)
            .src("/imgs/line.svg")
        } else if (this.type === "downCorner") {
          img()
            .className(this.downCornerShapeCss)
            .src("/imgs/corner.svg")
        } else if (this.type === "upCorner") {
          img()
            .className(this.upCornerShapeCss)
            .src("/imgs/corner.svg")
        }
      }
    }
  }

  lineShapeCss = css`
    width: 50px;
    cursor: default;
  `
  downCornerShapeCss = css`
    transform: translateY(20px);
    width: 100px;
  `
  upCornerShapeCss = css`
    transform: scaleX(-1) translateY(-20px);
    width: 100px;
  `
}

export default LineShape as Pretty as Typed<LineShapeProps>
