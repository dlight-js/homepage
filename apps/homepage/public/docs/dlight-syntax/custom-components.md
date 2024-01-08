In this section, we'll not walk you through how to build a custom component. Instead, a detailed DSL that will give you an idea of how to **access** a custom component will be presented.

Let's say that we've already build a `Counter` component like this:

```js
@View
class Counter {
  count = 0
  View() {
    div(this.count)
    button("+")
      .onClick(() => {
        this.count ++
      })
  }
}
```
Then how can we use this component inside our other components? The answer is **function call** + **dot chaining** just like we did in html elements:
```js
Counter()
```
This is it. "Where is the `new` keyword since it's a class in js?", you may ask. Yes it's a class, but we use some compiling tricks to automatically generate it in the build time. The reason is pretty obvious, we want to make our code as clean as possible. `new Counter()` is not consistent with html elements calling like `div()` and is really ugly. That's why it's in the form of a function calling.

# Property
Passing props to custom components is the same with passing them to html elements. The first parameter of the function will be the `content` prop and the dot chaining props will be the rest. We'll break down what does `content` and other props mean in basic-usages section. So just hold on tight and see how we use them for now:
```js
Counter("some text")
// -> content = "some text"
```
```js
Counter()
  .count(1)
  .otherProp({ good: true })
// -> count = 1
// -> otherProp = { good: true }
```


# Children / Slot
Same with children elements too, custom components can access their children by us using a block statement to scope a group of elements.
```js
Counter(); {
  div("hello counter, I'm your child")
  MyOtherComp("true dude")
}
```