import { View } from "@dlightjs/dlight"
import { Content, ContentProp, Env, Pretty, Typed, div, required, span } from "@dlightjs/types"
import { css } from "@emotion/css"

import clsx from "clsx"
import { EnvType } from "../../../App.view"

type TitleContent = Array<string | [string, string]>

interface TitleProps {
  content: ContentProp<TitleContent>
}

@View
class Title implements TitleProps, EnvType {
  @Env isShortView: EnvType["isShortView"] = required
  @Content content: TitleProps["content"] = required

  View() {
    div(); {
      for (const item of this.content) {
        if (Array.isArray(item)) {
          span(item[0])
            .class(clsx(css`color: ${item[1]} !important;`, this.titleCss))
        } else {
          span(item)
            .class(this.titleCss)
        }
      }
    }
  }

  titleCss = css`
    font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
    font-size: ${this.isShortView ? 40 : 50}px;
    font-weight: 500;
  `
}

export default Title as Pretty as Typed<TitleProps>
