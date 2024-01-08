In some use cases, there's a need to get the underlying DOM element of a DLight HTMLNode or CompNode.

# HTML Elements
For HTML elements, DLight provides a property called `element` to achieve this. The `element` property accepts multiple types of values:
1. function or arrow function
```js
@View
class MyComp {
  el

  View() {
    div("hello")
      .element(el => {
        this.el = el
        console.log(el)
      })
  }
}
```
The first parameter of the function is the underlying DOM element.

2. any other expression other than function or arrow function
```js
@View
class MyComp {
  el

  getEl(el) {
    console.log(el)
  }

  View() {
    div("hello")
      .element(this.el)
    div("world")
      .element(this.getEl)
  }
}
```
Basically, if the expression is not a function or arrow function(doesn't mean the value is not a function), it'll compiled into:
```js
typeof value === "function" ? value(el) : value = el
```

# Components / Expressions
For components or expressions, you can also use the `element` property to get a list of underlying DOM elements. The `element` property accepts multiple types of values as well:
```js
@View
class App {
  @Children children
  counterEls

  View() {
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
