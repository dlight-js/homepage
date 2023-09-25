import { View } from "@dlightjs/dlight"
import { Pretty, Typed, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { HeaderData } from "../../../utils/const"
import ShortHeaderMenuItem from "./ShortHeaderMenuItem.view"

@View
class ShortHeaderMenu {
  navBtn = HeaderData
  Body() {
    div()
      .className(this.menuWarpCss)
    {
      for (const { btnName, path } of this.navBtn) {
        ShortHeaderMenuItem()
          .btnName(btnName)
          .path(path)
      }
    }
  }

  menuWarpCss = css`
    position: fixed;
    background-color: white;
    padding: 20px 10px;
    width: calc(100% - 20px);
    height: 100%;
    z-index: 100;
  `
}

export default ShortHeaderMenu as Pretty as Typed
