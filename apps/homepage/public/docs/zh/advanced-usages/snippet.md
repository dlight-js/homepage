在一个类中使用 `Snippet` 可以让开发人员高效地创建可复用的组件，同时保持内部状态的一致性。对于一个重要的、独立的组件，如果它可能在应用的不同地方被使用，创建一个新的类组件将是更好的选择。然而，当处理较小的、可复用的UI段落，这些段落本质上依赖于当前组件的参数和状态时，利用子视图(subViews)成为一个明智的选择。

# 创建一个snippet
要在DLight中创建一个snippet，你可以像这样简单地声明一个类方法或一个箭头函数类属性，并使用 `Snippet` 装饰器：

```js
@View
class MyComp {
  @Snippet
  Hello() {
    div("hello")
  }
  Body() {
    this.Hello()
    this.Hello()
  }
}
```
值得注意的是，与 `Body` 方法一样，你在Snippet方法中只能使用DLight提供的DSL语法编码。


# 在snippet中传递参数
我们已经学会了如何向组件传递参数，但如果我们想向snippet传递参数该怎么办呢？我们可以这样做：

```js
@View
class MyComp {
  Button({ content, onClick }) {
    button(content)
      .onClick(onClick)
      .class("btn")
  }
  Body() {
    this.Button("alert")
      .onClick(() => {
        alert("clicked")
      })
    this.Button("console")
      .onClick(() => {
        console.log("clicked")
      })
  }
}
```

在snippet中传递参数时， `Content` 被强制传递为"content"，而其他的参数则通过点语法正常传递。在snippet内部，你可以通过解构第一个参数来访问props。注意，第一个参数总是一个对象模式：

* ❌ `Button(content, onClick) {}`
* ❌ `Button(props) {}`
* ✅ `Button({ content, onClick }) {}`
* ✅ `Button({ content: text, onClick: handleClick }) {}`

向snippet传递参数只是一种让你的代码片段更加可复用和灵活的方式。我们不建议向代码片段传递太多props，因为使snippet过于复杂不是最佳实践。如果你需要传递太多参数，你应该考虑创建一个新的组件而不是snippet。
