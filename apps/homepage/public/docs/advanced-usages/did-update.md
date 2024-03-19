You can count `didUpdate` as a lifecycle method. It's called after any used state of one component/element is updated. 
It's worth noting that `didUpdate` won't be called when the component/element is first rendered.

Example:
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
