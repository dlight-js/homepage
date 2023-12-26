import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, div, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { Navigator } from "@dlightjs/components"

interface SkeletonProps {
  data: number[]
  height: string
  width: string
}

@View
class Skeleton implements SkeletonProps {
  @Env navigator: Navigator = required
  @Env themeType: "light" | "dark" = required
  @Env theme: any = required
  @Env i18n: any = required
  @Prop isPulseAnimation = true
  @Prop height = "100%"
  @Prop width = "100%"
  // 80 for title, 180 for large content, 120 for small content, 30 for one signle line
  @Prop data = [80, 30, 30, 180, 30, 120, 30, 150, 30, 120]

  Body() {
    div()
      .className(this.skeletonCss)
    {
      for (const item of this.data) {
        div()
          .className(this.itemCss)
          .style({ height: `${item}px` })
      }
    }
  }

  skeletonCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: ${this.height};
    width: ${this.width};
  `

  itemCss = css`
    margin: 5px 0;
    width: 100%;
    background-color: #F5F5F5;
    border-radius: 4px;
    animation: pulse 1s ease-in-out infinite;
  `
  pulseAnimation = css`
    @keyframes pulse {
      0% {
          background-color: #CCCCCC;
      }
      50% {
          background-color: #F5F5F5;
      }
      100% {
          background-color: #CCCCCC;
      }
    }
  `
}

export default Skeleton as Pretty as Typed<SkeletonProps>
