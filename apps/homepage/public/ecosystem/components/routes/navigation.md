
# Hash mode
By default, the router uses the `history` mode. If you want to use the `hash` mode:
```javascript
RouteGroup().mode("hash")
```

# Link
Link is a component that allows you to navigate to a route. It's also provided by `@dlightjs/components` package. 

`Link` is an `a` tag that accepts props: `to`, `mode`, `style` and `class`. You can set the children of this `a` element by either passing the children or the content prop.
```javascript
import { Link } from "@dlightjs/components"
@View
class MyComp {
  Body() {
    Link("Content").to("/about")
    // or
    Link()
      .to("/about")
    {
      h1("Content")
    }
  }
}
```

The `to` prop can be:
* Absolute path: `/about`
* Relative path: `about`, `./about`, `../about`, `~/about`


# Navigator
The navigator is a tool to navigate to a route programmatically:
```javascript
import { Navigator } from "@dlightjs/components"
@View
class MyComp {
  navigator = new Navigator()
  Body() {
    h1("Home")
    button("Go to about")
      .onClick(() => this.navigator.to("/about"))
  }
}
```

You can also get the navigator from the environment if your component's inside a `RouteGroup`:
```javascript
@View
class MyComp {
  @Env navigator
  Body() {
    h1("Home")
    button("Go to about")
      .onClick(() => navigator.to("/about"))
  }
}
```