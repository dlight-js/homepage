`Lazy` component lets you load a component only when it's needed. This is useful when you have a large component that's not needed immediately. It's also useful when you want to split your code at logical points.

# Usage
Use component without `Lazy`:
```js
import MyComp from "./MyComp.view"

@View
class App {
  Body() {
    MyComp()
  }
}
```

With `Lazy`:
```js
import { lazy } from "@dlightjs/components"
const MyComp = lazy(() => import("./MyComp.view"))

@View
class App {
  Body() {
    MyComp()
  }
}
```
With `Lazy` and loading component:
```js
import { lazy } from "@dlightjs/components"
import MyLoading from "./MyLoading.view"

const MyComp = lazy(() => import("./MyComp.view"), MyLoading)

@View
class App {
  Body() {
    MyComp()
  }
}
```