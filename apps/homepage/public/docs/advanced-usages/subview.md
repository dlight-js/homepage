
SubViews within a class enable developers to create reusable components efficiently within a singular class, maintaining coherent internal states. For a substantial, standalone component that may be utilized across different parts of the application, crafting a new class component would be a better option. However, when dealing with smaller, reusable UI segments that are inherently dependent on the current component’s parameters and state, leveraging subViews becomes a sound choice. 

# Creating a subView
To create a subView in DLight, you can just declare a class method or a arrow function class property with a `View` decorator like this:
```js
@View
class MyComp {
  @View
  Hello() {
    div("hello")
  }
  View() {
    this.Hello()
    this.Hello()
  }
}
```
It's worth noting that same with the `View` method, you can only code in the DSL syntax DLight provides, in a subView method.


# Passing props in a subView
Now we've learned how to pass props to a component, but what if we want to pass props to a subView? We can do this like:
```js
@View
class MyComp {
  Button({ content, onClick }) {
    button(content)
      .onClick(onClick)
      .class("btn")
  }
  View() {
    this.Button("alert")
      .onClick(() => {
        alert("clicked")
      })
    this.Button("console")
      .onClick(() => {
        console.log("clicked")
      })
  }
}
```

When passing props in a subView, the `Content` is forced passed as "content" and the rest of the props are passed normally in dot chaining. Inside the subView, you can access the props by destructuring the first parameter. Note that the first parameter is always an object pattern:
* ❌ `Button(content, onClick)`
* ❌ `Button(props)`
* ✅ `Button({ content, onClick })`
* ✅ `Button({ content: text, onClick: handleClick })`
