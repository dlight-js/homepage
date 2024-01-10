Prop view is a property passed to a component that is a DLight View. It is sometimes useful to create a Higher Order Component(HOC) that wraps a component with a view. For instance, if you want to create a component that wraps a component within a red border, you can do it like this:

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

In here, we pass a prop that looks like an arrow function with the first parameter named `View`:
```js
View => {
  div("hello")
  div("world")
}
```

This is actually not an arrow function. We use compiler magic to identify this specific function pattern and transform it into a view prop. Don't be confused by the syntax here! `View => AnyView` is the only special syntax as DLight component properties. In the body of the view prop, you can write any DLight DSL syntax just like we do in the `View` method or the subView `@View` methods.

Fun fact, `children` is actually a view prop as well. So what we recommend is that if you have one property required to be View, you can use the `children` prop. If you have multiple properties required to be View, set them as normal view properties instead:

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

And use then in `Expressions` like this:

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


Be noted that each time a view prop/child is used, it'll create a new instance of that view. So don't you worry about their states being shared. They're not:

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