Prop view是传递给DLight视图组件的一个属性。有时创建一个高阶组件（HOC），用一个视图包裹另一个组件是很有用的。例如，如果你想创建一个在红色边框内包裹组件的组件，你可以这样做：

```js
@View
class RedBorder {
  @Content contentView

  View() {
    div()
      .style({
        border: "1px solid red",
        padding: "10px",
        margin: "10px"
      })
    {
      this.contentView
    }
  }
}

@View
class App {
  View() {
    RedBorder(View => {
      div("hello")
      div("world")
    })

    RedBorder(View => {
      "any content"
    })
  }
}
```

这里，我们传递了一个看起来像箭头函数的prop，其第一个参数命名为View：

```js
View => {
  div("hello")
  div("world")
}
```

这实际上并不是一个箭头函数。我们使用编译器来识别这种特定的函数模式，并将其转换成视图属性。不要被这里的语法所迷惑！ `View => AnyView` 是DLight组件属性中唯一的特殊语法。在视图属性的主体中，你可以像在 `View` 方法或子视图` @View` 方法中那样编写任何DLight DSL语法。

有趣的是， `children` 实际上也是一个视图属性。所以我们的建议是，如果你有一个属性需要设置为视图，你可以使用 `children` 属性。如果你有多个属性需要设置为视图，那么就将它们设置为普通的视图属性：

```js
@View
class MyComp {
  View() {
    Wrapper(); {
      div("hello")
      div("world")
    }

    MyCard()
      .iconView(View => {
        Icon("logo")
      })
      .titleView(View => {
        div("title")
      })
      .descriptionView(View => {
        div("description")
      })
  }
}
```

并像这样在 `Expressions` 中使用它们：

```js
@View
class Wrapper {
  @Children children

  View() {
    div().class("wrapper"); {
      this.children
      // or
      _(this.children)
    }
  }
}

@View
class MyCard {
  @Prop iconView
  @Prop titleView
  @Prop descriptionView

  View() {
    this.iconView
    this.titleView
    this.descriptionView
  }
}
```


请注意，每次使用视图属性/子视图时，它都会创建该视图的一个新实例。所以不用担心它们的状态会被共享。它们是独立的：

```js
@View
class MyComp {
  @Prop myView

  View() {
    // Three different instances of myView
    this.myView
    this.myView
    this.myView
  }
}
```