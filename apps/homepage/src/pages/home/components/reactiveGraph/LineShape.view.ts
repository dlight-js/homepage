import { Content, Env, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div, ContentProp, img } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../../utils/utilFunc"
import { ZStack } from "@dlightjs/components"

interface LineShapeProps {
  start: boolean
  type?: "straight" | "downCorner" | "upCorner"
}

@View
class LineShape implements LineShapeProps {
  @Env theme: any = required
  @Env i18n: any = required
  //   @Prop @Content content = required
  @Prop start = required
  @Prop type: "straight" | "downCorner" | "upCorner" = "straight"

  Body() {
    div()
      .className(this.lineShapeWrapCss)
    {
      ZStack()
        .hAlignment("leading")
      {
        // div()
        //   .className(this.shinePointCss)
        //   .className(this.start ? this.moveRight : "")
        // div("")
        //   .className(this.lineShapeCss)
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

  lineShapeWrapCss = css`
    /* width: 80px;
    height: 80px;
    background-color: white;
    border-radius: 50%;
    position: relative;
    margin: 20px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    text-align: center; */
  `

  shinePointCss = css`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    box-shadow: 0 0 20px 0 #AEAEAE; 
    background-color: #fff;
    /* transition: transform 1s; */
    transform: translateX(-20px);
    z-index: 0;
  `

  moveRight = css`
    transition: transform 1s;
    transform: translateX(30px);
  `

  lineShapeCss = css`
    width: 50px;
    /* height: 80px; */
    /* background-color: #FAF5FF; */
    /* background-color: rgba(250,245,255, 0.57);
    opacity: 0.57;
    z-index: 0;
    box-shadow: inset 0 4px 10px 0 #190137;  */
    /* color: rgba(82,110,52,0.7); */
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
