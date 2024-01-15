在组件中，当状态发生变化时，观察这些变化并执行一些操作（如向服务器发送请求）是一种常见的需求，在函数组件里这通常被称为“副作用”。 先不引入 `@Watch` ，我们来看看如何利用之前的知识在DLight中实现这一点。

由于在DLight中，每个状态或非状态都只是一个属性，我们实际上可以通过声明一个其值为立即执行函数表达式（IIFE）的属性来实现这一点。例如，如果我们想在 `count` 状态变化时向服务器发送请求，我们可以这样做：

```js
@View
class Counter {
  count = 0
  watchCount = (() => {
    console.log(`count changed: ${this.count}`)
  })()


  View() {
    button("click me")
      .onClick(() => {
        this.count++
      })
  }
}

```

这种方法之所以有效，是因为当一个属性的依赖发生变化时，DLight会自动重新计算该属性的值。在这个例子中， `watchCount` 属性依赖于 `count` 状态，因此当 `count` 状态变化时， `watchCount` 属性就会被重新计算，也就是说，立即执行函数表达式（IIFE）会再次执行。

这种方式完全有效，并且没有任何性能问题。但作为一个以开发体验为首要考虑的框架，DLight不会让这种看起来不优雅的代码成为实现这一功能的唯一方法。因此，我们引入了 `@Watch` 装饰器来使其更加优雅：

```js
@View
class Counter {
  count = 0

  @Watch
  watchCount() {
    console.log(`count changed: ${this.count}`)
  }

  View() {
    button("click me")
      .onClick(() => {
        this.count++
      })
  }
}
```

你只需简单地声明一个使用 `@Watch` 装饰器的方法，当该方法中使用的任何状态发生变化时，它就会被执行。如果你想对依赖项有更多的控制，你也可以向 `@Watch` 装饰器传递一个依赖项名称的列表：

```js
@View
class Counter {
  @Watch("state1", "state2", "state3")
  watchCount2() {
    console.log("state1, state2 or state3 changed")
  }
}
```

但我们不推荐这样做，因为大家都不喜欢在React的useEffect中使用依赖数组。

# 参数
`@Watch` 方法确实有一些参数： `key` 、 `prevValue和nextValue` 。 `key` 是发生变化的状态的名称， `prevValue` 是该状态的前一个值， `nextValue` 是该状态的下一个值。

示例:
```js
@View
class Counter {
  count = 0

  @Watch
  watchCount(key, prevValue, nextValue) {
    console.log(`${key} changed: ${prevValue} -> ${nextValue}`)
  }

  View() {
    button("click me")
      .onClick(() => {
        this.count++
      })
  }
}
```
