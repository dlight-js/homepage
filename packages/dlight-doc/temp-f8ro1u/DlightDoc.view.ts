import { preParseEasyStore as preParseEasyStore_61mt6g } from "@iandx/easy-css";
(() => {
  preParseEasyStore_61mt6g({
    styleList: [".easy-css-21aa9m{width:248px;}", ".easy-css-asd7tg{display:flex;flex-direction:row;justify-content:flex-end;height:calc(100% - 60px);overflow:scroll;overflow-x:hidden;padding:30px 25px;}"],
    nameHashStore: {
      "1719109c-ffff-4fff-bfff-ffffffffffff": "easy-css-21aa9m",
      "b7a7ca33-0000-4000-8000-000000000000": "easy-css-asd7tg"
    },
    styleHashStore: {}
  }, "src/DlightDoc.view.ts");
})();
import { createTemplate as $0$, setStyle as $1$, setDataset as $2$, setEvent as $3$, setHTMLProp as $4$, setHTMLAttr as $5$, setHTMLProps as $6$, setHTMLAttrs as $7$, insertNode as $8$, createElement as $9$, ForNode as $10$, CondNode as $11$, EnvNode as $12$, createTextNode as $13$, updateText as $14$, ExpNode as $15$, PropView as $16$, SubViewNode as $17$ } from "@dlightjs/dlight";
import { toHyphenatedCase as toHyphenatedCase_61mt6g } from "@iandx/easy-css";
import { View } from "@dlightjs/dlight";
import { MarkitView, addBlockRule } from "@dlightjs/markit";
import { Content, ContentProp, div, Env, env, Pretty, Prop, required, Typed, Watch } from "@dlightjs/types";
import "highlight.js/styles/github.css";
import { css } from "@iandx/easy-css";
import { AdvantageBlock, HeadingBlock } from "./blocks";
import { CatalogueView, NextPageNav } from "./views";
import { PageNavType } from "./views/NextPageNav.view";
import TableBlock from "./blocks/tableBlock/TableBlock.view";
import { Theme } from "./theme";

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
      const text = raw.replace(/ *```|```$/g, "");
      let [language, title] = (text.match(/^.+?\n/g) ?? ["text"])[0].replace("```", "").trim().split("[");
      if (title) {
        title = title.replace("]", "");
      }
      return {
        language,
        title
      };
    }
  },
  view: AdvantageBlock
});
addBlockRule({
  name: "Heading",
  rule: "default",
  view: HeadingBlock
});
addBlockRule({
  name: "Table",
  rule: "default",
  view: TableBlock
});
interface DlightDocProps {
  title: string;
  isShowCatalogue: boolean;
  content: ContentProp<string>;
  nextPageNav: PageNavType;
  prePageNav: PageNavType;
  themeType: "light" | "dark";
}
class DlightDoc extends View implements DlightDocProps {
  constructor() {
    super();
    this.closeCatalogue = this.closeCatalogue.bind(this);
    this.closeCatalogueWhenClickNext = this.closeCatalogueWhenClickNext.bind(this);
    this.updateCatalogueIndex = this.updateCatalogueIndex.bind(this);
    this.handleScroll = this.handleScroll.bind(this);
    this.scrollToTop = this.scrollToTop.bind(this);
    this.handleWindowResize = this.handleWindowResize.bind(this);
  }
  $e$path;
  $path: any;
  $$path = 1;
  $s$path = ["pathWatcher"];
  get path() {
    return this.$path;
  }
  set path(value) {
    this._$updateProp("path", value);
  }
  $e$themeType;
  $themeType: "light" | "dark" = "light";
  $$themeType = 2;
  $s$themeType = ["theme", "dlightDocTitleCss", "dlightContentWrap", "fixCatalogueCss", "dlightMarkitDivider$"];
  get themeType() {
    return this.$themeType;
  }
  set themeType(value) {
    this._$updateProp("themeType", value);
  }
  $p$content;
  _$contentKey = "content";
  $content: any = required;
  $$content = 4;
  $s$content = ["watchContent"];
  get content() {
    return this.$content;
  }
  set content(value) {
    this._$updateProp("content", value);
  }
  $p$title;
  $title = required;
  $$title = 8;
  get title() {
    return this.$title;
  }
  set title(value) {
    this._$updateProp("title", value);
  }
  $p$isShowCatalogue;
  $isShowCatalogue = required;
  $$isShowCatalogue = 16;
  $s$isShowCatalogue = ["fixCatalogueCss"];
  get isShowCatalogue() {
    return this.$isShowCatalogue;
  }
  set isShowCatalogue(value) {
    this._$updateProp("isShowCatalogue", value);
  }
  $p$nextPageNav;
  $nextPageNav = required;
  $$nextPageNav = 32;
  get nextPageNav() {
    return this.$nextPageNav;
  }
  set nextPageNav(value) {
    this._$updateProp("nextPageNav", value);
  }
  $p$prePageNav;
  $prePageNav = required;
  $$prePageNav = 64;
  get prePageNav() {
    return this.$prePageNav;
  }
  set prePageNav(value) {
    this._$updateProp("prePageNav", value);
  }
  $docAst: any = [];
  $$docAst = 128;
  get docAst() {
    return this.$docAst;
  }
  set docAst(value) {
    this._$updateProp("docAst", value);
  }
  $catalogueIndex = 0;
  $$catalogueIndex = 256;
  get catalogueIndex() {
    return this.$catalogueIndex;
  }
  set catalogueIndex(value) {
    this._$updateProp("catalogueIndex", value);
  }
  $markitViewEl: any;
  $$markitViewEl = 512;
  $s$markitViewEl = ["pathWatcher"];
  get markitViewEl() {
    return this.$markitViewEl;
  }
  set markitViewEl(value) {
    this._$updateProp("markitViewEl", value);
  }
  $catalogueEl: any;
  $$catalogueEl = 1024;
  get catalogueEl() {
    return this.$catalogueEl;
  }
  set catalogueEl(value) {
    this._$updateProp("catalogueEl", value);
  }
  $isShowCatalogueInner = window.innerWidth > 1135;
  $$isShowCatalogueInner = 2048;
  $s$isShowCatalogueInner = ["fixCatalogueCss"];
  get isShowCatalogueInner() {
    return this.$isShowCatalogueInner;
  }
  set isShowCatalogueInner(value) {
    this._$updateProp("isShowCatalogueInner", value);
  }
  firstRender = true;
  $theme;
  $$theme = 8192;
  $s$theme = ["dlightDocTitleCss", "dlightContentWrap", "fixCatalogueCss", "dlightMarkitDivider$"];
  get theme() {
    return this.$theme;
  }
  set theme(value) {
    this._$updateProp("theme", value);
  }
  get $f$theme() {
    return Theme[this.themeType];
  }
  closeCatalogue(e: any) {
    if (e.target !== this.catalogueEl && this.isShowCatalogue) {
      this.isShowCatalogue = false;
    }
  }
  closeCatalogueWhenClickNext() {
    this.isShowCatalogue = false;
  }
  willMount() {
    document.addEventListener("click", this.closeCatalogue.bind(this), {
      capture: true
    });
  }
  preAst;
  $getAst = (ast: any) => {
    this.docAst = ast;
    console.log(ast, "ast", this.preAst === ast, this.preAst);
    this.preAst = ast;
  };
  $$getAst = 32768;
  get getAst() {
    return this.$getAst;
  }
  set getAst(value) {
    this._$updateProp("getAst", value);
  }
  updateCatalogueIndex(index: number) {
    this.catalogueIndex = index;
  }
  $w$watchContent;
  watchContent() {
    console.log(this.content, "content");
  }
  $w$pathWatcher;
  pathWatcher() {
    if (this.path) {
      this.markitViewEl?.scrollTo({
        top: 0
      });
      setTimeout(() => {
        this.catalogueIndex = 0;
      }, 100);
    }
  }
  catalogueOpenStatusWatcher() {
    if (this.isShowCatalogue && this.firstRender) {
      this.isShowCatalogue = false;
      this.firstRender = false;
    }
  }
  handleScroll() {
    this.docAst.filter(paragraph => paragraph.type === "Heading").forEach((item, index) => {
      if (index === this.catalogueIndex + 1) {
        const el = document.getElementById(item.content[0].content);
        const fromTop = el?.getBoundingClientRect().top ?? 0;
        if (fromTop < 0) {
          this.catalogueIndex += 1;
        }
      } else if (index === this.catalogueIndex - 1) {
        const el = document.getElementById(item.content[0].content);
        const fromTop = el?.getBoundingClientRect().top ?? 0;
        if (fromTop > -10) {
          this.catalogueIndex -= 1;
        }
      }
    });
  }
  scrollToTop(e) {
    e.stopPropagation();
    this.markitViewEl?.scrollTo({
      top: 0
    });
    this.catalogueIndex = 0;
  }
  handleWindowResize() {
    if (window.innerWidth < 1140) {
      this.isShowCatalogueInner = false;
    } else {
      this.isShowCatalogueInner = true;
    }
  }
  didMount() {
    this.markitViewEl.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleWindowResize);
  }
  willUnmount() {
    this.markitViewEl.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleWindowResize);
    document.removeEventListener("click", this.closeCatalogue.bind(this));
  }
  View() {
    let $n0 = null,
      $n1 = null,
      $n2 = null,
      $n3 = null,
      $n4 = null,
      $n5 = null,
      $n6 = null;
    this._$update = changed => {
      if (changed & 4) {
        $n5 && $n5._$setContent(this.content ?? "");
      }
      if (changed & 8) {
        $n3 && $4$($n3, "textContent", this.title);
      }
      if (changed & 32) {
        $n6 && $n6._$setProp("nextPage", this.nextPageNav);
      }
      if (changed & 64) {
        $n6 && $n6._$setProp("prePage", this.prePageNav);
      }
      if (changed & 512) {
        if ($n1) if (typeof this.markitViewEl === "function") this.markitViewEl($n1);else this.markitViewEl = $n1;
      }
      if (changed & 2064) {
        $n4 && $n4.updateCond();
      }
      if (changed & 8194) {
        $n0 && $n0.updateEnv("theme", this.theme);
      }
      if (changed & 32768) {
        $n5 && $n5._$setProp("getAst", this.getAst);
      }
      if (changed & 139266) {
        $n3 && $4$($n3, "className", this.dlightDocTitleCss);
      }
      if (changed & 270338) {
        $n2 && $4$($n2, "className", this.dlightContentWrap);
      }
      if (changed & 524288) {
        $n1 && $4$($n1, "className", this.dlightDocWrap);
      }
      $n4 && $n4.update(changed);
    };
    $n0 = new $12$({
      theme: this.theme
    });
    $n1 = DlightDoc.$t0();
    $n2 = $n1.firstChild;
    $n3 = $n2.firstChild;
    if (typeof this.markitViewEl === "function") this.markitViewEl($n1);else this.markitViewEl = $n1;
    $4$($n1, "className", this.dlightDocWrap);
    $4$($n2, "className", this.dlightContentWrap);
    $4$($n3, "className", this.dlightDocTitleCss);
    $4$($n3, "textContent", this.title);
    $n4 = new $11$(2064);
    $n4.addCondFunc($thisCond => {
      if (this.isShowCatalogueInner || this.isShowCatalogue) {
        if ($thisCond.cond === 0) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 0;
        let $n0 = null,
          $n1 = null,
          $n2 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 128) {
            $n2 && $n2._$setContent(this.docAst.filter(paragraph => paragraph.type === "Heading"));
          }
          if (changed & 256) {
            $n2 && $n2._$setProp("currentIndex", this.catalogueIndex);
          }
          if (changed & 1024) {
            if ($n1) if (typeof this.catalogueEl === "function") this.catalogueEl($n1);else this.catalogueEl = $n1;
          }
          if (changed & 2064) {
            $n2 && $n2._$setProp("isShowShadow", this.isShowCatalogue && !this.isShowCatalogueInner);
          }
          if (changed & 67600) {
            $n0 && $4$($n0, "className", this.isShowCatalogue && !this.isShowCatalogueInner ? "" : this.dlightDocCatalogueWidthCss);
          }
          if (changed & 1058834) {
            $n1 && $4$($n1, "className", this.fixCatalogueCss);
          }
        };
        $n0 = DlightDoc.$t1();
        $n1 = $n0.firstChild;
        $4$($n0, "className", this.isShowCatalogue && !this.isShowCatalogueInner ? "" : this.dlightDocCatalogueWidthCss);
        if (typeof this.catalogueEl === "function") this.catalogueEl($n1);else this.catalogueEl = $n1;
        $4$($n1, "className", this.fixCatalogueCss);
        $n2 = new CatalogueView();
        $n2._$init({
          scrollToTop: this.scrollToTop,
          isShowShadow: this.isShowCatalogue && !this.isShowCatalogueInner,
          updateCurrentIndex: this.updateCatalogueIndex,
          currentIndex: this.catalogueIndex
        }, this.docAst.filter(paragraph => paragraph.type === "Heading"), null, null);
        $8$($n1, $n2, 0);
        return $thisCond.cond === 0 ? [$n0] : $thisCond.updateCond();
      } else {
        if ($thisCond.cond === 1) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 1;
        $thisCond.updateFunc = changed => {};
        return $thisCond.cond === 1 ? [] : $thisCond.updateCond();
      }
    });
    $8$($n1, $n4, 1);
    $n5 = new MarkitView();
    $n5._$init({
      getAst: this.getAst
    }, this.content ?? "", null, null);
    $8$($n2, $n5, 1);
    $n6 = new NextPageNav();
    $n6._$init({
      prePage: this.prePageNav,
      nextPage: this.nextPageNav
    }, null, null, null);
    $8$($n2, $n6, 2);
    $n0.initNodes([$n1]);
    return [$n0];
  }

  /** @style */
  $dlightDocCatalogueWidthCss = "easy-css-21aa9m";
  $$dlightDocCatalogueWidthCss = 65536;
  get dlightDocCatalogueWidthCss() {
    return this.$dlightDocCatalogueWidthCss;
  }
  set dlightDocCatalogueWidthCss(value) {
    this._$updateProp("dlightDocCatalogueWidthCss", value);
  }
  $dlightDocTitleCss;
  $$dlightDocTitleCss = 131072;
  get dlightDocTitleCss() {
    return this.$dlightDocTitleCss;
  }
  set dlightDocTitleCss(value) {
    this._$updateProp("dlightDocTitleCss", value);
  }
  get $f$dlightDocTitleCss() {
    return css.collect(`
    font-size: 2.5rem;
    font-weight: 500;
    margin-bottom: 20px;
    margin-top: 0;
    color: ${this.theme.primaryText};
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `, "dlight-doc-title-css", "src/DlightDoc.view.ts");
  }
  $dlightContentWrap;
  $$dlightContentWrap = 262144;
  get dlightContentWrap() {
    return this.$dlightContentWrap;
  }
  set dlightContentWrap(value) {
    this._$updateProp("dlightContentWrap", value);
  }
  get $f$dlightContentWrap() {
    return css.collect(`
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
    .dlight-markit-code-block {
      background-color: ${this.theme.codeBg};
      color: ${this.theme.codeText};
    }
    .dlight-markit-code-block-header {
      background-color: ${this.theme.codeBlockHeader};
      color: ${this.theme.codeText};
    }
  `, "dlight-content-wrap", "src/DlightDoc.view.ts");
  }
  $dlightDocWrap = "easy-css-asd7tg";
  $$dlightDocWrap = 524288;
  get dlightDocWrap() {
    return this.$dlightDocWrap;
  }
  set dlightDocWrap(value) {
    this._$updateProp("dlightDocWrap", value);
  }
  $fixCatalogueCss;
  $$fixCatalogueCss = 1048576;
  get fixCatalogueCss() {
    return this.$fixCatalogueCss;
  }
  set fixCatalogueCss(value) {
    this._$updateProp("fixCatalogueCss", value);
  }
  get $f$fixCatalogueCss() {
    return css.collect(`
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
  `, "fix-catalogue-css", "src/DlightDoc.view.ts");
  }
  dlightMarkitDivider$;
  get $f$dlightMarkitDivider$() {
    return css.collect(`
    border-width: 0 ;
    height: 1px;
    width: 100%;
    background-color: ${this.theme.divider};
    margin: 40px 0;
  `, "dlight-markit-divider$", "src/DlightDoc.view.ts");
  }
  static $t0 = $0$("<div><div><div></div></div></div>");
  static $t1 = $0$("<div><div></div></div>");
}
export default ((DlightDoc as Pretty) as Typed<DlightDocProps>);