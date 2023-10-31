import { Content, Env, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div, ContentProp } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../../utils/utilFunc"
import { ZStack } from "@dlightjs/components"

interface LineShapeProps {
  start: boolean
}

@View
class LineShape implements LineShapeProps {
  @Env theme: any = required
  @Env i18n: any = required
  //   @Prop @Content content = required
  @Prop start = required

  Body() {
    div()
      .className(this.lineShapeWrapCss)
    {
      ZStack()
        .hAlignment("leading")
      {
        div()
          .className(this.shinePointCss)
          .className(this.start ? this.moveRight : "")
        div("")
          .className(this.lineShapeCss)
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
    box-shadow: inset 0 4px 10px 0 #190137; 
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
    width: 30px;
    height: 15px;
    background-color: #FAF5FF;
    opacity: 0.57;
    z-index: -2;
    /* color: rgba(82,110,52,0.7); */
    cursor: default;
  `
}

export default LineShape as Pretty as Typed<LineShapeProps>
