import { preParseEasyStore as preParseEasyStore_61mt6g } from "@iandx/easy-css";
(() => {
  preParseEasyStore_61mt6g({
    styleList: [".easy-css-u5jag{position:absolute;right:10px;top:5px;color:#999999;}", ".dlight-markit-code-block-header{background-color:rgba(250,190,142,0.3);padding:8px 16px;border-radius:12px 12px 0 0;color:#333333;font-family:system-ui;font-size:14px;display:flex;flex-direction:row;justify-content:space-between;align-items:center;}", ".easy-css-vvirg{display:flex;flex-direction:row;align-items:center;}", ".easy-css-8bfog{font-weight:500;margin-right:10px;font-size:16px;margin-left:10px;}", ".easy-css-oiehg{display:flex;flex-direction:row;align-items:center;cursor:pointer;}", ".dlight-markit-code-block{background-color:rgba(242,214,159,0.3);border-radius:12px;font-size:15px;margin:10px 0;}", ".easy-css-4gpmg{display:flex;flex-direction:row;justify-content:space-between;padding:10px 16px;font-size:95%;overflow-x:auto;}", ".easy-css-ge9ng{font-family:ui-monospace,SFMono-Regular,Menlo,Monaco,Consolas,Liberation Mono,Courier New,monospace;line-height:1.25rem;}", ".easy-css-ohd4g{width:30px;height:20px;display:flex;align-items:center;justify-content:center;}"],
    nameHashStore: {
      "55b9e658-ffff-4fff-bfff-ffffffffffff": "easy-css-u5jag",
      "e1438388-ffff-4fff-bfff-ffffffffffff": "easy-css-vvirg",
      "ecd2cbfa-ffff-4fff-bfff-ffffffffffff": "easy-css-8bfog",
      "4694671c-ffff-4fff-bfff-ffffffffffff": "easy-css-oiehg",
      "8068df8b-ffff-4fff-bfff-ffffffffffff": "easy-css-4gpmg",
      "fa0b3f14-0000-4000-8000-000000000000": "easy-css-ge9ng",
      "a469ce76-0000-4000-8000-000000000000": "easy-css-ohd4g"
    },
    styleHashStore: {}
  }, "src/blocks/advantageBlock/AdvantageBlock.view.ts");
})();
import { createTemplate as $0$, setStyle as $1$, setDataset as $2$, setEvent as $3$, setHTMLProp as $4$, setHTMLAttr as $5$, setHTMLProps as $6$, setHTMLAttrs as $7$, insertNode as $8$, createElement as $9$, ForNode as $10$, CondNode as $11$, EnvNode as $12$, createTextNode as $13$, updateText as $14$, ExpNode as $15$, PropView as $16$, SubViewNode as $17$ } from "@dlightjs/dlight";
import { toHyphenatedCase as toHyphenatedCase_61mt6g } from "@iandx/easy-css";
import { View } from "@dlightjs/dlight";
import { code, Content, ContentProp, div, pre, Prop, required, Pretty, Typed } from "@dlightjs/types";
import { css } from "@iandx/easy-css";
import hljs from "highlight.js";
import { ContentCopyFilled, DoneFilled } from "@dlightjs/material-icons";
interface AdvantageBlockProps {
  content: ContentProp<any>;
  props: any;
}
class AdvantageBlock extends View implements AdvantageBlockProps {
  constructor() {
    super();
    this.handleCopy = this.handleCopy.bind(this);
  }
  $p$content;
  _$contentKey = "content";
  $content: any = required;
  $$content = 1;
  $s$content = ["highlightedCode"];
  get content() {
    return this.$content;
  }
  set content(value) {
    this._$updateProp("content", value);
  }
  $p$props;
  $props = required;
  $$props = 2;
  $s$props = ["language", "title", "highlightedCode"];
  get props() {
    return this.$props;
  }
  set props(value) {
    this._$updateProp("props", value);
  }
  $language;
  $$language = 4;
  $s$language = ["highlightedCode"];
  get language() {
    return this.$language;
  }
  set language(value) {
    this._$updateProp("language", value);
  }
  get $f$language() {
    return this.props.language;
  }
  $title;
  $$title = 8;
  get title() {
    return this.$title;
  }
  set title(value) {
    this._$updateProp("title", value);
  }
  get $f$title() {
    return this.props.title;
  }
  $highlightedCode;
  $$highlightedCode = 16;
  get highlightedCode() {
    return this.$highlightedCode;
  }
  set highlightedCode(value) {
    this._$updateProp("highlightedCode", value);
  }
  get $f$highlightedCode() {
    return hljs.highlight(this.content, {
      language: this.language.trim() === "codeTabs" ? "js" : this.language.trim()
    }).value;
  }
  $hasCopied = false;
  $$hasCopied = 32;
  get hasCopied() {
    return this.$hasCopied;
  }
  set hasCopied(value) {
    this._$updateProp("hasCopied", value);
  }
  async handleCopy() {
    await navigator.clipboard.writeText(this.content);
    this.hasCopied = true;
    setTimeout(() => {
      this.hasCopied = false;
    }, 2000);
  }
  View() {
    let $n0 = null,
      $n1 = null,
      $n2 = null,
      $n3 = null,
      $n4 = null,
      $n5 = null,
      $n6 = null,
      $n7 = null,
      $n8 = null;
    this._$update = changed => {
      if (changed & 6) {
        $n4 && $4$($n4, "textContent", this.language);
        $n7 && $n7.updateCond();
      }
      if (changed & 23) {
        $n6 && $4$($n6, "innerHTML", this.highlightedCode);
      }
      if (changed & 32) {
        $n8 && $n8.updateCond();
      }
      if (changed & 64) {
        $n4 && $4$($n4, "className", this.languageCss);
      }
      if (changed & 128) {
        $n1 && $4$($n1, "className", this.dlightMarkitCodeBlockHeader$);
      }
      if (changed & 2048) {
        $n0 && $4$($n0, "className", this.dlightMarkitCodeBlock$);
      }
      if (changed & 4096) {
        $n5 && $4$($n5, "className", this.dlightHomepageMarkitCode);
      }
      if (changed & 8192) {
        $n6 && $4$($n6, "className", this.code);
      }
      $n7 && $n7.update(changed);
      $n8 && $n8.update(changed);
    };
    $n0 = AdvantageBlock.$t0();
    $n1 = $n0.firstChild;
    $n2 = $n1.nextSibling;
    $n3 = $n1.firstChild;
    $n4 = $n2.firstChild;
    $n5 = $n2.firstChild.nextSibling;
    $n6 = $n5.firstChild.firstChild;
    $4$($n0, "className", this.dlightMarkitCodeBlock$);
    $4$($n1, "className", this.dlightMarkitCodeBlockHeader$);
    $1$($n2, {
      position: "relative"
    });
    $4$($n4, "className", this.languageCss);
    $4$($n4, "textContent", this.language);
    $4$($n5, "className", this.dlightHomepageMarkitCode);
    $4$($n6, "innerHTML", this.highlightedCode);
    $4$($n6, "className", this.code);
    $n7 = new $11$(6);
    $n7.addCondFunc($thisCond => {
      if (this.language) {
        if ($thisCond.cond === 0) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 0;
        let $n0 = null,
          $n1 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 10) {
            $n1 && $n1.updateCond();
          }
          if (changed & 256) {
            $n0 && $4$($n0, "className", this.dlightMarkitCodeBlockTitleLanguage);
          }
          $n1 && $n1.update(changed);
        };
        $n0 = $9$("div");
        $4$($n0, "className", this.dlightMarkitCodeBlockTitleLanguage);
        $n1 = new $11$(10);
        $n1.addCondFunc($thisCond => {
          if (this.title) {
            if ($thisCond.cond === 0) {
              $thisCond.didntChange = true;
              return [];
            }
            $thisCond.cond = 0;
            let $n0 = null;
            $thisCond.updateFunc = changed => {
              if (changed & 10) {
                $n0 && $4$($n0, "textContent", this.title);
              }
              if (changed & 512) {
                $n0 && $4$($n0, "className", this.dlightMarkitCodeBlockTitle);
              }
            };
            $n0 = $9$("div");
            $4$($n0, "className", this.dlightMarkitCodeBlockTitle);
            $4$($n0, "textContent", this.title);
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
        $n0._$nodes = [$n1];
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
    $8$($n1, $n7, 0);
    $n8 = new $11$(32);
    $n8.addCondFunc($thisCond => {
      if (!this.hasCopied) {
        if ($thisCond.cond === 0) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 0;
        let $n0 = null,
          $n1 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 1024) {
            $n0 && $4$($n0, "className", this.dlightMarkitCopyBtnCss);
          }
          if (changed & 16384) {
            $n1 && $n1._$setProp("class", this.copyIcon);
          }
        };
        $n0 = AdvantageBlock.$t2();
        $4$($n0, "className", this.dlightMarkitCopyBtnCss);
        $n0.addEventListener("click", async () => {
          await this.handleCopy();
        });
        $n1 = new ContentCopyFilled();
        $n1._$init({
          class: this.copyIcon,
          height: 18,
          width: 18,
          color: "#333333"
        }, null, null, null);
        $8$($n0, $n1, 0);
        return $thisCond.cond === 0 ? [$n0] : $thisCond.updateCond();
      } else if (this.hasCopied) {
        if ($thisCond.cond === 1) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 1;
        let $n0 = null,
          $n1 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 1024) {
            $n0 && $4$($n0, "className", this.dlightMarkitCopyBtnCss);
          }
          if (changed & 16384) {
            $n1 && $n1._$setProp("class", this.copyIcon);
          }
        };
        $n0 = AdvantageBlock.$t1();
        $4$($n0, "className", this.dlightMarkitCopyBtnCss);
        $n1 = new DoneFilled();
        $n1._$init({
          class: this.copyIcon,
          height: 18,
          width: 18,
          color: "#333333"
        }, null, null, null);
        $8$($n0, $n1, 0);
        return $thisCond.cond === 1 ? [$n0] : $thisCond.updateCond();
      } else {
        if ($thisCond.cond === 2) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 2;
        $thisCond.updateFunc = changed => {};
        return $thisCond.cond === 2 ? [] : $thisCond.updateCond();
      }
    });
    $8$($n3, $n8, 0);
    return [$n0];
  }
  $languageCss = "easy-css-u5jag";

