import { Env, Prop, View, Watch, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import Shape from "./Shape.view"
import LineShape from "./LineShape.view"

interface ReactiveGraphProps {
  count: number
  dblCount: number
  isChangedblCount: boolean
}

@View
class ReactiveGraph implements ReactiveGraphProps {
  @Env theme: any = required
  @Env i18n: any = required
  @Prop count: number = required
  @Prop dblCount: number = required
  @Prop start = false
  @Prop isChangedblCount = false
  delayCount: number = 0
  dblDelayCount: number = 0
  // count++, count, dblCount++, dblCount, dblCountDisplay
  animationSeq = 0
  isFirstCountAnimate = true

  updateCount() {
    this.delayCount = this.count
    this.dblDelayCount = this.dblCount
  }

  didMount() {
    this.updateCount()
  }

  @Watch
    startCountAnimate = (() => {
      console.log(this.count)
      if (this.isFirstCountAnimate) {
        this.isFirstCountAnimate = false
        return
      }
      let i = 1
      this.animationSeq = i
      i++
      const interval = setInterval(() => {
        if (i < 6) {
          if (i === 3) {
            i++
          }
          this.animationSeq = i
          i++
        } else {
          this.animationSeq = 0
          this.updateCount()
          clearInterval(interval)
        }
      }, 1000)
    })()

  @Watch
    startDblCountAnimate = (() => {
      if (this.isChangedblCount) {
        let i = 3
        this.animationSeq = i
        i++
        const interval = setInterval(() => {
          if (i < 6) {
            this.animationSeq = i
            i++
          } else {
            this.animationSeq = 0
            this.updateCount()
            clearInterval(interval)
          }
        }, 1000)
      }
    })()

  Body() {
    div()
      .className(this.graphWrapCss)
    {
      div()
        .className(this.verticalCss)
      {
        div()
          .className(this.horizontalCss)
        {
          div()
            .className(this.horizontalCss)
            .className(this.translateCss)
          {
            Shape("count++")
              .shape("square")
              .isStartPulse(this.animationSeq === 1)
            LineShape()
              .start(this.start)
              .type("downCorner")
          }
          Shape(`count\n${this.animationSeq >= 2 ? this.count : this.delayCount}`)
            .isStartPulse(this.animationSeq === 2)
          LineShape()
            .type("downCorner")
        }
        div()
          .className(this.horizontalCss)
        {
          Shape("dblCount++")
            .shape("square")
            .isStartPulse(this.animationSeq === 3)
          LineShape()
            .type("upCorner")
        }
      }
      Shape(`dblCount\n${this.animationSeq >= 4 ? this.dblCount : this.dblDelayCount}`)
        .isStartPulse(this.animationSeq === 4)
      LineShape()
      Shape(`dblCount-display\n${this.animationSeq >= 5 ? this.dblCount : this.dblDelayCount}`)
        .isStartPulse(this.animationSeq === 5)
    }
  }

  graphWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 30px 0;
    margin-bottom: 30px;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: ${this.theme.primaryTextColor};
    font-size: 17px;
    font-weight: 500;
    cursor: default;
  `

  horizontalCss = css`
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 10px 0;
  `
  verticalCss = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-end;
    transform: translateX(20px);
  `

  translateCss = css`
    transform: translateY(-40px);
  `
}

export default ReactiveGraph as Pretty as Typed<ReactiveGraphProps>
