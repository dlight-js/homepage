import { Content, Env, Prop, View, required, Watch, env } from "@dlightjs/dlight"
import { MarkitView, addBlockRule } from "@dlightjs/markit"
import { ContentProp, div, Pretty, Typed } from "@dlightjs/types"
import "highlight.js/styles/github.css"
import { css } from "@iandx/easy-css"
import { AdvantageBlock, HeadingBlock } from "./blocks"
import { CatalogueView, NextPageNav } from "./views"
import { PageNavType } from "./views/NextPageNav.view"
import TableBlock from "./blocks/tableBlock/TableBlock.view"
import { Theme } from "./theme"

/**
 * @example
 * ````
 * ```js[Hello World]
 * div("Hello World")
 * ```
 * ```js[Goodbye World]
 * div("Goodbye World"")
 * ```
 * ````
 */
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

addBlockRule({
  name: "Table",
  rule: "default",
  view: TableBlock
})

interface DlightDocProps {
  title: string
  isShowCatalogue: boolean
  content: ContentProp<string>
  nextPageNav: PageNavType
  prePageNav: PageNavType
  themeType: "light" | "dark"
}

@View
class DlightDoc implements DlightDocProps {
  @Env path: any
  @Prop @Content content: any = required
  @Prop title = required
  @Prop isShowCatalogue = required
  @Prop nextPageNav = required
  @Prop prePageNav = required
  @Prop themeType: "light" | "dark" = "light"

  docAst: any = []
  cata = []
  catalogueIndex = 0
  markitViewEl: any
  catalogueEl: any
  isShowCatalogueInner = window.innerWidth > 1135
  firstRender = true
  theme = Theme[this.themeType]

  closeCatalogue(e: any) {
    if (e.target !== this.catalogueEl && this.isShowCatalogue) {
      this.isShowCatalogue = false
    }
  }

  closeCatalogueWhenClickNext() {
    this.isShowCatalogue = false
  }

  willMount() {
    document.addEventListener("click", this.closeCatalogue.bind(this), { capture: true })
  }

  willunMount() {
    document.removeEventListener("click", this.closeCatalogue.bind(this))
  }

  getAst = (ast: any) => {
    this.docAst = ast
  }

  updateCatalogueIndex(index: number) {
    this.catalogueIndex = index
  }

  @Watch
  pathWatcher() {
    if (this.path) {
      this.markitViewEl?.scrollTo({
        top: 0
      })
      setTimeout(() => {
        this.catalogueIndex = 0
      }, 100)
    }
  }

  @Watch
  catalogueOpenStatusWatcher() {
    if (this.isShowCatalogue && this.firstRender) {
      this.isShowCatalogue = false
      this.firstRender = false
    }
  }

  handleScroll() {
    this.docAst.filter(paragraph => paragraph.type === "Heading").forEach((item, index) => {
      if (index === this.catalogueIndex + 1) {
        const el = document.getElementById(item.content[0].content)
        const fromTop = el?.getBoundingClientRect().top ?? 0
        if (fromTop < 0) {
          this.catalogueIndex += 1
        }
      } else if (index === this.catalogueIndex - 1) {
        const el = document.getElementById(item.content[0].content)
        const fromTop = el?.getBoundingClientRect().top ?? 0
        if (fromTop > -10) {
          this.catalogueIndex -= 1
        }
      }
    })
  }

  scrollToTop(e) {
    e.stopPropagation()
    this.markitViewEl?.scrollTo({
      top: 0
    })
    this.catalogueIndex = 0
  }

  handleWindowResize() {
    if (window.innerWidth < 1140) {
      this.isShowCatalogueInner = false
    } else {
      this.isShowCatalogueInner = true
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
    env()
      .theme(this.theme)
    {
      div()
        .className(this.dlightDocWrap)
        .element(this.markitViewEl)
      {
        div()
          .className(this.dlightContentWrap)
        {
          div(this.title)
            .className(this.dlightDocTitleCss)
          MarkitView(this.content)
            .getAst(this.getAst)
          NextPageNav()
            .nextPage(this.nextPageNav)
            .prePage(this.prePageNav)
        }
        if (this.isShowCatalogueInner || this.isShowCatalogue) {
          div()
            .className(this.isShowCatalogue && !this.isShowCatalogueInner ? "" : this.dlightDocCatalogueWidthCss)
          {
            div()
              .className(this.fixCatalogueCss)
              .element(this.catalogueEl)
            {
              CatalogueView(this.docAst.filter(paragraph => paragraph.type === "Heading"))
                .currentIndex(this.catalogueIndex)
                .updateCurrentIndex(this.updateCatalogueIndex)
                .isShowShadow(this.isShowCatalogue && !this.isShowCatalogueInner)
                .scrollToTop(this.scrollToTop)
            }
          }
        }
      }
    }
  }

  /** @style */
  dlightDocCatalogueWidthCss = css`
    width: 248px;
  `

  dlightDocTitleCss = css`
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 0;
    color: ${this.theme.primaryText};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  dlightContentWrap = css`
    flex-grow: 1;
    width: 60%;
    margin-right: 4%;
    background-color: ${this.theme.primaryBg};
    .dlight-markit-text {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      word-wrap: break-word;
      color: ${this.theme.primaryText};
      line-height: 1.75rem;
    }
    .dlight-markit-code {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: ${this.theme.codeBg};
      color: ${this.theme.codeText};
    }
  `

  dlightDocWrap = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: calc(100% - 60px);
    overflow: scroll;
    overflow-x: hidden;
    padding: 30px 25px;
  `

  fixCatalogueCss = css`
    right: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "0" : "10px"};
    position: fixed;
    width: 248px;
    max-width: 248px;
    padding-bottom: 25px;
    padding-right: 30px;
    background-color: ${this.theme.primaryBg};
    height: 100%;
    padding-top: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "30px" : "0"};
    box-shadow: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "0 2px 8px 0 #A9A9A9" : ""};
    z-index: ${this.isShowCatalogue && !this.isShowCatalogueInner ? 50 : ""};
    margin-top: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "-82px" : ""};
  `

  dlightMarkitDivider$ = css`
    border-width: 0 ;
    height: 1px;
    width: 100%;
    background-color: ${this.theme.divider};
    margin: 40px 0;
  `
}

export default DlightDoc as Pretty as Typed<DlightDocProps>