  /** @style */
  $$languageCss = 64;
  get languageCss() {
    return this.$languageCss;
  }
  set languageCss(value) {
    this._$updateProp("languageCss", value);
  }
  $dlightMarkitCodeBlockHeader$ = "dlight-markit-code-block-header";
  $$dlightMarkitCodeBlockHeader$ = 128;
  get dlightMarkitCodeBlockHeader$() {
    return this.$dlightMarkitCodeBlockHeader$;
  }
  set dlightMarkitCodeBlockHeader$(value) {
    this._$updateProp("dlightMarkitCodeBlockHeader$", value);
  }
  $dlightMarkitCodeBlockTitleLanguage = "easy-css-vvirg";
  $$dlightMarkitCodeBlockTitleLanguage = 256;
  get dlightMarkitCodeBlockTitleLanguage() {
    return this.$dlightMarkitCodeBlockTitleLanguage;
  }
  set dlightMarkitCodeBlockTitleLanguage(value) {
    this._$updateProp("dlightMarkitCodeBlockTitleLanguage", value);
  }
  $dlightMarkitCodeBlockTitle = "easy-css-8bfog";
  $$dlightMarkitCodeBlockTitle = 512;
  get dlightMarkitCodeBlockTitle() {
    return this.$dlightMarkitCodeBlockTitle;
  }
  set dlightMarkitCodeBlockTitle(value) {
    this._$updateProp("dlightMarkitCodeBlockTitle", value);
  }
  $dlightMarkitCopyBtnCss = "easy-css-oiehg";
  $$dlightMarkitCopyBtnCss = 1024;
  get dlightMarkitCopyBtnCss() {
    return this.$dlightMarkitCopyBtnCss;
  }
  set dlightMarkitCopyBtnCss(value) {
    this._$updateProp("dlightMarkitCopyBtnCss", value);
  }
  $dlightMarkitCodeBlock$ = "dlight-markit-code-block";
  $$dlightMarkitCodeBlock$ = 2048;
  get dlightMarkitCodeBlock$() {
    return this.$dlightMarkitCodeBlock$;
  }
  set dlightMarkitCodeBlock$(value) {
    this._$updateProp("dlightMarkitCodeBlock$", value);
  }
  $dlightHomepageMarkitCode = "easy-css-4gpmg";
  $$dlightHomepageMarkitCode = 4096;
  get dlightHomepageMarkitCode() {
    return this.$dlightHomepageMarkitCode;
  }
  set dlightHomepageMarkitCode(value) {
    this._$updateProp("dlightHomepageMarkitCode", value);
  }
  $code = "easy-css-ge9ng";
  $$code = 8192;
  get code() {
    return this.$code;
  }
  set code(value) {
    this._$updateProp("code", value);
  }
  $copyIcon = "easy-css-ohd4g";
  $$copyIcon = 16384;
  get copyIcon() {
    return this.$copyIcon;
  }
  set copyIcon(value) {
    this._$updateProp("copyIcon", value);
  }
  static $t0 = $0$("<div><div><div></div></div><div><div></div><div><pre><code></code></pre></div></div></div>");
  static $t1 = $0$("<div><div>Copied</div></div>");
  static $t2 = $0$("<div><div>Copy</div></div>");
}
export default ((AdvantageBlock as Pretty) as Typed<AdvantageBlockProps>);