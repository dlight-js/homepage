import { Env, View, required } from "@dlightjs/dlight"
import { type Typed, div, Pretty } from "@dlightjs/types"
import { css } from "@iandx/easy-css"
import { PreviewCode } from "../../utils/const"
import { KeyboardArrowRightFilled } from "@dlightjs/material-icons"
import { lazy, Navigator } from "@dlightjs/components"

const DLightEditor = lazy(async() => await import("dlight-editor"))
@View
class PreviewSection {
  @Env navigator: Navigator = required
  @Env theme: any = required

  isHover = false

  editorWrapperEl?: HTMLElement
  editorLoaded = false

  loadEditor() {
    if (!this.editorWrapperEl) return false
    const rect = this.editorWrapperEl.getBoundingClientRect()

    const isInViewport = (
      rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
      rect.bottom > 0 &&
      rect.left < (window.innerWidth || document.documentElement.clientWidth) &&
      rect.right > 0
    )

    if (isInViewport && !this.editorLoaded) {
      this.editorLoaded = true
    }
  }

  willMount() {
    window.addEventListener("scroll", this.loadEditor.bind(this))
  }

  didUnmount() {
    window.removeEventListener("scroll", this.loadEditor.bind(this))
  }

  Body() {
    div()
      .className(this.previewWrapCss)
    {
      div()
        .className(this.descriptionWrapCss)
      {
        div("This is a title")
          .className(this.titleCss)
        div(`In the bustling heart of the city, life pulses with an unyielding energy that seems to infuse every corner with a sense of purpose. Tall skyscrapers reach for the heavens, casting elongated shadows that dance upon the streets below. Amidst the urban cacophony, a symphony of cultures intertwines, creating a vibrant tapestry of diversity.
        Coffee shops exude the rich aroma of freshly ground beans, inviting passersby to take a momentary escape from the rush. Pedestrians hurry along the sidewalks, their footsteps echoing a rhythm of urgency, while artists display their creations on makeshift galleries, adding splashes of color to the gray concrete.
        `)
          .className(this.contentCss)
        div()
          .className(this.viewMoreCss)
          .onmouseenter(() => { this.isHover = true })
          .onmouseleave(() => { this.isHover = false })
          .onclick(() => { this.navigator.to("/examples") })
        {
          div("View More Examples")
          KeyboardArrowRightFilled()
            .className(this.arrowCss)
            .color(this.theme.green12)
        }
      }
      div()
        .className(this.codeWrapCss)
        .element(this.editorWrapperEl)
      {
        if (this.editorLoaded) {
          DLightEditor()
            .modules([{
              code: PreviewCode,
              path: "/index.ts"
            }])
            .width("600px")
            .height("500px")
            .themeType("light")
        } else {
          "Loading editor"
        }
      }
    }
  }

  previewWrapCss = css`
    margin: 50px 7%;
    display: flex;
    flex: 1;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    border-radius: 15px;
    line-height: 1.75rem;
    color: ${this.theme.green12};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  descriptionWrapCss = css`
    flex: 1;
    margin: 40px 20px;
    min-width: 410px;
    max-width: 675px;
  `

  titleCss = css`
    font-size: 35px;
    margin-bottom: 40px;
  `

  contentCss = css`
    margin: 20px 0;
  `

  viewMoreCss = css`
    font-size: 20px;
    display: flex;
    flex-direction: row;
    align-items: center;
    cursor: pointer;
  `
  arrowCss = css`
    padding-top: 8px;
  `

  codeWrapCss = css`
    height: 500px;
    display: block;
    width: max-content;
    border-radius: 10px;
    margin: 0 10px;
  `
}

export default PreviewSection as Pretty as Typed
