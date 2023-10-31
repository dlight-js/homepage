import { Env, Prop, View, required } from "@dlightjs/dlight"
import { type Typed, Pretty, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { getSize } from "../../../../utils/utilFunc"
import CircleShape from "./CircleShape.view"
import LineShape from "./LineShape.view"

interface ReactiveGraphProps {
  count: number
  dblCount: number
}

@View
class ReactiveGraph implements ReactiveGraphProps {
  @Env theme: any = required
  @Env i18n: any = required
  @Prop count: number = required
  @Prop dblCount: number = required
  start = false

  startTransition() {
    this.start = true
    setTimeout(() => {
      this.start = false
    }, 1000)
  }

  Body() {
    div()
      .className(this.graphWrapCss)
    {
      CircleShape("count++")
        .onclick(this.startTransition)
      LineShape()
        .start(this.start)
      CircleShape(`count\n${this.count}`)
      LineShape()
      CircleShape(`dblCount\n${this.dblCount}`)
      LineShape()
      CircleShape(`dblCount-display\n${this.dblCount}`)
    }
  }

  graphWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    margin: 0 8%;
    margin-top: ${getSize(80)};
    padding: ${getSize(30)} 0;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    color: rgba(82,110,52,0.7);
    cursor: default;
  `
}

export default ReactiveGraph as Pretty as Typed<ReactiveGraphProps>
