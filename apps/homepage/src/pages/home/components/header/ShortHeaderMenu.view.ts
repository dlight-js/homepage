import { Env, View, required } from "@dlightjs/dlight"
import { Pretty, Typed, div } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { HeaderData } from "../../../../const/homeData"
import ShortHeaderMenuItem from "./ShortHeaderMenuItem.view"

@View
class ShortHeaderMenu {
  @Env i18n: any = required
  navBtn = HeaderData

  Body() {
    div()
      .className(this.menuWarpCss)
    {
      for (const { btnName, zhBtnName, path } of this.navBtn) {
        ShortHeaderMenuItem()
          .btnName(this.i18n(btnName, zhBtnName))
          .btnPath(path)
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
