You can count `didUpdate` as a lifecycle method. It's called after any used state of one component/element is updated. 
It's worth noting that `didUpdate` won't be called when the component/element is first rendered.

Example:
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

Parameters passed to `didUpdate`: 
* `node`: current element or component
* `key`: the name of the state that changes
* `prevValue`: the previous value of that state
* `nextValue`: the next value of the state

Example:
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