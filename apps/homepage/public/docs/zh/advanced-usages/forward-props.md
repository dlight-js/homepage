向下传递属性是一项强大的功能，允许你将父组件的所有属性传递给子组件。当您想创建一个外层组件用来包住另一个组件并希望将所有参数都传递给该组件，向下传递属性非常有用。例如，如果您有一个这样的 `Button` 组件：
```js
@View
class Button {
  @Prop content
  @Prop onClick

  View() {
    button(this.content)
      .onClick(this.onClick)
  }
}
```
你只能将 `content` 和 `onClick` 属性传递给 `Button` 组件，因为 DLight 会阻止所有未用 `@Prop` 装饰器声明的属性，防止你传递了组件中未使用的属性。但如果你想将所有属性传递给 `Button` 组件怎么办？你可以像这样使用 `forwardProps` ：
```js
@ForwardProps
@View
class Button {
  @Prop content

  View() {
    button(this.content)
      .forwardProps()
  }
}
```

现在你可以将所有属性传递给 `Button` 组件，这些属性将被 `Button` 组件内的 `Button` 元素接收。请注意，content 属性仍然需要显式地传递给 `Button` 组件。

使用新的 `Button` 组件：
```js
@View
class App {
  View() {
    Button("click me")
      .onClick(() => {
        alert("clicked")
      })
  }
}
```

你也可以将 forwardProps 传递给多个组件：
```js
@ForwardProps
@View
class Button {
  @Prop content

  View() {
    div().class("button-wrapper"); {
      button(this.content)
        .forwardProps()
      button(this.content)
        .forwardProps()
    }
  }
}
```
上面的示例将把所有属性转发给两个button。（尽管这样做可能没有意义）

这个功能对于组件库来说相当重要。你甚至可以使用这个功能编写 DLight 的 `style-component`。