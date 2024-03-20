Forwarding props is a powerful feature that allows you to pass all the props from a parent component to a child component. It's very useful when you want to create a wrapper component that wraps another component and pass all the props to the wrapped component. For instance, if you have a `Button` component like this:
```js
@View
class Button {
  @Prop content
  @Prop onClick

  Body() {
    button(this.content)
      .onClick(this.onClick)
  }
}
```
You can only pass the `content` and `onClick` props to the `Button` component because DLight is blocking all the other props that are not declared with the `@Prop` decorator to prevent you from passing props that are not used in the component. But what if you want to pass all the props to the `Button` component? You can do it with `forwardProps` like this:
```js
@ForwardProps
@View
class Button {
  @Prop content

  Body() {
    button(this.content)
      .forwardProps()
  }
}
```

Now you can pass all the props to the `Button` component, which will be received by the `button` element inside the `Button` component. Note that the content prop is still required to be passed to the `Button` component explicitly.

Use the new `Button` component:
```js
@View
class App {
  Body() {
    Button("click me")
      .onClick(() => {
        alert("clicked")
      })
  }
}
```

You can also forwardProps to multiple components:
```js
@ForwardProps
@View
class Button {
  @Prop content

  Body() {
    div().class("button-wrapper"); {
      button(this.content)
        .forwardProps()
      button(this.content)
        .forwardProps()
    }
  }
}
```
The above example will forward all the props to both buttons. (even though it doesn't make sense to do this)

This feature is fairly import for component libraries. You can even write a DLight `style-component` using this feature.