# Basic
In DLight's DSL, HTML elements are articulated as function calls:
```js
div("hello")
span(":D")
```
The first parameter in this HTMLNode function call would be its `innerText`, so the DSL above can be rendered to an html that looks like this:
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
<div class="hello-cls" style="color: red">hello</div>
<img src="/dlight-logo.jpg" alt="DLight Logo">
```
# Style
You can set any property in DLight as described above. So you can give elements styles by manipulating their `className` and `style` properties.
```js
div("hello")
  .className("hello-cls")
  .style({
    color: "red"
  })
```
It's worth noting that in DLight, property "className" accepts following data types: `string | undefined | null | (string | undefined | null)[]`, so you can set multiple classes by either:
```js
div(":D")
  .className("dlight-cls")
  .className("hello-cls")
  .className(myClsName)
```
or
```js
div(":D")
  .className(["dlight-cls", "hello-cls", myClsName])
```
Also, the `style` property accepts an object of style, basically it's doing:
```js
for (const [key, value] of Object.entries(styleObj)) {
  element.style[key] = value
}
```

# Event
Everything that refers to a property of a dlight node will be represented as a dot chaining function, so will be events. Adding an `on` in front of the event name, and you're all set.
```js
button("click")
  .onclick(() => {
    console.log("CLICKED!")
  })
  .onyourevent(yourCustomFunc)
```
You might wonder why it's `onclick` or `onevent` unlike React using `onClick`. Well, it could be, we're currently using all lower cased events because it's the event naming convention in vanilla js. But I'm doing a poll on [[🧐] onClick or onclick, that's a question](https://github.com/dlight-js/dlight/issues/49). Feel free to choose the one you like!


# Children
We're using a block statement to nest children elements. For instance, if you want to get an HTML structure like this:
```html
<div>
  <div>child1</div>
  <div>child2</div>
</div>
```
you'll be coding like this in DLight:
```js
div()
  .id("0")
{
  div("child1")
    .id("1")
  div("child2")
    .id("2")
}
```
So `{}` is a block statement in js that we use to minimize a scope(we don't actually do this often, so you can just view it as function body block). And in DLight, we're using this to denote **a scope of elements**. In this case, this scope of elements is the children scope of the last declared DLight HTMLNode, which is `div0`. 

Noting that because of already setting children to `div0`, so the first parameter of function div, i.e. innerText, will be discarded automatically, which means it won't matter if you're setting it like
```js
div("I want to show this")
  .id("0")
{ ... }
```
or
```js
div("But I can't")
  .id("0")
{ ... }
```

# Wrap Up
Hey, in DLight, how can I
* create a div element with its innertext "hi, dlight"?
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
  .onclick(() => {
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
* nest three levels of children elements?
```js
div().id("level1")
{
  div().id("level2-0")
  {
    div().id("level3")
  }
  div().id("level2-1")
}
```