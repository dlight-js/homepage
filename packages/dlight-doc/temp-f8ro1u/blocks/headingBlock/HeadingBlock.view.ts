import { preParseEasyStore as preParseEasyStore_61mt6g } from "@iandx/easy-css";
(() => {
  preParseEasyStore_61mt6g({
    styleList: [".easy-css-phgdg{}", ".easy-css-is62g{height:1px;width:90%;margin-top:-10px;margin-bottom:20px;border-radius:10px;background-color:rgba(44,50,56,0.2);}"],
    nameHashStore: {
      "": "easy-css-phgdg",
      "b7da36d3-0000-4000-8000-000000000000": "easy-css-is62g"
    },
    styleHashStore: {}
  }, "src/blocks/headingBlock/HeadingBlock.view.ts");
})();
import { createTemplate as $0$, setStyle as $1$, setDataset as $2$, setEvent as $3$, setHTMLProp as $4$, setHTMLAttr as $5$, setHTMLProps as $6$, setHTMLAttrs as $7$, insertNode as $8$, createElement as $9$, ForNode as $10$, CondNode as $11$, EnvNode as $12$, createTextNode as $13$, updateText as $14$, ExpNode as $15$, PropView as $16$, SubViewNode as $17$ } from "@dlightjs/dlight";
import { toHyphenatedCase as toHyphenatedCase_61mt6g } from "@iandx/easy-css";
import { View } from "@dlightjs/dlight";
import { ContentProp, div, tag, Pretty, Typed, Content, Prop, required } from "@dlightjs/types";
import { css } from "@iandx/easy-css";
import { InlineRenderer } from "@dlightjs/markit";
interface HeadingBlockProps {
  content: ContentProp<any>;
  props: any;
}
class HeadingBlock extends View implements HeadingBlockProps {
  $p$content;
  _$contentKey = "content";
  $content: any = required;
  $$content = 1;
  get content() {
    return this.$content;
  }
  set content(value) {
    this._$updateProp("content", value);
  }
  $p$props;
  $props = required;
  $$props = 2;
  $s$props = ["headdingName"];
  get props() {
    return this.$props;
  }
  set props(value) {
    this._$updateProp("props", value);
  }
  $headdingName;
  $$headdingName = 4;
  get headdingName() {
    return this.$headdingName;
  }
  set headdingName(value) {
    this._$updateProp("headdingName", value);
  }
  get $f$headdingName() {
    return `h${this.props.headingLevel}`;
  }
  View() {
    let $n0 = null,
      $n1 = null,
      $n2 = null;
    this._$update = changed => {
      if (changed & 2) {
        $n2 && $n2.updateCond();
      }
      if (changed & 6) {
        $n1 && $n1.update();
      }
      $n0 && $n0.update(changed);
      $n2 && $n2.update(changed);
    };
    $n0 = new $16$($addUpdate => {
      let $n0 = null,
        $n1 = null;
      $addUpdate(changed => {
        if (changed & 1) {
          $n0 && $4$($n0, "id", this.content[0].content);
          $n1 && $n1.updateArray(this.content);
        }
        if (changed & 8) {
          $n0 && $4$($n0, "className", this.dlightMarkitHeading);
        }
        $n1 && $n1.update(changed);
      });
      $n0 = $9$(this.headdingName);
      $4$($n0, "className", this.dlightMarkitHeading);
      $4$($n0, "id", this.content[0].content);
      $n1 = new $10$(this.content, 1);
      $n1.addNodeFunc((content, $updateArr, $idx) => {
        let $n0 = null,
          $n1 = null;
        $updateArr[$idx] = (changed, content) => {
          if (changed & 1) {
            $n1 && $n1.update();
          }
          $n0 && $n0.update(changed);
        };
        $n0 = new $16$($addUpdate => {
          let $n0 = null;
          $addUpdate(changed => {
            if (changed & 1) {
              $n0 && $n0._$setContent(content.content);
              $n0 && $n0._$setProp("props", content.props);
            }
          });
          $n0 = new InlineRenderer[content.type]();
          $n0._$init({
            props: content.props
          }, content.content, null, null);
          return [$n0];
        });
        $n1 = new $15$(() => $n0);
        return [$n1];
      });
      $8$($n0, $n1, 0);
      $n0._$nodes = [$n1];
      return [$n0];
    });
    $n1 = new $15$(() => $n0);
    $n2 = new $11$(2);
    $n2.addCondFunc($thisCond => {
      if (this.props.headingLevel === 1) {
        if ($thisCond.cond === 0) {
          $thisCond.didntChange = true;
          return [];
        }
        $thisCond.cond = 0;
        let $n0 = null;
        $thisCond.updateFunc = changed => {
          if (changed & 16) {
            $n0 && $4$($n0, "className", this.dlightMarkitHeading1UnderLineCss);
          }
        };
        $n0 = $9$("div");
        $4$($n0, "className", this.dlightMarkitHeading1UnderLineCss);
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
    return [$n1, $n2];
  }
  $dlightMarkitHeading = "easy-css-phgdg";
  $$dlightMarkitHeading = 8;
  get dlightMarkitHeading() {
    return this.$dlightMarkitHeading;
  }
  set dlightMarkitHeading(value) {
    this._$updateProp("dlightMarkitHeading", value);
  }
  $dlightMarkitHeading1UnderLineCss = "easy-css-is62g";
  $$dlightMarkitHeading1UnderLineCss = 16;
  get dlightMarkitHeading1UnderLineCss() {
    return this.$dlightMarkitHeading1UnderLineCss;
  }
  set dlightMarkitHeading1UnderLineCss(value) {
    this._$updateProp("dlightMarkitHeading1UnderLineCss", value);
  }
}
export default ((HeadingBlock as Pretty) as Typed<HeadingBlockProps>);