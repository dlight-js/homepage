在基于组件的框架中，"子组件" 的概念非常重要。子组件允许开发者封装其 UI 的部分，使得代码更容易重用、维护和阅读。它们是你放置在另一个组件内部的组件，用作父组件的内容或渲染的一部分。DLight 已经让子组件的使用变得非常简便。

# 一个直观的 DLight 案例

想象一下，一个提供了一个带有样式的容器的名为 Card 的组件。在这个容器内，你可能想放置各种内容，比如文本、图像，甚至其他组件。以下是你可以如何在 DLight 中实现这个功能的示例：

```js
// ~> Card.js
import { View } from "@dlightjs/dlight"

@View
class Card {
  @Children content

  Body() {
    div()
      .style({
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "5px"
      })
    {
      this.content
    }
  }
}

export default Card
```

然后在你的 App 中：

```js
// ~> App.js
import { View } from "@dlightjs/dlight"
import Card from "./Card.view"

@View
class App {
  Body() {
    Card()
    {
      div("This is the content inside the card.")
    }
  }
}

export default App
```

在这个示例中，Card 组件可以包裹任何内容。

放置在 Card 组件内部的内容成为其自组件，也就是在 Card 组件内的`this.content`。

DLight 处理子组件的方法非常强调直观的设计。DLight 的方法通过使用`{}`符号，模仿了 HTML 的子节点中的我们熟悉的结构。`{}`符号表示了一个紧密结合的单元，一个可以在整个DLight中轻松解释和修改的有序的块。你可以在元素的 `childNodes`中、环境中、组件的子组件中 以及 `for`和`if` 表达式中找到它。
