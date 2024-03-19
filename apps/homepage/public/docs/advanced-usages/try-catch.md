Error handling is a common practice in web development. In DLight, you can use the `try...catch` statement to handle errors. Pretty intuitive and straightforward. Let's see how it works:
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

Same as other DLight DSL, block statements serve as dlight component syntax. The `try` block contains the elements that might throw an exception, and the `catch` block contains the fallback logic. In this example, we're trying to render a `MyBadComp` component with a `null` object, which will throw an exception: `Cannot read properties of null (reading 'count')`. The `catch` block will catch the exception and render the error message.

Note that just like react/solid/vue's error boundary, the `try...catch` statement in dlight only catches errors in the render/update phase. It doesn't catch errors out of its scope like **event handlers** or **asynchronous code**. You can use `window.onerror` or `window.addEventListener('error')` to catch those errors. Only the errors thrown in the render/update phase will be caught by the `try...catch` statement.

Examples:
* ❌ This won't work because the error it's an event handler error and not in the scope of the try...catch statement
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
* ✅ This will work since the error occurs in a **watcher**
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
* ❌ This won't work because the error it's **an asynchronous code error** and not in the scope of the try...catch statement
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