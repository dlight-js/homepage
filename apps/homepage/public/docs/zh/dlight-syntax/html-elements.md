在 DLight 的 DSL 中, HTML 元素可以被表达为函数调用：

```js
div("hello")
span(":D")
```

HTMLNode 函数调用中的第一个参数将是其 `innerText`，因此上面的 DSL 可以呈现为如下所示的 HTML：

```html
<div>hello</div>
<span>:D</span>
```

# 属性

设置一个 html 对象的属性（property 而不是 attribute）是很简单的。我们可以实用方法的点链设置属性：

```js
img()
  .src("/dlight-logo.jpg")
  .alt("DLight Logo")
```

这将会像如下被挂载到 DOM 中：

```html
<div class="hello-cls" style="color: red">hello</div>
<img src="/dlight-logo.jpg" alt="DLight Logo">
```

# 风格

你可以像如上那样在 DLight 中设置任何属性。因此，你可以通过操作它们的 `className` 和 `style` 属性来为元素设置样式。

```js
div("hello")
  .className("hello-cls")
  .style({
    color: "red"
  })
```

值得一提的是在 DLight 中，属性 “className” 接受这些数据类型：`string | undefined | null | (string | undefined | null)[]`，因此你可以通过以下两种方式之一来设置多个类：

```js
div(":D")
  .className("dlight-cls")
  .className("hello-cls")
  .className(myClsName)
```

或者

```js
div(":D")
  .className(["dlight-cls", "hello-cls", myClsName])
```

除此以外，`style` 属性接受一个样式对象，基本上它是这样做的：

```js
for (const [key, value] of Object.entries(styleObj)) {
  element.style[key] = value
}
```

# 事件

任意 dlight 节点的属性都将会表示成一个点链函数，事件也是如此。在事件名称前加上 `on`，就可以了。

```js
button("click")
  .onclick(() => {
    console.log("CLICKED!")
  })
  .onyourevent(yourCustomFunc)
```

你也许想知道为什么不像 React 中的 `onClick` 这里用了 `onclick` 或者 `onevent` 。其实也可以是 `onClick`，我们目前使用全部小写的事件，因为这是纯 JavaScript 中的事件命名约定。

但我正在进行一个有关 [🧐 onClick 还是 onclick 的投票，这是一个问题](https://github.com/dlight-js/dlight/issues/49)。随意选择你喜欢的方式！

# 子元素

我们使用块语句来嵌套子元素。例如，如果你想要获取以下的 HTML 结构：

```html
<div>
  <div>child1</div>
  <div>child2</div>
</div>
```

在 DLight 中，你可以这么写：

```js
div()
  .id("0")
{
  div("child1")
    .id("1")
  div("child2")
    .id("2")
}
```

所以 `{}` 在 JavaScript 中是一个块语句，用于缩小作用域（实际上我们并不经常这样做，所以你可以将其视为函数体块）。在 DLight 中，我们使用这个符号来表示 **一组元素的作用域** 。在这种情况下，这组元素的作用域是最后声明的 DLight HTMLNode 的子元素作用域，即 `div0` 的子元素作用域。<!--（🤨存疑）-->

请注意，因为已经设置了 `div0` 的子元素，所以函数 `div` 的第一个参数，即 `innerText`，将被自动丢弃，这意味着无论你是否像下面这样设置它，都不会有影响：

```js
div("I want to show this")
  .id("0")
{ ... }
```

or

```js
div("But I can't")
  .id("0")
{ ... }
```

# 小结

嗨，在 DLight 中, 我怎样

* 创建一个 `<div>` 元素，其中的 `innerText` 为 "hi, dlight"？

  ```js
  div("hi, dlight")
  ```
* 添加一个显示 `count` 带有蓝色的文本，以及增加 `count` 值的按钮？

  ```js
  div(this.count)
    .style({
      color: "blue"
    })
  button("+")
    .onclick(() => {
      this.count ++
    })
  ```
* 向我的 `container` 元素添加子元素？

  ```js
  div()
    .id("container")
  {
    div("child1")
    div("child2")
  }
  ```
* 嵌套三层子元素？

  ```js
  div().id("level1")
  {
    div().id("level2-0")
    {
      div().id("level3")
    }
    div().id("level2-1")
  }
  ```
