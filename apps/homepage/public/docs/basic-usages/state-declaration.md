# Rethinking State Variables
Imagine a world where managing state in your app is as easy as declaring a variable - no fanfare, no special treatment. Just declare it, use it in the view, and voilà, any changes to the variable automatically update the view. Sounds nice, doesn't it?

Because at its core, what is state? It’s a variable that, when changed, should naturally cause the view to update. It's unique but not THAT unique. It should be as straightforward to use as any other variable in your code.

Now, we’ve seen this story unfold in different ways in the realm of frontend frameworks. Most ask for a little too much ceremony like `useState()` or `ref()` or other forms of declaration, while others like Svelte made a bold step towards simplicity. But even with Svelte’s ease of use, there's a hiccup when dealing with computed states, needing that extra bit of special attention like this:
```js [svelte]
let count = 0;
$: doubled = count * 2;
```
That’s where dlight shines brightly, effortlessly merging simplicity and functionality in state management. But how does it achieve this and how can you make the most of it? Let’s dive into the details and get you up to speed with making the most of state in dlight!

# Declare a State
Declare a state in a DLight class component is straightforward:
```js
@View
class Counter {
  count = 0

  Body() {
    div(this.count)
    button("+")
      .onClick(() => {
        this.count ++
      })
  }
}
```
You just declare a regular class property, and it's done! You don't need to distinguish it from other non-ui-rendering variables. Because the core of DLight's state management is that every property is and is not a state! You've used it in the view? Then yes it is. You don't use it in the view? Okay it's not.

# Computed State
Declare a computed state in a DLight class component is again straightforward as hell:
```js
@View
class Counter {
  count = 0
  doubleCount = this.count * 2

  Body() {
    div(this.doubleCount)
      .onClick(() => {
        this.count ++
      })
  }
}
```
The whole point of DLight being a DX-first library is that you don't feel a thing. You don't need to add extra steps to accomplish what you should've accomplished from the beginning. So you also don't need a `useMemo()` or `createMemo()` to reduce re-render or re-calculation because DLight does it for you automatically. Calculated once, used everywhere. Finest granularity, no extra effort. Intuitive is the key.