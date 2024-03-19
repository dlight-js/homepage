Snippets within a class enable developers to create reusable components efficiently within a singular class, maintaining coherent internal states. For a substantial, standalone component that may be utilized across different parts of the application, crafting a new class component would be a better option. However, when dealing with smaller, reusable UI segments that are inherently dependent on the current component’s parameters and state, leveraging subViews becomes a sound choice. 

# Creating a Snippet
To create a snippet in DLight, you can just declare a class method or a arrow function class property with a `Snippet` decorator like this:
```js
@View
class MyComp {
  @Snippet
  Hello() {
    div("hello")
  }
  Body() {
    this.Hello()
    this.Hello()
  }
}
```
It's worth noting that same with the `Body` method, you can only code in the DSL syntax DLight provides, in a snippet method.


# Passing props in a snippet
Now we've learned how to pass props to a component, but what if we want to pass props to a snippet? We can do this like:
```js
@View
class MyComp {
  Button({ content, onClick }) {
    button(content)
      .onClick(onClick)
      .class("btn")
  }
  Body() {
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

When passing props in a snippet, the `Content` is forced passed as "content" and the rest of the props are passed normally in dot chaining. Inside the snippet, you can access the props by destructuring the first parameter. Note that the first parameter is always an object pattern:
* ❌ `Button(content, onClick) {}`
* ❌ `Button(props) {}`
* ✅ `Button({ content, onClick }) {}`
* ✅ `Button({ content: text, onClick: handleClick }) {}`

Passing props to a snippet is just a way to make your snippet more reusable and flexible. We won't recommend passing too many props to a snippet since it's not the best practice to make a snippet too complex. If you need to pass too many props, you should consider creating a new component instead of a snippet.