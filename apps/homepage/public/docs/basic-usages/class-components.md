# Creating a class component
A class component in dlight presents itself as a minimal template, offering a unique blend of structure and flexibility, making the component creation process both intuitive and efficient for developers.

Read the [MDN class section](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes) to recall what a class is in Javascript since we don't use it that often.

Consider the following representation:
```js
@View
class MyComp {
  Body() {
    div("hello")
  }
}
```
Let's analyze the syntax:
* `@View`: This leading decorator is a signal to dlight that the subsequent class is purpose-built for UI representation.
* `class MyComp`: By declaring MyComp, we're stitching together the internal state, potential behaviors, and the eventual visual layout our component will exhibit.
* `Body()`: This method is **central** to the visual articulation of the component. It's here that dlight finds the blueprint of how the component should manifest on screen. Inside this Body method, you can **only code in the DLight DSL syntax** that we've described in above sections. 
* `div("hello")`: This is the DSL we've talking about.

# Elements and Components
In DLight, you work with two primary view building gadgets: Elements and Components.

Elements are the basic building blocks of your user interface. They directly render HTML elements on the screen using DLight DSL syntax. For example, `div("hello")` creates a simple `<div>` element displaying "hello".

Components are higher-level abstractions that encapsulate UI and logic. You define them as classes with the @View decorator. Components have a special Body method where you define their visual structure using DLight DSL. Components offer modularity and reusability.

This is a simple example of how you combine elements and components:
```js
@View
class MyComp1 {
  Body() {
    div("hello")
    img()
      .src("/dlight-logo.png")
  }
}

@View
class MyComp2 {
  Body() {
    h1("This is a big title!")
  }
}

@View
class MyComp3 {
  Body() {
    div()
    {
      span("hello")
      "world"
    }
  }
}

@View
class App {
  Body() {
    MyComp1()
    p("below is comp2")
    MyComp2()
    MyComp3()
  }
}

```

# Subviews
Subviews within a class enable developers to create reusable components efficiently within a singular class, maintaining coherent internal states. For a substantial, standalone component that may be utilized across different parts of the application, crafting a new class component would be a better option. However, when dealing with smaller, reusable UI segments that are inherently dependent on the current component’s parameters and state, leveraging subviews becomes a sound choice. 

To create a subview in dlight, you can just declare a class method or a arrow function class property with a `View` decorator like this:
```js
@View
class MyComp {
  @View
  Hello() {
    div("hello")
  }
  Body() {
    this.Hello()
    this.Hello()
  }
}
```
It's worth noting that same with the `Body` method, you can only code in the DSL syntax DLight provides, in a subview method.

