您可以将 `didUpdate` 看作是一个生命周期方法。它在组件/元素的任何使用状态更新后被调用。
值得注意的是，当组件/元素首次渲染时，`didUpdate` 不会被调用。

例如：
```js
@View
class Counter {
  count = 0

  Body() {
    div(this.count)
      .didUpdate(() => {
        // ---- Will trigger when `this.count` is updated
        console.log("div updated")
      })
    button("increment")
      .onClick(() => {
        this.count++
      })
  }
}
```
