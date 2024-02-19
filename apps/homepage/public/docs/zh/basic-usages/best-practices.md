# 文件命名约定
DLight 使用一个预编译器将 DLight DSL 编译成 js 代码。有一个叫做 `babel-preset-dlight` 的 Babel 预设来完成这个任务。在这个预设的选项中，有两个参数叫做 `files` 和 `excludeFiles`，用于指定哪些文件需要编译。默认情况下，files 的值是 **/*.{js,jsx,ts,tsx}，而 excludeFiles 的值是 **/{dist,node_modules,lib}/*。你可以在你的 babel 配置文件中更改它。

我们建议你使用 `*.view.js` 作为你的视图文件扩展名，这样，对你来说将非常清楚哪个文件是视图文件，哪个不是。同时，它也会使编译器更快，因为它只编译视图文件。因此，一个推荐的 babel 预设选项将是：
```json
{
  "presets": [
    [
      "babel-preset-dlight",
      {
        "files": "**/*.view.{js,ts}",
      }
    ]
  ]
}
```
或者一个 vite 配置：
```js
import dlight from "vite-plugin-dlight"

export default {
  plugins: [
    dlight({
      files: "**/*.view.{js,ts}",
    })
  ]
}
```

# 方法
在 DLight 中编写组件就像你平时在 js 中编写类一样。所以这里有个问题：你怎样在 js 类中编写函数？

有两种方法：
1. 编写一个方法
2. 编写一个类型为函数或箭头函数的属性

在 DLight 中，它将是：
```js
@View
class Counter {
  count = 0
  increment() {
    this.count++
  }

  View() {
    button("increment")
      .onClick(this.increment)
  }
}
```
或
```js
@View
class Counter {
  count = 0
  increment = () => {
    this.count++
  }

  View() {
    button("increment")
      .onClick(this.increment)
  }
}
```

首先，两种方法都是可行的。但它们之间有一点细微的差别。在 DLight 中，每个被使用的属性（这里的使用指的是在视图中使用或者被视图中使用的其他属性使用）都将是响应式的。因此，在这种情况下，如果你将 `increment` 写作一个箭头函数形式的类属性，它将是一个计算状态，这意味着每次 `this.count` 发生变化时它都会被重新计算，这在 DLight 中当然是有意义的，但这不是我们想要的。因此，我们建议你将其写作一个方法。

实际上，在 js 层面上，将其写作方法而不是属性还有几个其他好处：
1. 更少的编译代码内存使用，因为方法只编译一次，但箭头函数每次创建时都会编译。
2. 更少的闭包内存使用，因为方法是函数的语法糖，所以它只会在顶层创建。但箭头函数是一个闭包，所以每次创建时都会有多个闭包实例。

值得注意的是，在 DLight 中，每个方法都自动绑定到类实例上，所以你不需要担心 `this` 上下文。我们不会让一些丑陋和愚蠢的 `this.increment = this.increment.bind(this)` 在 DLight 中发生。

# 样式
由于我们将 DLight 视为一个 UI 渲染库，而不是一个框架，我们不希望为其增加太多复杂性。因此，我们没有内置的样式解决方案。但它可以无缝地与你喜欢的任何样式解决方案一起工作。这里有一份我们推荐的样式解决方案列表：

## clsx
[clsx](https://github.com/lukeed/clsx) 是一个用于条件构造 className 字符串的小工具。

在 DLight 中集成的示例：
```js
div("hello clsx")
  .class(
    clsx(
      "text-red-500",
      this.isRed && "bg-red-500",
      this.isBlue && "bg-blue-500",
    )
  )
```

## Tailwind
[Tailwind](https://tailwindcss.com/) 是一个以实用为先的 CSS 框架，用于快速构建自定义用户界面。

我们建议你使用 `Vite` 来构建你的 DLight 项目。对于一个 vite + tailwind 项目，你可以参考 [文档](https://tailwindcss.com/docs/guides/vite) 来设置你的项目。

在 vscode 中，你可以安装 [tailwindcss intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) 插件，以获得 tailwind 类的自动完成和代码检查。

将以下配置添加到你的 vscode JSON 用户配置中，以便为 DLight 和 clsx 启用 tailwindcss intellisense：
```json
{
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["class\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

在 DLight 中集成的示例：
```js
div("hello tailwind")
  .class("text-red-500 bg-red-500")
```

## Js里的Css
在前端社区中，有很多像 [emotion](https://emotion.sh) 或 [Linaria](https://linaria.dev/)这样的在js里的css解决方案。我甚至实现了一个最小静态在js里的css解决方案 [easy-css](https://github.com/IanDxSSXX/easy-css)。

在 DLight 中集成的示例：
```js
div("hello css in js")
  .class(css`
    color: red;
    background-color: red;
  `)

```

我们在 DLight 组件中的推荐方式：
```js
@View
class MyComp {
  @Prop color: string

  View() {
    div("hello css in js")
      .class(this.helloWorldCss)
  }

  // ---- Style ----
  helloWorldCss = css`
    color: ${this.color};
    background-color: ${this.color};
  `
}
```

## StyleX
[StyleX](https://github.com/facebook/stylex) 是一个用于定义优化用户界面样式的 JavaScript 库。

你可以按照以下步骤在 DLight 中使用 stylex：
1. 添加一个 [vite 插件](https://github.com/nonzzz/vite-plugin-stylex) 来转换 stylex 代码。在你的 vite 配置中：
```js
import { defineConfig } from 'vite'
import dlight from "vite-plugin-dlight"
import { stylexPlugin } from "vite-plugin-stylex-dev";

export default defineConfig({
  plugins: [
    dlight({ files: "**/*.view.js" }),
    stylexPlugin()
  ]
});
```

2. 在 stylex 中创建样式：
```js
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'grey',
  },
  highlighted: {
    color: 'rebeccapurple',
  },
});
```
3. 在DLight中使用:
```js
@View
class TestStyleX {
  View() {
    div("hello stylex")
      .prop(stylex.props(styles.base, styles.highlighted))
  }
}
```

# 编码风格
在你使用 DLight 编码时，有一些编码风格我们建议你遵循。不久我们将制作一个 eslint 插件来强制执行这些规则。

## 单个组件不要超过200行
如果你的组件超过了 200 行，它可能做得太多了。尝试将其分解成更小的组件，或将一些逻辑提取成可重用的函数。

## 内联属性或换行属性
当属性数量少于 2 个时，你可以将它们内联。否则，你应该将它们放在新的一行中，以获得更好的可读性。

示例:
```js
// inline
a("hello").href("https://dlight.dev").target("_blank")
// new line
a("hello")
  .href("https://dlight.dev")
  .target("_blank")
  .title("DLight.js")
  .rel("noopener noreferrer")
```

这引出了子元素块左括号的位置问题。我们建议如果有超过2个属性，就把它放在新的一行。
```js
// inline
a("hello").href("https://dlight.dev").target("_blank"); {
  div("child1")
  div("child2")
}
// new line
a("hello")
  .href("https://dlight.dev")
  .target("_blank")
  .title("DLight.js")
  .rel("noopener noreferrer")
{
  div("child1")
  div("child2")
}
```
现在看起来不错！

## 每个文件一个组件
我们建议你在一个文件中只放置一个组件。这将使你的代码更具可读性和可维护性。而且如果你遵循这个规则，对于我们未来支持的服务器端渲染（SSR），你从客户端迁移代码到服务器端将会非常容易。
```js
// ~> App.view.js
@View
class App {
  View() {
    div("hello")
  }
}

export default App
```
----
但当然，在 DLight 中你也可以不需要遵循任何规则，做任何你想做的事情。