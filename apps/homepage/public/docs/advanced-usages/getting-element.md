In some use cases, there's a need to get the underlying DOM element of a DLight HTMLNode or CompNode.

# HTML Elements
For HTML elements, DLight provides a property called `ref` to get that element's reference. The `ref` property accepts multiple types of values:
1. function or arrow function
```js
@View
class MyComp {
  el

  Body() {
    div("hello")
      .ref(el => {
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

  Body() {
    div("hello")
      .ref(this.el)
    div("world")
      .ref(this.getEl)
  }
}
```
Basically, if the expression is not a function or arrow function(doesn't mean the value is not a function), it'll compiled into:
```js
typeof value === "function" ? value(el) : value = el
```

# Components / Expressions
For components or expressions, you can also use the `ref` property to get the **instance** of that CompNode. 
```js
@View
class Counter {
  count = 0

  increment() {
    this.count++
  }

  Body() {
    div(this.count)
  }
}
@View
class App {
  counterNode
  Body() {
    Counter()
      .ref(this.counterNode)
    button()
      .onClick(() => {
        this.counterNode.increment()
      })
  }
}
```
We won't recommend you to use `ref` to get the instance of a CompNode, because DLight is a data-driven framework and to make the data flow clear, every interaction between components should be done either through `props` or `envs`. But if you really really really need to do this, it's supported and we can't stop you.

So a better way to achieve this is:
```js
@View
class Counter {
  @Prop getIncrement
  count = 0

  increment() {
    this.count++
  }

  willMount() {
    this.getIncrement(this.increment)
  }

  Body() {
    div(this.count)
  }
}
@View
class App {
  increment
  Body() {
    Counter()
      .getIncrement(increment => {
        this.increment = increment
      })
    button()
      .onClick(() => {
        this.increment()
      })
  }
}
```


In DLight, we offer a property called `elements` to get a list of underlying DOM elements. The `elements` property accepts multiple types of values as well:
```js
MyComp()
  .elements(els => {
    console.log(`There're ${els.length} elements in MyComp`)
  })
_(this.children)
  .elements(els => {
    console.log(`There're ${els.length} elements in children`)
  })
```