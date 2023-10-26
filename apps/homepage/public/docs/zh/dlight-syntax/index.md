DLight 使用 `class` 来模块化组件。一个基本 DLight 类组件看上去是这样子的：

```js
@View
class MyComponent {
  Body() {
    div("hello")
  }
}
```

我们使用一个叫做 `@View` 的类装饰器来识别一个 DLight 组件。所有的视图（view）组件部分会都在 `Body` 方法中

在DLight中，我们推出了一个 JS 适配的领域特定语言（DSL）。在接下来的小节中，我们将会集中于这样的 UI 组建领域特定语言并详细展开介绍。我们会把 DLight 的 DSL 和其他主流框架比如 React，Vue，Solid 还有 Svelte 进行比较。 这样做并不是为了展示那些框架的语法不如我们的DLight，而是希望能帮助您更好的理解我们的 JS 兼容的领域特定语言（如果您熟悉这些现存框架的话）。
