# Uni- or Bi-directional?
Passing properties to components means that you can send data from one component to another.

In previous versions of DLight, we implemented a bidirectional data binding mechanism, which allowed for data synchronization between components. While bidirectional data binding has its advantages, it can sometimes lead to unclear data flow and make the codebase harder to maintain. That's why we have decided to transition to a unidirectional data flow model in the latest version of DLight.

# Declaring a prop
Props are a way to pass data into a component. In DLight, you can declare props using the @Prop decorator within a component class. For example:
```js
@View
class MyComp {
  @Prop myFirstProp

  Body() {
    div(this.myFirstProp)
  }
}
```

# Passing a prop
Once you've declared a prop, you can pass data to it inside other components that are using this component. To pass a prop, you simply call the component as a function and provide the value for the prop with function dot chaining as shown below:
```js
@View
class App {
  Body() {
    MyComp()
      .myFirstProp("this prop is declared in MyComp component")
  }
}
```
In this example, we're rendering an instance of the `MyComp` component within the `App` component and passing the string "Hello, DLight!" as the value for the `myFirstProp` prop.

And sure you can declare as many properties as you like:
```js
@View
class MyComp {
  @Prop myFirstProp
  @Prop mySecondProp
  @Prop myThirdProp
  @Prop ...

  Body() { ... }
}

@View
class App {
  Body() {
    MyComp()
      .myFirstProp("1st prop")
      .mySecondProp({ value: "2nd prop" })
      .myThirdProp(3)
      ...
  }
}
```

# Content prop
Content prop allows you pass **one** content prop directly to a component.

Consider the following example:

```javascript
@View
class MyComp {
  @Prop @Content myContentProp

  Body() {
    div(this.myContentProp)
  }
}

@View 
class App {
  Body() {
    MyComp("This is content prop")
  }
}
```

The `@Content` decorator allows you to directly pass content to the component without the need for dot chaining. In the MyComp component, `@Content` myContentProp is declared, indicating that it accepts content prop as its value. It's nothing complicated and just like `innerText` in an HTML Element. **It's a shortcut!** Of course you can do `div().innerText("hi")`, but isn't `div("hi")` much simpler? So is the case with custom components in DLight.


# Data flow
We've already talked about DLight adhering to the concept of unidirectional data flow, which means that data flows in one direction, from parent components to child components. Let's take a look at this example:
```js
@View
class MyComp {
  @Prop compCount

  Body() {
    div(this.compCount)
  }
}

@View
class App {
  count = 0

  Body() {
    MyComp()
      .compCount(this.count)
  }
}
```
Consider the following statements:
* ✅ change `count` will cause `compCount` change 
* ❌ change `compCount` will cause `count` change 
* ✅ change `compCount` will cause `div(this.compCount)` change

Then how can we change `count` in the `MyComp` component, which means updating the Parent from the Child?

Just pass a function that sets the `count` variable like this:

```js
@View
class MyComp {
  @Prop changeCount

  Body() {
    button("change count")
      .onclick(() => {
        this.changeCount()
      })
  }
}

@View
class App {
  count = 0

  changeCount() {
    this.count ++
  }

  Body() {
    MyComp()
      .compCount(this.changeCount)
  }
}
```