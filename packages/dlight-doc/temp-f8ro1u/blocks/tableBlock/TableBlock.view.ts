import { preParseEasyStore as preParseEasyStore_61mt6g } from "@iandx/easy-css";
(() => {
  preParseEasyStore_61mt6g({
    styleList: [".dlight-markit-table-style{border-collapse:collapse;margin:15px 0 25px 0;}"],
    nameHashStore: {},
    styleHashStore: {}
  }, "src/blocks/tableBlock/TableBlock.view.ts");
})();
import { createTemplate as $0$, setStyle as $1$, setDataset as $2$, setEvent as $3$, setHTMLProp as $4$, setHTMLAttr as $5$, setHTMLProps as $6$, setHTMLAttrs as $7$, insertNode as $8$, createElement as $9$, ForNode as $10$, CondNode as $11$, EnvNode as $12$, createTextNode as $13$, updateText as $14$, ExpNode as $15$, PropView as $16$, SubViewNode as $17$ } from "@dlightjs/dlight";
import { toHyphenatedCase as toHyphenatedCase_61mt6g } from "@iandx/easy-css";
import { View } from "@dlightjs/dlight";
import { table, th, tr, td, type Typed, type Pretty, type ContentProp, Content, Prop, required } from "@dlightjs/types";
import { css } from "@iandx/easy-css";
import { InlineRenderer } from "@dlightjs/markit";
interface TableBlockProps {
  ast: ContentProp<any>;
  props: any;
}
class TableBlock extends View implements TableBlockProps {
  $p$ast;
  _$contentKey = "ast";
  $ast = required;
  $$ast = 1;
  get ast() {
    return this.$ast;
  }
  set ast(value) {
    this._$updateProp("ast", value);
  }
  $p$props;
  $props = required;
  $$props = 2;
  $s$props = ["headerAligns", "rowAligns"];
  get props() {
    return this.$props;
  }
  set props(value) {
    this._$updateProp("props", value);
  }
  $headerAligns;
  $$headerAligns = 4;
  get headerAligns() {
    return this.$headerAligns;
  }
  set headerAligns(value) {
    this._$updateProp("headerAligns", value);
  }
  get $f$headerAligns() {
    return this.props.headerAligns;
  }
  $rowAligns;
  $$rowAligns = 8;
  get rowAligns() {
    return this.$rowAligns;
  }
  set rowAligns(value) {
    this._$updateProp("rowAligns", value);
  }
  get $f$rowAligns() {
    return this.props.rowAligns;
  }
  View() {
    let $n0 = null,
      $n1 = null,
      $n2 = null,
      $n3 = null;
    this._$update = changed => {
      if (changed & 1) {
        $n2 && $n2.updateArray(this.ast.slice(1));
        $n3 && $n3.updateArray(this.ast[0].entries());
      }
      if (changed & 16) {
        $n0 && $4$($n0, "className", this.dlightMarkitTableStyle$);
      }
      if (changed & 32) {
        $n1 && $4$($n1, "className", this.dlightMarkitTableTrStyle$);
      }
      $n2 && $n2.update(changed);
      $n3 && $n3.update(changed);
    };
    $n0 = TableBlock.$t0();
    $n1 = $n0.firstChild;
    $4$($n0, "className", this.dlightMarkitTableStyle$);
    $4$($n1, "className", this.dlightMarkitTableTrStyle$);
    $n2 = new $10$(this.ast.slice(1), 1);
    $n2.addNodeFunc((cellRow, $updateArr, $idx) => {
      let $n0 = null,
        $n1 = null;
      $updateArr[$idx] = (changed, cellRow) => {
        if (changed & 1) {
          $n1 && $n1.updateArray(cellRow.entries());
        }
        if (changed & 32) {
          $n0 && $4$($n0, "className", this.dlightMarkitTableTrStyle$);
        }
        $n1 && $n1.update(changed);
      };
      $n0 = $9$("tr");
      $4$($n0, "className", this.dlightMarkitTableTrStyle$);
      $n1 = new $10$(cellRow.entries(), 1);
      $n1.addNodeFunc(([index, cellColumn], $updateArr, $idx) => {
        let $n0 = null;
        $updateArr[$idx] = (changed, [index, cellColumn]) => {
          if (changed & 1) {
            $n0 && $n0.updateArray(cellColumn);
          }
          $n0 && $n0.update(changed);
        };
        $n0 = new $10$(cellColumn, 1);
        $n0.addNodeFunc(({
          type,
          content,
          props
        }, $updateArr, $idx) => {
          let $n0 = null,
            $n1 = null;
          $updateArr[$idx] = (changed, {
            type,
            content,
            props
          }) => {
            if (changed & 1) {
              $n1 && $n1.updateCond();
            }
            if (changed & 138) {
              $n0 && $4$($n0, "className", this.dlightMarkitTableTdStyle$(this.rowAligns[index]));
            }
            $n1 && $n1.update(changed);
          };
          $n0 = $9$("td");
          $4$($n0, "className", this.dlightMarkitTableTdStyle$(this.rowAligns[index]));
          $n1 = new $11$(1);
          $n1.addCondFunc($thisCond => {
            if (type) {
              if ($thisCond.cond === 0) {
                $thisCond.didntChange = true;
                return [];
              }
              $thisCond.cond = 0;
              let $n0 = null,
                $n1 = null;
              $thisCond.updateFunc = changed => {
                if (changed & 1) {
                  $n1 && $n1.update();
                }
                $n0 && $n0.update(changed);
              };
              $n0 = new $16$($addUpdate => {
                let $n0 = null;
                $addUpdate(changed => {
                  if (changed & 1) {
                    $n0 && $n0._$setContent(content);
                    $n0 && $n0._$setProp("props", props);
                  }
                });
                $n0 = new InlineRenderer[type]();
                $n0._$init({
                  props: props
                }, content, null, null);
                return [$n0];
              });
              $n1 = new $15$(() => $n0);
              return $thisCond.cond === 0 ? [$n1] : $thisCond.updateCond();
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
          return [$n0];
        });
        return [$n0];
      });
      $8$($n0, $n1, 0);
      $n0._$nodes = [$n1];
      return [$n0];
    });
    $8$($n0, $n2, 1);
    $n3 = new $10$(this.ast[0].entries(), 1);
    $n3.addNodeFunc(([index, headerColumn], $updateArr, $idx) => {
      let $n0 = null;
      $updateArr[$idx] = (changed, [index, headerColumn]) => {
        if (changed & 1) {
          $n0 && $n0.updateArray(headerColumn);
        }
        $n0 && $n0.update(changed);
      };
      $n0 = new $10$(headerColumn, 1);
      $n0.addNodeFunc(({
        type,
        content,
        props
      }, $updateArr, $idx) => {
        let $n0 = null,
          $n1 = null,
          $n2 = null;
        $updateArr[$idx] = (changed, {
          type,
          content,
          props
        }) => {
          if (changed & 1) {
            $n2 && $n2.update();
          }
          if (changed & 70) {
            $n0 && $4$($n0, "className", this.dlightMarkitTableThStyle$(this.headerAligns[index]));
          }
          $n1 && $n1.update(changed);
        };
        $n0 = $9$("th");
        $4$($n0, "className", this.dlightMarkitTableThStyle$(this.headerAligns[index]));
        $n1 = new $16$($addUpdate => {
          let $n0 = null;
          $addUpdate(changed => {
            if (changed & 1) {
              $n0 && $n0._$setContent(content);
              $n0 && $n0._$setProp("props", props);
            }
          });
          $n0 = new InlineRenderer[type]();
          $n0._$init({
            props: props
          }, content, null, null);
          return [$n0];
        });
        $n2 = new $15$(() => $n1);
        $8$($n0, $n2, 0);
        $n0._$nodes = [$n2];
        return [$n0];
      });
      return [$n0];
    });
    $8$($n1, $n3, 0);
    return [$n0];
  }
  $dlightMarkitTableStyle$ = "dlight-markit-table-style";
  $$dlightMarkitTableStyle$ = 16;
  get dlightMarkitTableStyle$() {
    return this.$dlightMarkitTableStyle$;
  }
  set dlightMarkitTableStyle$(value) {
    this._$updateProp("dlightMarkitTableStyle$", value);
  }
  $dlightMarkitTableTrStyle$ = "easy-css-phgdg";
  $$dlightMarkitTableTrStyle$ = 32;
  get dlightMarkitTableTrStyle$() {
    return this.$dlightMarkitTableTrStyle$;
  }
  set dlightMarkitTableTrStyle$(value) {
    this._$updateProp("dlightMarkitTableTrStyle$", value);
  }
  $dlightMarkitTableThStyle$ = (align: string) => css.collect(`
    border-bottom: solid 1px #cecece;
    padding: 10px;
    text-align: ${align};
  `, `dlight-markit-table-th-style-${toHyphenatedCase_61mt6g(align)}$`, "src/blocks/tableBlock/TableBlock.view.ts");
  $$dlightMarkitTableThStyle$ = 64;
  get dlightMarkitTableThStyle$() {
    return this.$dlightMarkitTableThStyle$;
  }
  set dlightMarkitTableThStyle$(value) {
    this._$updateProp("dlightMarkitTableThStyle$", value);
  }
  $dlightMarkitTableTdStyle$ = (align: string) => css.collect(`
    border-bottom: solid 1px rgb(226 232 240);
    padding: 15px;
    text-align: ${align};
  `, `dlight-markit-table-td-style-${toHyphenatedCase_61mt6g(align)}$`, "src/blocks/tableBlock/TableBlock.view.ts");
  $$dlightMarkitTableTdStyle$ = 128;
  get dlightMarkitTableTdStyle$() {
    return this.$dlightMarkitTableTdStyle$;
  }
  set dlightMarkitTableTdStyle$(value) {
    this._$updateProp("dlightMarkitTableTdStyle$", value);
  }
  static $t0 = $0$("<table><tr></tr></table>");
}
export default ((TableBlock as Pretty) as Typed<TableBlockProps>);