In DLight's DSL, HTML elements are articulated as function calls:
```js
div("hello")
span(":D")
```
The first parameter in this HTMLNode function call would be its `textContent`, so the DSL above can be rendered to an html that looks like this:
```html
<div>hello</div>
<span>:D</span>
```
# Property
Setting a html object property(not html attribute) is simple enough. We're using method's dot chaining to set properties:
```js
img()
  .src("/dlight-logo.jpg")
  .alt("DLight Logo")
```
And this will be mounted to the DOM as:
```html
<img src="/dlight-logo.jpg" alt="DLight Logo">
```
# Style
You can set any property in DLight as described above. So you can give elements styles by manipulating their `class` and `style` properties.
```js
div("hello")
  .class("hello-cls")
  .style({
    color: "red"
  })
```
Also, the `style` property accepts an object of style, basically it's doing:
```js
Object.assign(el.style, styleObj)
```

# Event
Everything that refers to a property of a dlight node will be represented as a dot chaining function, so will be events. Adding an `on` in front of the event name, and you're all set.
```js
button("click")
  .onClick(() => {
    console.log("CLICKED!")
  })
  .onYourEvent(yourCustomFunc)
```
Note that all event name will be forced lowercased, e.g., `onYourEvent` -> `yourevent`.

# Children
We're using a block statement to nest children elements. For instance, if you want to get an HTML structure like this:
```html
<div id="0">
  <div id="1">child1</div>
  <div id="2">child2</div>
</div>
```
you'll be coding like this in DLight:
```js
div().id("0"); {
  div("child1")
    .id("1")
  div("child2")
    .id("2")
}
```
This `{}` is a block statement in js that we use to minimize a scope(we don't actually do this often, so you can just view it as function body block). And in DLight, we're using this to denote **a scope of elements**. In this case, this scope of elements is the children scope of the last declared DLight HTMLNode, which is `div0`. 

Noting that because of already setting children to `div0`, so the first parameter of function div, i.e. innerText, will be discarded automatically, which means it won't matter if you're setting it like
```js
div("I want to display this")
  .id("0")
{ ... }
```
or
```js
div("But I can't")
  .id("0")
{ ... }
```
# Children addon
Besides the block statement, we also provide a so called `PropView` way to set children. This is a community-driven feature to align all the prop-settings at the end of the element. For example, if you want to set a `div` with a group of `span` children, you can do it like this:
```js
div(View => {
  span("child1")
    .id("child1")
  span("child2")
    .id("child2")
    .class("child2-cls")
  span("child3")
    .id("child3")
    .class("child3-cls")
})
  .id("parent")
  .class("parent-cls")
```
# Wrap Up
Hey, in DLight, how can I
* create a div element with its textContent as "hi, dlight"?
```js
div("hi, dlight")
```
* add a blue text that shows `count` and a button to increase it?
```js
div(this.count)
  .style({
    color: "blue"
  })
button("+")
  .onClick(() => {
    this.count ++
  })
```
* add children to my `container` element?
```js
div()
  .id("container")
{
  div("child1")
  div("child2")
}
```
or
```js
div(View => {
  div("child1")
  div("child2")
})
  .id("container")
```
* nest three levels of children elements?
```js
div().id("level1"); {
  div().id("level2-0"); {
    div().id("level3")
  }
  div().id("level2-1")
}
```
or
```js
div(View => {
  div(View => {
    div().id("level3")
  })
  div().id("level2-1")
})
  .id("level1")
```