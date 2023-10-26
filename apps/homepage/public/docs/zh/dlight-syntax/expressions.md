让我们回顾一下我们已经讲过的内容。我们已经讨论了 HTML 元素、文本节点、自定义组件、条件语句和循环。语法似乎相当流畅且直接，但这些函数调用到底是什么？它们如何被收集到 `Body` 方法中的呢？

让我们先回答这些函数调用到底是什么。

在 DLight 中，每个这样的函数调用叫做 DLNode。 它们都是不同的子节点，具有不同的特性，但又都继承自 `DLNode`：


| HTML 元素 | 文本节点 | 自定义组件 | 条件语句 | For 循环 |
| ----------- | ---------- | ------------ | ---------- | ---------- |
| HTMLNode  | TextNode | CustomNode | IfNode   | ForNode  |

举例：

```js
div("hello") // ~> new HTMLNode("hello")
"world"      // ~> new TextNode("hello")
Greeting()   // ~> new CustomNode(Greeting)
```

现在您可能会问，如果每个节点类型都是固定的，是否有一种方法可以动态确定当前变量的节点类型并在视图中显示它？换句话说，有没有一个函数 FUNC_xxx 可以做到：

```js
xxx(thisCouldBeAndNode) 
// -> switch (thisCouldBeAndNode.type)
//    case html: new HTMLNode()
//    case text: new TextNode()
//    case custom: new CustomNode()
```

当然有的了，这样的 `xxx` 函数被叫做 `_` ，你甚至可以忽略它。小例子：

```js
@View
class MyComp {
  // I don't know which type it is
  @Prop variable: DLNode | string | undefined | null | (DLNode | string | undefined | null)[]

  Body() {
    // But I can just write this
    _(this.variable)
    // or
    this.variable
  }
}
```

但是我们如何能够确定一个变量是否一个 `ExpressionNode`？

1. 用 `_` 函数裹住
2. 不要用调用表达式

比如:

```js
@View
class MyComp {
  @Prop RUOK
  @Prop good
  @Prop bad

  Body() {
    _(this.RUOK ? this.good : this.bad)
    // or
    this.RUOK ? this.good : this.bad
  }
}
```

正因为他不是一个像`div()` 的 `call expression`， 它便成了一个 `ExpressionNode`.

这个功能在 **子组件** 或 **插槽** 中非常有用，这将会在基本用法中介绍到。现在，您只需要知道这是一个有效的语法，并且它接受任何内容。
