在这部分，我们并不会向你展示构建一个自定义组件的全过程。相反，我们将提供一个详细的领域特定语言（DSL），以让你了解如何**访问**一个自定义组件。

假如我们已经构建了一个像这样的 `Counter` 组件:

```js
@View
class Counter {
  count = 0

  View() {
    div(this.count)
    button("+")
      .onclick(() => {
        this.count ++
      })
  }
}
```

然而我们怎么在其他组件中使用这个自定义的组件呢？答案就是正如我们对HTML元素的操作一样，通过 **function call** 和 **dot chaining**：

```js
Counter()
```

你可能会问：“既然这个是 JavaScript 中的一个类，`new` 关键词在哪里呢？” 这确实是一个类，但是我们使用了一些编译技巧来让这个类在在构建时自动生成它。原因很简单，我们想让我们的代码尽可能的简洁。`new Counter()` 与像 `div()`这样的 HTML 元素调用并不一致，看起来很丑。这就是为什么它采用函数调用（没有`new`）的形式的原因。

# 属性

向自定义组件传递属性与向 HTML 元素传递属性一样。第一个参数将会是 `content` 属性，而其余的都会是点链属性。我们后续将把 basic-usages 小节中 `content` 和其他属性的含义分解介绍。在这里，让我们先看看现在可以怎么使用它们：

```js
Counter("some text")
// -> content = "some text"
```

```js
Counter()
  .count(1)
  .otherProp({ good: true })
// -> count = 1
// -> otherProp = { good: true }
```

# 子组件 / 插槽

和子元素一样，自定义组建可以通过使用一个块语句访问他们的子组件，进而限定一组元素的作用域。

```js
Counter()
{
  div("hello counter, I'm your child")
  MyOtherComp("true dude")
}
```
