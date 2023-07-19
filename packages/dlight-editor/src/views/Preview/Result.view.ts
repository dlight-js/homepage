import { View } from "@dlightjs/dlight"
import { div, Env, Prop, required, RequiredProp, Typed } from "@dlightjs/types"
import { Color } from "../../utils/const"

class Result extends View {
  /** @prop */
  @Prop mountId: RequiredProp<string> = required
  @Env theme: Color = required

  /** @view */
  Body() {
    div()
      .id(`app-${this.mountId}`)
      .style({
        color: this.theme.text,
        padding: "20px"
      })
  }

  /** @style */
}

export default Result as any as Typed<Result>
