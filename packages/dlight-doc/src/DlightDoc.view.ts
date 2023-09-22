import { View } from "@dlightjs/dlight"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { div, Env, Prop, required, RequiredProp, Typed } from "@dlightjs/types"
import "highlight.js/styles/github.css"
import { css } from "@dlightjs/easy-css"
import { AdvantageBlock, HeadingBlock } from "./blocks"
import { CatalogueView, NextPageNav } from "./views"

addBlockRule({
  name: "CodeBlock",
  rule: {
    getProps: raw => {
      const text = raw.replace(/ *```|```$/g, "")
      let [language, title] = (text.match(/^.+?\n/g) ?? ["text"])[0].replace("```", "").trim().split("[")
      if (title) {
        title = title.replace("]", "")
      }
      return { language, title }
    }
  },
  view: AdvantageBlock
})

addBlockRule({
  name: "Heading",
  rule: "default",
  view: HeadingBlock
})

class DlightDoc extends View {
  @Env path
  @Prop _$content: RequiredProp<string> = required

  docAst: any = []
  cata = []
  catalogueIndex = 0
  markitViewEl
  isShowCatalogue = window.innerWidth > 1135

  getAst = (ast: any) => {
    this.docAst = ast
  }

  updateCatalogueIndex(index: number) {
    this.catalogueIndex = index
  }

  pathWatcher = (() => {
    if (this.path) {
      this.markitViewEl?.scrollTo({
        top: 0
      })
      setTimeout(() => {
        this.catalogueIndex = 0
      }, 100)
    }
  })()

  handleScroll() {
    this.docAst.filter(paragraph => paragraph.type === "Heading").forEach((item, index) => {
      if (index === this.catalogueIndex + 1) {
        const el = document.getElementById(item.content[0].content)
        const fromTop = el?.getBoundingClientRect().top ?? 0
        if (fromTop < 0) {
          console.log(fromTop, item.content[0].content)
          this.catalogueIndex += 1
        }
      } else if (index === this.catalogueIndex - 1) {
        const el = document.getElementById(item.content[0].content)
        const fromTop = el?.getBoundingClientRect().top ?? 0
        // if (fromTop > window.innerHeight) {
        //   this.catalogueIndex -= 1
        // }
        if (fromTop > -10) {
          this.catalogueIndex -= 1
        }
      }
    })
  }

  handleWindowResize() {
    if (window.innerWidth < 1140) {
      this.isShowCatalogue = false
    } else {
      this.isShowCatalogue = true
    }
  }

  didMount() {
    this.markitViewEl.addEventListener("scroll", this.handleScroll)
    window.addEventListener("resize", this.handleWindowResize)
  }

  willUnmount() {
    this.markitViewEl.removeEventListener("scroll", this.handleScroll)
    window.removeEventListener("resize", this.handleWindowResize)
  }

  Body() {
    div()
      .element(this.markitViewEl)
      .className(this.dlightDocWrap)
    {
      div()
        .className(this.dlightContentWrap)
      {
        MarkitView(this._$content)
          .getAst(this.getAst)
        NextPageNav()
          .updateCurrentIndex(this.updateCatalogueIndex)
      }
      if (this.isShowCatalogue) {
        div()
          .className(this.fixCatalogueCss)
        {
          CatalogueView(this.docAst.filter(paragraph => paragraph.type === "Heading"))
            .currentIndex(this.catalogueIndex)
            .updateCurrentIndex(this.updateCatalogueIndex)
        }
      }
    }
  }

  dlightContentWrap = css`
    flex-grow: 1;
    width: 60%;
    margin-right: 4%;
    .dlight-markit-text {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      word-wrap: break-word;
      color: rgb(51, 65, 85);
      line-height: 1.75rem;
    }
    .dlight-markit-code {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: #f6f6f7;
      color: #445d2a;
    }
  `

  dlightDocWrap = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: 82vh;
    overflow: scroll;
    padding: 30px 25px;
  `

  fixCatalogueCss = css`
    width: 268px;
  `
}

export default DlightDoc as any as Typed<DlightDoc>
