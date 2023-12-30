import { preParseEasyStore as preParseEasyStore_61mt6g } from "@iandx/easy-css";
(() => {
  preParseEasyStore_61mt6g({
    styleList: [".easy-css-uhejg{margin-left:20px;}", ".easy-css-ob0gg{font-weight:600;}", ".easy-css-tig9g{text-decoration:underline;font-weight:600;}"],
    nameHashStore: {
      "18c97a25-0000-4000-8000-000000000000": "easy-css-uhejg",
      "9814fdac-ffff-4fff-bfff-ffffffffffff": "easy-css-ob0gg",
      "2ee3e145-0000-4000-8000-000000000000": "easy-css-tig9g"
    },
    styleHashStore: {}
  }, "src/views/CatalogueView.view.ts");
})();
import { createTemplate as $0$, setStyle as $1$, setDataset as $2$, setEvent as $3$, setHTMLProp as $4$, setHTMLAttr as $5$, setHTMLProps as $6$, setHTMLAttrs as $7$, insertNode as $8$, createElement as $9$, ForNode as $10$, CondNode as $11$, EnvNode as $12$, createTextNode as $13$, updateText as $14$, ExpNode as $15$, PropView as $16$, SubViewNode as $17$ } from "@dlightjs/dlight";
import { toHyphenatedCase as toHyphenatedCase_61mt6g } from "@iandx/easy-css";
import { View } from "@dlightjs/dlight";
import { a, Content, ContentProp, div, Env, Pretty, Prop, required, Typed } from "@dlightjs/types";
import { InlineRenderer } from "@dlightjs/markit";
import { css } from "@iandx/easy-css";
import clsx from "clsx";
interface CatalogueViewProps {
  content: ContentProp;
  currentIndex: number;
  isShowShadow: boolean;
  updateCurrentIndex: (index: number) => void;
  scrollToTop: (e: any) => void;
}
class CatalogueView extends View implements CatalogueViewProps {
  $e$i18n;
  $i18n: any = required;
  $$i18n = 1;
  get i18n() {
    return this.$i18n;
  }
  set i18n(value) {
    this._$updateProp("i18n", value);
  }
  $e$theme;
  $theme: any = required;
  $$theme = 2;
  $s$theme = ["dlightDocHeadingLinkCss"];
  get theme() {
    return this.$theme;
  }
  set theme(value) {
    this._$updateProp("theme", value);
  }
  $p$content;
  _$contentKey = "content";
  $content: any = required;
  $$content = 4;
  get content() {
    return this.$content;
  }
  set content(value) {
    this._$updateProp("content", value);
  }
  $p$currentIndex;
  $currentIndex = required;
  $$currentIndex = 8;
  $s$currentIndex = ["dlightDocHeadingLinkCss"];
  get currentIndex() {
    return this.$currentIndex;
  }
  set currentIndex(value) {
    this._$updateProp("currentIndex", value);
  }
  $p$isShowShadow;
  $isShowShadow = required;
  $$isShowShadow = 16;
  $s$isShowShadow = ["dlightDocCatalogueWrapCss"];
  get isShowShadow() {
    return this.$isShowShadow;
  }
  set isShowShadow(value) {
    this._$updateProp("isShowShadow", value);
  }
  $p$updateCurrentIndex;
  $updateCurrentIndex = required;
  $$updateCurrentIndex = 32;
  get updateCurrentIndex() {
    return this.$updateCurrentIndex;
  }
  set updateCurrentIndex(value) {
    this._$updateProp("updateCurrentIndex", value);
  }
  $p$scrollToTop;
  $scrollToTop = required;
  $$scrollToTop = 64;
  get scrollToTop() {
    return this.$scrollToTop;
  }
  set scrollToTop(value) {
    this._$updateProp("scrollToTop", value);
  }
  View() {
    let $n0 = null,
      $n1 = null;
    this._$update = changed => {
      if (changed & 1) {
        $n0 && $4$($n0, "textContent", this.i18n("To Top", "置顶"));
      }
      if (changed & 4) {
        $n1 && $n1.updateArray(this.content.entries());
      }
      if (changed & 64) {
        $n0 && $3$($n0, "click", this.scrollToTop);
      }
      if (changed & 266) {
        $n0 && $4$($n0, "className", this.dlightDocHeadingLinkCss(-1));
      }
      $n1 && $n1.update(changed);
    };
    $n0 = $9$("div");
    $3$($n0, "click", this.scrollToTop);
    $4$($n0, "className", this.dlightDocHeadingLinkCss(-1));
    $1$($n0, {
      textDecoration: "underline",
      fontWeight: 600,
      cursor: "pointer",
      width: "max-content"
    });
    $4$($n0, "textContent", this.i18n("To Top", "置顶"));
    $n1 = new $10$(this.content.entries(), 4);
    $n1.addNodeFunc(([index, heading], $updateArr, $idx) => {
      let $n0 = null;
      $updateArr[$idx] = (changed, [index, heading]) => {
        if (changed & 4) {
          $n0 && $n0.updateArray(heading.content);
        }
        $n0 && $n0.update(changed);
      };
      $n0 = new $10$(heading.content, 4);
      $n0.addNodeFunc((item, $updateArr, $idx) => {
        let $n0 = null,
          $n1 = null,
          $n2 = null;
        $updateArr[$idx] = (changed, item) => {
          if (changed & 4) {
            $n0 && $4$($n0, "href", `#${item.content}`);
            $n2 && $n2.update();
          }
          if (changed & 32) {
            $n0 && $3$($n0, "click", e => {
              e.stopPropagation();
              this.updateCurrentIndex(index);
            });
          }
          if (changed & 1802) {
            $n0 && $4$($n0, "className", clsx(this.dlightDocHeadingLinkCss(index), heading.props.headingLevel > 1 ? this.dlightDocSecondaryHeadCss : this.dlightDocPrimaryHeadCss));
          }
          $n1 && $n1.update(changed);
        };
        $n0 = $9$("a");
        $4$($n0, "className", clsx(this.dlightDocHeadingLinkCss(index), heading.props.headingLevel > 1 ? this.dlightDocSecondaryHeadCss : this.dlightDocPrimaryHeadCss));
        $3$($n0, "click", e => {
          e.stopPropagation();
          this.updateCurrentIndex(index);
        });
        $4$($n0, "href", `#${item.content}`);
        $n1 = new $16$($addUpdate => {
          let $n0 = null;
          $addUpdate(changed => {
            if (changed & 4) {
              $n0 && $n0._$setContent(item.content);
              $n0 && $n0._$setProp("props", item.props);
            }
          });
          $n0 = new InlineRenderer[item.type]();
          $n0._$init({
            props: item.props
          }, item.content, null, null);
          return [$n0];
        });
        $n2 = new $15$(() => $n1);
        $8$($n0, $n2, 0);
        $n0._$nodes = [$n2];
        return [$n0];
      });
      return [$n0];
    });
    return [$n0, $n1];
  }

