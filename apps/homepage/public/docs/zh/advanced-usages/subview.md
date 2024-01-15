在一个类内部使用子视图可以让开发者在单一类中高效地创建可复用组件，同时保持内部状态的一致性。 对于可能在应用程序的不同部分使用的重要、独立的组件，创建一个新的类组件会是更好的选择。然而，当处理较小的、可复用的UI段落时，这些段落本质上依赖于当前组件的参数和状态，利用子视图则成为了一个明智的选择。

# 创建一个子视图
要在DLight中创建一个子视图，你可以像这样声明一个带有 `View` 装饰器的类方法或箭头函数类属性：
```js
@View
class MyComp {
  @View
  Hello() {
    div("hello")
  }
  View() {
    this.Hello()
    this.Hello()
  }
}
```
值得注意的是，与 `View` 方法一样，在子视图方法中，你只能使用DLight提供的DSL语法编写代码。


# 在子视图中传递属性
现在我们已经学会了如何向组件传递属性，但如果我们想要向子视图传递属性该怎么办？我们可以这样做：

```js
@View
class MyComp {
  Button({ content, onClick }) {
    button(content)
      .onClick(onClick)
      .class("btn")
  }
  View() {
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

在子视图中传递属性时， `Content` 会被强制作为'content'传递，其余属性则通过点链式正常传递。在子视图内部，你可以通过解构第一个参数来访问这些属性。注意，第一个参数始终是一个对象模式：
* ❌ `Button(content, onClick)`
* ❌ `Button(props)`
* ✅ `Button({ content, onClick })`
* ✅ `Button({ content: text, onClick: handleClick })`
