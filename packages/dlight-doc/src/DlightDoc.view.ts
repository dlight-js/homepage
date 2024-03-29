import { View, Content, ContentProp, div, Env, env, Pretty, Prop, required, Typed, Watch } from "@dlightjs/dlight"
import { css } from "@emotion/css"
import { AdvantageBlock, HeadingBlock } from "./blocks"
import { CatalogueView, NextPageNav } from "./views"
import { PageNavType } from "./views/NextPageNav.view"
import { MarkitView, addBlockRule } from "@dlightjs/markit"

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
    getProps: (raw: any) => {
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

interface DlightDocProps {
  title: string
  zhTitle: string
  isShowCatalogue: boolean
  content: ContentProp<string>
  nextPageNav: PageNavType
  prePageNav: PageNavType
  textColor?: string
  codeBgColor?: string
  highlightColor?: string
  codeBlockHeaderColor?: string
  bgColor?: string
  shadowColor?: string
  themeType?: string
}

@View
class DlightDoc implements DlightDocProps {
  @Env i18n: any = required
  @Content content: any = required
  @Prop title = required
  @Prop zhTitle = required
  @Prop isShowCatalogue = required
  @Prop nextPageNav = required
  @Prop prePageNav = required
  @Prop textColor = required
  @Prop codeBgColor = required
  @Prop highlightColor = required
  @Prop codeBlockHeaderColor = required
  @Prop bgColor = required
  @Prop shadowColor = required
  @Prop themeType = required

  docAst: any = []
  catalogueIndex = 0
  markitViewEl: any
  catalogueEl: any
  isShowCatalogueInner = window.innerWidth > 1135
  firstRender = true

  closeCatalogue(e: any) {
    if (e.target !== this.catalogueEl && this.isShowCatalogue) {
      this.isShowCatalogue = false
    }
  }

  closeCatalogueWhenClickNext() {
    this.isShowCatalogue = false
  }

  @Watch
  watchEnv() {
    const theme = this.themeType === "light" ? "a11y-light" : "a11y-dark"
    this.changeTheme(theme)
  }

  changeTheme(newTheme: string) {
    const oldLink = document.getElementById("highlight-theme")
    if (oldLink?.parentNode) {
      oldLink.parentNode.removeChild(oldLink)
    }

    const link = document.createElement("link")
    link.id = "highlight-theme"
    link.rel = "stylesheet"
    link.type = "text/css"
    link.href = `/codeTheme/${newTheme}.min.css`
    document.head.appendChild(link)
  }

  willMount() {
    document.addEventListener("click", this.closeCatalogue.bind(this), { capture: true })
  }

  getAst = (ast: any) => {
    this.docAst = ast
  }

  updateCatalogueIndex(index: number) {
    this.catalogueIndex = index
  }

  @Watch
  contentWatcher() {
    if (this.content) {
      this.markitViewEl?.scrollTo({
        top: 0
      })
      setTimeout(() => {
        this.catalogueIndex = 0
      }, 100)
    }
  }

  handleScroll() {
    this.docAst.filter((paragraph: any) => paragraph.type === "Heading").forEach((item: any, index: number) => {
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

  scrollToTop(e: any) {
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
    document.removeEventListener("click", this.closeCatalogue.bind(this))
  }

  Body() {
    env()
      .textColor(this.textColor)
      .highlightColor(this.highlightColor)
      .themeType(this.themeType)
    {
      div()
        .class(this.dlightDocWrapCss)
        .ref(this.markitViewEl)
      {
        div()
          .class(this.dlightContentWrap)
        {
          div(this.i18n(this.title, this.zhTitle))
            .class(this.dlightDocTitleCss)
          MarkitView(this.content ?? "")
            .getAst(this.getAst)
          NextPageNav()
            .nextPage(this.nextPageNav)
            .prePage(this.prePageNav)
        }
        if (this.isShowCatalogueInner || this.isShowCatalogue) {
          div()
            .class(this.isShowCatalogue && !this.isShowCatalogueInner ? "" : this.dlightDocCatalogueWidthCss)
          {
            div()
              .class(this.fixCatalogueCss)
              .ref(this.catalogueEl)
            {
              CatalogueView(this.docAst.filter((paragraph: any) => paragraph.type === "Heading"))
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
    color: ${this.textColor};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `

  dlightContentWrap = css`
    flex-grow: 1;
    width: 60%;
    margin-right: 4%;
    .dlight-markit-text {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      word-wrap: break-word;
      line-height: 1.75rem;
    }
  `

  dlightDocWrapCss = css`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    height: calc(100% - 60px);
    overflow: scroll;
    overflow-x: hidden;
    padding: 30px 25px;

    .dlight-markit-code {
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      background-color: ${this.shadowColor};
      color: ${this.highlightColor};
    }

    .dlight-markit-code-block {
      background-color: ${this.codeBgColor};
    }

    .dlight-markit-code-block-header {
      background-color: ${this.codeBlockHeaderColor};
      color: ${this.textColor};
    }

    .dlight-markit-link {
      color: #A9A9A9;
    }

    .dlight-markit-divider {
      border-width: 0 ;
      height: 1px;
      width: 100%;
      margin: 40px 0;
    }

    .dlight-markit-table {
      border-collapse: collapse;
      margin: 15px 0 25px 0;
    }

    .dlight-markit-table-th {
      border: none;
      border-bottom: solid 1px #cecece;
      padding: 10px;
    }

    .dlight-markit-table-td {
      border: none;
      border-bottom: solid 1px rgb(226 232 240);
      padding: 15px;
    }
  `

  fixCatalogueCss = css`
    right: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "0" : "10px"};
    position: fixed;
    width: 248px;
    max-width: 248px;
    padding-bottom: 25px;
    padding-right: 30px;
    height: 100%;
    background-color: ${this.bgColor};
    padding-top: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "30px" : "0"};
    box-shadow: ${this.isShowCatalogue && !this.isShowCatalogueInner ? `0 2px 8px 0 ${this.shadowColor}` : ""};
    z-index: ${this.isShowCatalogue && !this.isShowCatalogueInner ? 50 : ""};
    margin-top: ${this.isShowCatalogue && !this.isShowCatalogueInner ? "-82px" : ""};
  `
}

export default DlightDoc as Pretty as Typed<DlightDocProps>
