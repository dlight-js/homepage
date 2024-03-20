DLight uses `class` to modular components. A basic DLight class component might look like this:

```js
@View
class MyComponent {
  Body() {
    div("hello")
  }
}
```

We use a class decorator called `@View` to identify a DLight component. All the view building parts are in the `Body` method. It's worth noting that all "decorators" in DLight is actually NOT js decorators, you can regard them as "markers" to achieve certain behavior.

In DLight, we promote a JS-compatible DSL(Domain Specific Language). In the following sections, we'll concentrate in this UI building DSL and break it down. We'll compare DLight's DSL with some popular frameworks(react, vue, solid, svelte). We're doing this comparison not to indicate that they have a bad syntax and DLight has a better one, but to show the JS-compatible DSL and make this DSL more comprehensible if you've had experience with these existing frameworks.


