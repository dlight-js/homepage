import { preParseEasyStore as preParseEasyStore_61mt6g } from "@iandx/easy-css";
(() => {
  preParseEasyStore_61mt6g({
    styleList: [".easy-css-7qoeg{width:50%;display:flex;flex-direction:row;align-items:center;justify-content:flex-start;cursor:pointer;}", ".easy-css-101fg{width:50%;display:flex;flex-direction:row;align-items:center;justify-content:flex-end;cursor:pointer;}"],
    nameHashStore: {
      "c28b23b6-0000-4000-8000-000000000000": "easy-css-7qoeg",
      "56719bd6-0000-4000-8000-000000000000": "easy-css-101fg"
    },
    styleHashStore: {}
  }, "src/views/NextPageNav.view.ts");
})();
import { createTemplate as $0$, setStyle as $1$, setDataset as $2$, setEvent as $3$, setHTMLProp as $4$, setHTMLAttr as $5$, setHTMLProps as $6$, setHTMLAttrs as $7$, insertNode as $8$, createElement as $9$, ForNode as $10$, CondNode as $11$, EnvNode as $12$, createTextNode as $13$, updateText as $14$, ExpNode as $15$, PropView as $16$, SubViewNode as $17$ } from "@dlightjs/dlight";
import { toHyphenatedCase as toHyphenatedCase_61mt6g } from "@iandx/easy-css";
import { View } from "@dlightjs/dlight";
import { type Typed, div, Pretty, Env, Prop, required } from "@dlightjs/types";
import { css } from "@iandx/easy-css";
import { KeyboardArrowLeftFilled, KeyboardArrowRightFilled } from "@dlightjs/material-icons";
import clsx from "clsx";
export interface PageNavType {
  name: string;
  zhName: string;
  path: string;
}
interface NextPageNavProps {
  nextPage: PageNavType;
  prePage: PageNavType;
}
class NextPageNav extends View implements NextPageNavProps {
  $e$navigator;
  $navigator: any = required;
  $$navigator = 1;
  get navigator() {
    return this.$navigator;
  }
  set navigator(value) {
    this._$updateProp("navigator", value);
  }
  $e$theme;
  $theme: any = required;
  $$theme = 2;
  $s$theme = ["pageNavTextBtnCss", "nextPageNavTextBtnCss"];
  get theme() {
    return this.$theme;
  }
  set theme(value) {
    this._$updateProp("theme", value);
  }
  $e$i18n;
  $i18n: any = required;
  $$i18n = 4;
  get i18n() {
    return this.$i18n;
  }
  set i18n(value) {
    this._$updateProp("i18n", value);
  }
  $p$nextPage;
  $nextPage = required;
  $$nextPage = 8;
  $s$nextPage = ["nextPageNavWrapCss"];
  get nextPage() {
    return this.$nextPage;
  }
  set nextPage(value) {
    this._$updateProp("nextPage", value);
  }
  $p$prePage;
  $prePage = required;
  $$prePage = 16;
  $s$prePage = ["nextPageNavWrapCss"];
  get prePage() {
    return this.$prePage;
  }
  set prePage(value) {
    this._$updateProp("prePage", value);
  }
  $hover1 = false;
  $$hover1 = 32;
  $s$hover1 = ["pageNavTextBtnCss"];
  get hover1() {
    return this.$hover1;
  }
  set hover1(value) {
    this._$updateProp("hover1", value);
  }
  $hover2 = false;
  $$hover2 = 64;
  $s$hover2 = ["nextPageNavTextBtnCss"];
  get hover2() {
    return this.$hover2;
  }
  set hover2(value) {
    this._$updateProp("hover2", value);
  }
  View() {
    let $n0 = null,
      $n1 = null,
      $n2 = null;
    this._$update = changed => {
      if (changed & 8) {
        $n2 && $n2.updateCond();
      }
      if (changed & 16) {
        $n1 && $n1.updateCond();
      }
      if (changed & 1048) {
        $n0 && $4$($n0, "className", this.nextPageNavWrapCss);
      }
      $n1 && $n1.update(changed);
      $n2 && $n2.update(changed);
    };
    $n0 = $9$("div");
    $4$($n0, "className", this.nextPageNavWrapCss);
    $n1 = new $11$(16);
    $n1.addCondFunc($thisCond => {
      if (this.prePage) {
        if ($thisCond.cond === 0) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 0;
        let $n0 = null,
          $n1 = null,
          $n2 = null,
          $n3 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 17) {
            $n0 && $3$($n0, "click", () => {
              this.hover1 = false;
              this.navigator.to(this.prePage.path);
            });
          }
          if (changed & 20) {
            $n2 && $4$($n2, "textContent", this.i18n(this.prePage.name, this.prePage.zhName));
          }
          if (changed & 34) {
            $n0 && $1$($n0, {
              color: this.hover1 ? "#daa172" : this.theme.primaryText
            });
            $n3 && $n3._$setProp("color", this.hover1 ? "#daa172" : this.theme.primaryText);
          }
          if (changed & 128) {
            $n1 && $4$($n1, "className", this.iconCss("prev"));
          }
          if (changed & 2048) {
            $n0 && $4$($n0, "className", this.prePageBtnCss);
          }
        };
        $n0 = NextPageNav.$t0();
        $n1 = $n0.firstChild;
        $n2 = $n1.nextSibling.firstChild;
        $n0.addEventListener("mouseleave", () => {
          this.hover1 = false;
        });
        $n0.addEventListener("mouseenter", () => {
          this.hover1 = true;
        });
        $3$($n0, "click", () => {
          this.hover1 = false;
          this.navigator.to(this.prePage.path);
        });
        $1$($n0, {
          color: this.hover1 ? "#daa172" : this.theme.primaryText
        });
        $4$($n0, "className", this.prePageBtnCss);
        $4$($n1, "className", this.iconCss("prev"));
        $4$($n2, "textContent", this.i18n(this.prePage.name, this.prePage.zhName));
        $n3 = new KeyboardArrowLeftFilled();
        $n3._$init({
          color: this.hover1 ? "#daa172" : this.theme.primaryText
        }, null, null, null);
        $8$($n1, $n3, 0);
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
    $8$($n0, $n1, 0);
    $n2 = new $11$(8);
    $n2.addCondFunc($thisCond => {
      if (this.nextPage) {
        if ($thisCond.cond === 0) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 0;
        let $n0 = null,
          $n1 = null,
          $n2 = null,
          $n3 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 9) {
            $n0 && $3$($n0, "click", () => {
              this.hover2 = false;
              this.navigator.to(this.nextPage.path);
            });
          }
          if (changed & 12) {
            $n2 && $4$($n2, "textContent", this.i18n(this.nextPage.name, this.nextPage.zhName));
          }
          if (changed & 66) {
            $n0 && $1$($n0, {
              color: this.hover2 ? "#daa172" : this.theme.primaryText
            });
            $n3 && $n3._$setProp("color", this.hover2 ? "#daa172" : this.theme.primaryText);
          }
          if (changed & 128) {
            $n1 && $4$($n1, "className", this.iconCss("next"));
          }
          if (changed & 4096) {
            $n0 && $4$($n0, "className", this.nextPageBtnCss);
          }
        };
        $n0 = NextPageNav.$t1();
        $n1 = $n0.firstChild.nextSibling;
        $n2 = $n0.firstChild.firstChild;
        $n0.addEventListener("mouseleave", () => {
          this.hover2 = false;
        });
        $n0.addEventListener("mouseover", () => {
          this.hover2 = true;
        });
        $3$($n0, "click", () => {
          this.hover2 = false;
          this.navigator.to(this.nextPage.path);
        });
        $1$($n0, {
          color: this.hover2 ? "#daa172" : this.theme.primaryText
        });
        $4$($n0, "className", this.nextPageBtnCss);
        $4$($n2, "textContent", this.i18n(this.nextPage.name, this.nextPage.zhName));
        $4$($n1, "className", this.iconCss("next"));
        $n3 = new KeyboardArrowRightFilled();
        $n3._$init({
          color: this.hover2 ? "#daa172" : this.theme.primaryText
        }, null, null, null);
        $8$($n1, $n3, 0);
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
    $8$($n0, $n2, 1);
    $n0._$nodes = [$n1, $n2];
    return [$n0];
  }
  $iconCss = (type: string) => css.collect(`
    padding-top: 4px;
    ${type === "next" ? "margin-left: 10px" : "margin-right: 10px"};
  `, `icon-css-${toHyphenatedCase_61mt6g(type)}`, "src/views/NextPageNav.view.ts");
  $$iconCss = 128;
  get iconCss() {
    return this.$iconCss;
  }
  set iconCss(value) {
    this._$updateProp("iconCss", value);
  }
  pageNavTextBtnCss;
  get $f$pageNavTextBtnCss() {
    return css.collect(`
    font-size: 16px;
    display: flex;
    align-items: center;
    border: 1px solid ${this.hover1 ? "#daa172" : this.theme.primaryText};
    border-radius: 10px;
    padding: 10px;
    width: calc(80% - 30px);
    min-height: 40px;
    flex-wrap: wrap;
  `, "page-nav-text-btn-css", "src/views/NextPageNav.view.ts");
  }
  nextPageNavTextBtnCss;
  get $f$nextPageNavTextBtnCss() {
    return css.collect(`
    justify-content: flex-end;
    border: 1px solid ${this.hover2 ? "#daa172" : this.theme.primaryText};
  `, "next-page-nav-text-btn-css", "src/views/NextPageNav.view.ts");
  }
  $nextPageNavWrapCss;
  $$nextPageNavWrapCss = 1024;
  get nextPageNavWrapCss() {
    return this.$nextPageNavWrapCss;
  }
  set nextPageNavWrapCss(value) {
    this._$updateProp("nextPageNavWrapCss", value);
  }
  get $f$nextPageNavWrapCss() {
    return css.collect(`
    display: flex;
    flex-direction: row;
    justify-content: ${this.nextPage && !this.prePage ? "flex-end" : "space-between"};
    margin-top: 30px;
    padding: 40px 0;
    border-top: solid 1px rgb(226 232 240);
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  `, "next-page-nav-wrap-css", "src/views/NextPageNav.view.ts");
  }
  $prePageBtnCss = "easy-css-7qoeg";
  $$prePageBtnCss = 2048;
  get prePageBtnCss() {
    return this.$prePageBtnCss;
  }
  set prePageBtnCss(value) {
    this._$updateProp("prePageBtnCss", value);
  }
  $nextPageBtnCss = "easy-css-101fg";
  $$nextPageBtnCss = 4096;
  get nextPageBtnCss() {
    return this.$nextPageBtnCss;
  }
  set nextPageBtnCss(value) {
    this._$updateProp("nextPageBtnCss", value);
  }
  static $t0 = $0$("<div><div></div><div><div></div></div></div>");
  static $t1 = $0$("<div><div><div></div></div><div></div></div>");
}
export default ((NextPageNav as Pretty) as Typed<NextPageNavProps>);