  /** @style */
  dlightDocCatalogueWrapCss;
  get $f$dlightDocCatalogueWrapCss() {
    return css.collect(`
      right: 0;
      position: fixed;
      width: 248px;
      max-width: 248px;
      padding-bottom: 25px;
      padding-right: 20px;
      background-color: white;
      padding-top: ${this.isShowShadow ? "30px" : "0"};
      box-shadow: ${this.isShowShadow ? "0 2px 8px 0 #A9A9A9" : ""};
    `, "dlight-doc-catalogue-wrap-css", "src/views/CatalogueView.view.ts");
  }
  $dlightDocHeadingLinkCss;
  $$dlightDocHeadingLinkCss = 256;
  get dlightDocHeadingLinkCss() {
    return this.$dlightDocHeadingLinkCss;
  }
  set dlightDocHeadingLinkCss(value) {
    this._$updateProp("dlightDocHeadingLinkCss", value);
  }
  get $f$dlightDocHeadingLinkCss() {
    return (index: number) => css.collect(`
    display: block;
    text-decoration: none;
    font-size: 0.875rem;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    line-height: 1.75rem;
    padding-left: 20px;
    color: ${index === this.currentIndex ? "#daa172" : this.theme.primaryText};
    border-left: ${index === this.currentIndex ? "solid 2px #daa172" : undefined};
    width: calc(100% - 30px);
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  `, `dlight-doc-heading-link-css-${toHyphenatedCase_61mt6g(index)}`, "src/views/CatalogueView.view.ts");
  }
  $dlightDocSecondaryHeadCss = "easy-css-uhejg";
  $$dlightDocSecondaryHeadCss = 512;
  get dlightDocSecondaryHeadCss() {
    return this.$dlightDocSecondaryHeadCss;
  }
  set dlightDocSecondaryHeadCss(value) {
    this._$updateProp("dlightDocSecondaryHeadCss", value);
  }
  $dlightDocPrimaryHeadCss = "easy-css-ob0gg";
  $$dlightDocPrimaryHeadCss = 1024;
  get dlightDocPrimaryHeadCss() {
    return this.$dlightDocPrimaryHeadCss;
  }
  set dlightDocPrimaryHeadCss(value) {
    this._$updateProp("dlightDocPrimaryHeadCss", value);
  }
  dligthDocToTopCss = "easy-css-tig9g";
}
export default ((CatalogueView as Pretty) as Typed<CatalogueViewProps>);