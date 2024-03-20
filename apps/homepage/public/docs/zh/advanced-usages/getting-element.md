在某些使用场景中，需要获取 DLight HTMLNode 或 CompNode 的底层 DOM 元素。

# HTML 元素
对于 HTML 元素，DLight 提供了一个名为 `element` 的属性来实现这一点。`element` 属性接受多种类型的值：
1. 函数或箭头函数
```js
@View
class MyComp {
  el

  Body() {
    div("hello")
      .element(el => {
        this.el = el
        console.log(el)
      })
  }
}
```
该函数的第一个参数是底层 DOM 元素。

2. 除了函数或箭头函数之外的任何其他表达式
```js
@View
class MyComp {
  el

  getEl(el) {
    console.log(el)
  }

  Body() {
    div("hello")
      .element(this.el)
    div("world")
      .element(this.getEl)
  }
}
```
基本上，如果表达式不是函数或箭头函数（并不意味着值不是函数），它将被编译为：
```js
typeof value === "function" ? value(el) : value = el
```

# 组件 / 表达式
对于组件或表达式，您也可以使用 `element` 属性来获取底层 DOM 元素的列表。`element` 属性同样接受多种类型的值：
```js
@View
class App {
  @Children children
  counterEls

  Body() {
    Counter()
      .element(this.counterEls)
    MyComp()
      .element(els => {
        console.log(`There're ${els.length} elements in MyComp`)
      })
    _(this.children)
      .element(els => {
        console.log(`There're ${els.length} elements in children`)
      })
  }
}
```
