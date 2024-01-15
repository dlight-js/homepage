您可以将 `didUpdate` 看作是一个生命周期方法。它在组件/元素的任何使用状态更新后被调用。
值得注意的是，当组件/元素首次渲染时，`didUpdate` 不会被调用。

例如：
```js
@View
class Counter {
  count = 0

  View() {
    div(this.count)
      .didUpdate(() => {
        console.log("div updated")
      })
  }
}
```

传给 `didUpdate` 的参数：

* `node`：当前元素或组件
* `key`：状态变化的名称
* `prevValue`：该状态的前一个值
* `nextValue`：状态的下一个值

示例：
```js
@View
class Counter {
  count = 0

  View() {
    div(this.count)
      .didUpdate((node, key, prevValue, nextValue) => {
        console.log(`${node} ${key} updated: ${prevValue} -> ${nextValue}`)
      })
    MyComp()
      .prop(this.count)
      .didUpdate((node, key, prevValue, nextValue) => {
        console.log(`Component ${node} ${key} updated: ${prevValue} -> ${nextValue}`)
      })
  }
}
```