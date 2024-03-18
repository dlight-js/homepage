import { View, type Typed, Pretty, div, img, Env, Prop, required } from "@dlightjs/dlight"
import { css } from "@emotion/css"

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
      if (this.type === "straight") {
        img()
          .class(this.lineShapeCss)
          .src("/imgs/line.svg")
      } else if (this.type === "downCorner") {
        img()
          .class(this.downCornerShapeCss)
          .src("/imgs/corner.svg")
      } else if (this.type === "upCorner") {
        img()
          .class(this.upCornerShapeCss)
          .src("/imgs/corner.svg")
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
