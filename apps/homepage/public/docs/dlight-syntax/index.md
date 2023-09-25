DLight uses `class` to modular components. A basic DLight class component might look like this:

```js
@View
class MyComponent {
  Body() {
    div("hello")
  }
}
```

We use a class decorator called `@View` to identify a DLight component. All the view building parts are in the `Body` method. 

In DLight, we promote a JS-compatible DSL(Domain Specific Language). In the following sections, we'll concentrate in this UI building DSL and break it down.


