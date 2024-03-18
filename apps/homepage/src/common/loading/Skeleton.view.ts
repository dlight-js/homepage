import { View, type Typed, div, Pretty, required, Env, Prop } from "@dlightjs/dlight"
import { css } from "@emotion/css"

interface SkeletonProps {
  data: number[][]
  height: string
  width: string
}

@View
class Skeleton implements SkeletonProps {
  @Env theme: any = required
  @Prop isPulseAnimation = true
  @Prop height = "100%"
  @Prop width = "100%"
  // 80 for title, 180 for large content, 120 for small content, 30 for one signle line
  @Prop data = [[60, 100], [20, 50], [20, 80]]

  Body() {
    div()
      .class(this.skeletonCss)
    {
      for (const [height, width] of this.data) {
        div()
          .class(this.itemCss)
          .style({ height: `${height}px`, width: `${width}%` })
      }
    }
  }

  skeletonCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    height: ${this.height};
    width: ${this.width};
  `

  itemCss = css`
    margin: 7px 0;
    width: 100%;
    background-color: ${this.theme.shadowColor};
    animation: pulse 1s ease-in-out infinite;
  `

  pulseAnimation = css`
    @keyframes pulse {
      0% {
          background-color: #E7E9ED;
      }
      50% {
          background-color: #F3F5F7;
      }
      100% {
          background-color: #E7E9ED;
      }
    }
  `
}

export default Skeleton as Pretty as Typed<SkeletonProps>
