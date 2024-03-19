
# View-defined routes
Unlike other framework's routers that define routes in a separate file, DLight.js allows you to define routes in the view file. Which means `Router` in DLight is just a regular component. This makes it easier to manage the routes and the view together and also make all types of route reactivity available.

```javascript
import { RouteGroup, Route } from '@dlightjs/components';

@View
class MyComp {
  Body() {
    RouteGroup(); {
      Route("home"); {
        h1("Home");
      }
      Route("about"); {
        h1("About");
      }
    }
  }
}
```

Here we use `RouteGroup` to define a group of routes. All the routes within the group will share the same path prefix and some other properties like `guards` or `loading`. Then we use `Route` to define a single route. The `content` argument of `Route` is the route path, it is supposed to be a `regex` string. The default value of path is `.*`, which means it will match all the paths. 

# Route displayed view
There're 3 ways to define the view to be displayed when the route is matched:

1. Setting `Route's children`. This is the simplest way to define the view. But in a real-world application, the view may be more complex and it's better to define the view as a separate class component.
```javascript
Route("home")
{
  h1("Home")
  h2("Welcome to the home page")
}
```
2. Setting `Route.comp` with a DLight component class. This pass a DLight view class component to the route. The component will be instantiated when the route is matched.
```javascript
import HomeView from "./Home.view"
Route("home").comp(HomeView)
```
3. Setting `Route.comp` with lazy import. This is the most flexible way to define the view. It allows you to load the view asynchronously. The `lazy` function should return a promise that resolves to a view class component.
```javascript
Route("home").comp(() => import("./Home.view"))
```

# Nested routes
Just like calling regular components, you can call `RouteGroup` inside a `RouteGroup` to define nested routes. For example:
```javascript
RouteGroup(); {
  Route("admin"); {
    h1("Admin")
    RouteGroup(); {
      Route("user"); {
        h1("User")
      }
      Route("role"); {
        h1("Role")
      }
    }
  }
}
```
This will define 2 nested routes: `admin/user` and `admin/role` and they share the same view `h1("Admin")`.