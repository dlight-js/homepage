错误处理是Web开发中的常见实践。在DLight中，你可以使用 `try...catch` 语句来处理错误。非常直观和简单。让我们看看它是如何工作的：
```js
@View
class MyBadComp {
  @Prop obj

  Body() {
    div(this.obj.count)
  }
}

@View
class MyComp {
  obj = { count: 0 }

  Body() {
    try {
      MyBadComp().obj(this.obj)
    } catch (e) {
      "Oops, something went wrong..."
      div(e.message)
    }
    EvilButton("Click me to break it")
      .onClick(() => {
        this.obj = null
      })
  }
}
```

与其他DLight DSL一样，块语句用作dlight组件语法。 `try` 块包含可能抛出异常的元素， `catch` 块包含后备逻辑。在这个例子中，我们尝试渲染一个 `MyBadComp` 组件，并传递一个 `null` 对象，这将抛出异常： `Cannot read properties of null (reading 'count')` 。 `catch` 块将捕获异常并渲染错误信息。

请注意，就像react/solid/vue的错误边界一样，dlight中的try...catch语句只能捕获渲染/更新阶段的错误。它不会捕获其作用域之外的错误，如**事件处理器**或**异步代码**。你可以使用 `window.onerror` 或 `window.addEventListener('error')` 来捕获这些错误。只有在渲染/更新阶段抛出的错误才会被try...catch语句捕获。

示例：
* ❌ 这不会起作用，因为错误是事件处理器错误，并不在try...catch语句的范围内
```js
@View
class MyComp {
  Body() {
    try {
      button("Click me to throw an error")
        .onClick(() => {
          throw new Error("Oops, something went wrong...")
        })
    } catch (e) {
      div(e.message)
    }
  }
}
```
* ✅ 这是有效的因为错误发生在 **watcher** 里
```js
@View
class DataView {
  @Prop obj
  @Watch
  watcher() {
    console.log(this.obj.notExist) // Error occurs here
  }
  Body() {}
}
@View
class MyComp {
  Body() {
    try {
      DataView().obj(null)
    } catch (e) {
      div(e.message)
    }
  }
}
```
* ❌ 这不生效因为错误是 **异步代码错误** 不在try...catch语句的范围内。
```js
@View
class DataView {
  @Prop obj
  @Watch
  watcher() {
    setTimeout(() => {
      console.log(this.obj.notExist) // Error occurs here
    }, 1000)
  }
  Body() {}
}

@View
class MyComp {
  Body() {
    try {
      DataView().obj(null)
    } catch (e) {
      div(e.message)
    }
  }
}
```