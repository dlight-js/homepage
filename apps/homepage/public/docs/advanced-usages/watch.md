It's a common need to observe the changes of a state and do something like like sending a request to the server when the state changes. This is often be called "side effect" in a functional component. Let's first not introduce `@Watch` and see how we can achieve this in DLight with previous knowledge.

Since every state or non-state is just a property in DLight, we can actually declare a property with its value being an IIFE to achieve this. For instance, if we want to send a request to the server when the `count` state changes, we can do it like this:

```js
@View
class Counter {
  count = 0
  watchCount = (() => {
    console.log(`count changed: ${this.count}`)
  })()


  Body() {
    button("click me")
      .onClick(() => {
        this.count++
      })
  }
}

```

The reason that it works is because DLight will automatically re-calculated the value of a property when its dependencies change. In this case, the `watchCount` property depends on the `count` state, so it'll be re-calculated when the `count` state changes, i.e., the IIFE will be executed again.

This perfectly works and does not have any performance issue. But DLight is a DX-first framework, we won't let some ugly code like this to be the only way to achieve this. So we introduced the `@Watch` decorator to make it more elegant:

```js
@View
class Counter {
  count = 0

  @Watch
  watchCount() {
    console.log(`count changed: ${this.count}`)
  }

  Body() {
    button("click me")
      .onClick(() => {
        this.count++
      })
  }
}
```

You can just simply declare a method with the `@Watch` decorator and it'll be executed when whichever state used in the method changes. If you want more control over the dependencies, you can also pass a list of dependency names to the `@Watch` decorator:

```js
@View
class Counter {
  @Watch("state1", "state2", "state3")
  watchCount2() {
    console.log("state1, state2 or state3 changed")
  }
}
```

But we don't recommend doing this since everybody hates the dependency array in `useEffect` in React. 
