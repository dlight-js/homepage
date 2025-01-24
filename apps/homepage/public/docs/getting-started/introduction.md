
DLight.js is all about rethinking how we build user interfaces, and we're exploring new things with a fresh perspective. 

Why we're calling DLight a "DX-first" library is that you don't actually have to worry about anything in development. You don't need to care how to:
* make reactive state
* make the view re-render
* memorize computed states
* specify dependency arrays
* avoid dependency loops
* avoid a performance drop when the project scales
* ... or anything that troubles you right now

We want front-end developers to focus more on the product, pay attention to business attributes, data processing, and in-depth user interactions, rather than wasting time on building simple dynamic pages. That's exactly why DLight is here, offering the best developing experience and allowing you to code delightfully.

Here's the lowdown on what makes DLight.js tick.


# 🥳 Familiar JavaScript Syntax
In recent years, thanks to React and other frameworks, JSX has become the go-to way to build user interfaces. But here's the catch – JSX is not a silver bullet. JSX and all HTML/XML, are primarily designed for machines, not humans. The opening tag paired with a closing tag makes your code quite bulky. And we like jsx because IT'S JS, right? But the whole syntax -- to create an element, or to set a property -- isn't that JS, is it?

So, how does DLight.js handle this problem -- making UI building more js? We've done three delicate designs to approach this problem.

## Function Called View Declarations
We love to make everything a function call. It can modularize our code and simplify our life. So here in DLight, we're using a form of function calling to build UI views. Let's recall how we declare an element in jsx:
```jsx [jsx]
<div>Hello world</div>
```
This is how we do it in DLight:
```js [dlight DSL]
div("hello world")
```
It seems like we're calling a function called "div" with a string as its first paramerter. It looks very familiar because IT'S JS!

## Method Dot Chaining Properties
To be honest, setting properties in jsx is not always pleasant. And since we've gone down the path of using a function call to build views, why don't we take it one step further? In the old jsx way, we would set properties like this:
```jsx [jsx]
<div 
  className="hello-view"
  onClick={showHello}
  otherProp={yourProp}
>
  hello world
</div>
```
In jsx, we need to use a pair of `{}` to distinguish expression from string. So in DLight, we will do it in a more js way:
```js [dlight DSL]
div("hello world")
  .className("hello-view")
  .onClick(showHello)
  .otherProp(yourProp)
```
This uses dot chaining with functions. You can just keep dotting and dotting and dotting and it never ends. It looks way better than our old jsx syntax because IT'S JS!

## JS Control Flows
How long since the last time you used `for` or even `if` in js? Perhaps it's been a while, because in jsx, you don't get the chance to:
```jsx [jsx]
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
In jsx, we have to use conditional expressions and function maps. And say goodbye to our good friends, "for", and "if". This is fine when there're only a few conditions. But when things get messy, your code will, too.

And things are different in DLight, we welcome our old friends back:
```js [dlight DSL]
if (showHello) {
  div("hello")
}
for (const fruit of ["apple", "orange", "banana"]) {
  div(fruit)
}
```
Yup, I know. IT'S JS!

# 🧐 Exploring Class Components
React has had everyone buzzing about functional components in recent years. And honestly, it makes sense for React. Think about it: every time there's a re-render, it's like a cascading waterfall of function calls from top to bottom.

But when we shift gears and talk about MVVM with that signal-based reactivity, class components start looking pretty appealing. Unlike templates, which can feel kind of boxed-in and don't play nice as standard JS files, class components have this cool object-oriented vibe.

I totally get why functional programming feels right at home with MVC frameworks. It’s like painting – you add layers one by one, all in order. And data? It’s like a one-way street, following the traffic lights strictly. But MVVM? Totally different ball game. Its essence is like this web that spreads out in every direction, representing views with view-models and exchanging info between views and data sources. It’s not a straight line; it's this intricate web that’s all over the place. And that's where the magic of object-oriented class structures shines. It's like having a chat between data and views through these neat properties and reactive connections.

And if we pause and think about it, isn't the whole deal with giving side effects to pure functional components just to achieve this spontaneous chit-chat between views and data?

A quick side note here: DLight’s class components aren’t even close to React's class components, which look like a functional components dress up because of its `render` function. DLight's MVVM philosophy feels a bit closer to Angular's class component spirit. But here’s the kicker – DLight does it in a way that’s sleeker and way more developer friendly.

#  🧂 Fine-grained reactivity
Now, let's take a look at how DLight.js handles updates.

Instead of relying on a Virtual DOM, we've designed DLight.js to provide granular control over reative variable updates using signal-based reactivity. Here's how it works: each variable, if it is set to a new value or reference, will only result in the updates of its relevant elements' **properties**.

Imagine a scenario where you have multiple variables tied to different elements in your UI. When one of these variables changes, DLight.js ensures that only the elements directly affected by that variable's update undergo changes. This approach minimizes unnecessary re-renders and keeps your UI responsive and efficient.

In many UI frameworks, managing derived or computed states can be a bit of a puzzle. For example, you may need to use a "$" in svelte to set a derived reactive variable, or call a "useMemo" in React or "createMemo" in SolidJS to avoid re-render or re-calculation. While in dlight, everything becomes so intuitive. Let's take a closer look at it.

Want to declare a component?
```js
@View
class MyComp {
  Body() {
    div("hello")
  }
}
```
Want to declare a reactive variable?
```js
@View
class MyComp {
  count = 0
  Body() {
    div("hello")
    div(this.count)
  }
}
```
Want to declare a computed state?
```js
@View
class MyComp {
  count = 0
  doubleCount = this.count * 2
  Body() {
    div("hello")
    div(this.doubleCount)
  }
}
```

The whole point in designing DLight.js is to make everything intuitive. When you want to get something done in DLight, you may think "how can I do this in DLight?", and the first answer that pops into your mind has a 99% chance to be the right one.

---

Now that we've given you a taste of what DLight.js brings to the table, it's time to dive deeper. Up next, we'll walk you through the ins and outs of using DLight, making your frontend journey smoother and more enjoyable. Stay tuned, it's about to get even more exciting!
