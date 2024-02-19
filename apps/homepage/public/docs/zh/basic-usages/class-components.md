# 创建一个类组件

DLight 中的类组件呈现为一个极小的模板，提供了一种对结构和灵活性独特的融合，使组件的创建过程对开发者来说既直观又高效。

因为我们不经常使用类，你可能需要通过阅读 MDN（Mozilla Developer Network）上的 [JavaScript 类部分](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) 可以帮助你回顾 JavaScript 中的类是什么。

思考以下的表示：

```js
@View
class MyComp {
  View() {
    div("hello")
  }
}
```

让我们来分析这里的语法：

* `@View`: 这个前导装饰器（leading decorator）是向 DLight 发出的信号，表明随后的类是专门用于 UI 表示的。
* `class MyComp`: 通过声明 `MyComp`，我们将内部状态、潜在的行为以及我们的组件最终展示的视觉布局结合在一起。
* `View()`: 这个方法在组件的视觉呈现中起着 **核心** 作用。DLight 在这里找到组件在屏幕上应该呈现的蓝图。在这个 View 方法中，你只能使用我们在前面的部分中描述的 **DLight DSL 语法** 编写代码。
* `div("hello")`: 这正是我们讨论的 DSL。

# 元素和组件

在 DLight 中， 你主要使用两种视图构建工具：元素（Elements）和组件（Components）。

元素（Elements）是你的用户界面的基本构建块。它们直接使用 DLight DSL 语法在屏幕上渲染 HTML 元素。例如，`div("hello")` 创建了一个简单的显示文本 "hello" 的 `<div>` 元素，

组件（Components）是更高级的抽象，它们封装了UI和逻辑。你可以将它们定义为带有 `@View` 装饰器的类。组件具有特殊的 `View` 方法，你可以在其中使用 DLight DSL 定义它们的可视结构。组件提供了模块化和可重用性。

这是一个你可以如何结合元素和组件的例子：

```js
@View
class MyComp1 {
  View() {
    div("hello")
    img()
      .src("/dlight-logo.png")
  }
}

@View
class MyComp2 {
  View() {
    h1("This is a big title!")
  }
}

@View
class MyComp3 {
  View() {
    div()
    {
      span("hello")
      "world"
    }
  }
}

@View
class App {
  View() {
    MyComp1()
    p("below is comp2")
    MyComp2()
    MyComp3()
  }
}

```

# 子视图

一个类内部的子视图（subviews）使开发者能够在同一个类中高效地创建可重用组件，并保持一致的内部状态。

因为对于一个庞大且独立的组件，该组件可能会在应用程序的不同部分中使用，所以创建一个新的类组件可能是更好的选择。然而，在处理较小、可重用的、依赖于当前组件的参数和状态的 UI 片段时，利用子视图可能就是一个明智的选择了。

要在 DLight 中创建一个子视图（subview），你可以使用 `View` 装饰器来声明一个类方法或箭头函数类属性，就像这样：

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

值得一提的是，和 `View` 方法一样，你在子视图方法中只能用 DLight 提供的 DSL 语法编写代码。
