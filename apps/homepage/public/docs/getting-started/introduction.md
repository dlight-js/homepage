
DLight.js is all about rethinking how we build user interfaces, and we're exploring new things with a fresh perspective. Here's the lowdown on what makes DLight.js tick.


# Familiar JavaScript Syntax
In recent years, thanks to React and other frameworks, JSX has become the go-to way to build user interfaces. But here's the catch – JSX is not a silver bullet. JSX and all HTML/XML, are primarily designed for machines, not humans. The opening tag paired with a closing tag makes your code quite bulky. And we like jsx because IT'S JS, right? But the whole syntax -- to create an element, or to set a property -- isn't that JS, is it?

So, how does DLight.js handle this problem -- making UI building more js? We've done three delicate designs to approach this problem.
## Function Called View Declarations
We love to make everything a function and just call it. It can modular our code and simpler our life. So here in DLight, we're using a way of "function-call" to build ui views. Let's recall how we declare an element in jsx:
```html
<div>Hello world</div>
``` 
This is how we do it in DLight:
```js
div("hello world")
```
It seems like we're calling a function called "div" with a string as its first paramerter. It looks very familiar because IT'S JS!
## Method Dot Chaining Properties
To be honest, setting properties in jsx is not always pleasant. And since we've go down to use a function call to build views, why don't we take it one step further? In an old jsx way, we set properties like this:
```html
<div 
  className="hello-view"
  onClick={showHello}
  otherProp={yourProp}
>
  hello world
</div>
```
It's quite neat for a machine-oriented language to be honest, but here comes DLight:
```js
div("hello world")
  .className("hello-view")
  .onClick(showHello)
  .otherProp(yourProp)
```
That's the dot chaining of a function. You can just keep dotting and dotting and dotting and it never ends. It looks way better than our old jsx not only because you don't need to distinguish a js variable from a plain string to wrap it with "{}", but also because IT'S JS!

## JS Control Flows
How long since the last time you used `for` or even `if` in js? Because in jsx, you don't get the chance to:
```html
<>
  { showHello ? <div>hello</div> : null }
  {
    ["apple", "orange", "banana"]
      .map(fruit => (
        <div>{fruit}</div>
      ))
  }
</>
```
In jsx, we just have to use conditional statements and function maps, and say goodbye to our good friends "for" and "if". But things are different in DLight, we welcome our old friends back:
```js
if (showHello) {
  div("hello")
}
for (const fruit of ["apple", "orange", "banana"]) {
  div(fruit)
}
```
Yes, I know it's amazing. Because IT'S JS!
# DLight 
# Why DLight
# When DLight