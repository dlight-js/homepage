import { View } from "@dlightjs/dlight"
import { div, Pretty, Typed } from "@dlightjs/types"
import { Color } from "../../utils/const"

interface ResultProps {
  mountId: string
}

@View
class Result {
  /** @prop */
  @Prop mountId: string = required
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

export default Result as Pretty as Typed<ResultProps>
