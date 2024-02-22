
# Dynamic routes
Since the path dlight's router accepts is a regex string, you can use regex to define dynamic routes. For example, you can define a route that matches all the paths that ends with 2024 like this:
```javascript
Route(".*2024")
{
  h1("2024")
}
```
The reason why we use regex here is that it's more flexible and powerful and I don't want to introduce a new syntax to define dynamic routes.

If you don't know how to write regex, [regex101](https://regex101.com/) is here to help you. 

And please learn regex, it is SO VERY powerful.

# Redirect
Redirect is a common use case in a web application. It's really simple to define a redirect in DLight.js:
```javascript
Route("admin")
  .redirect("~/login")
Route("admin2")
  .redirect("../login")
```


# Path parameters
There's a common use case that you want to pass some parameters to the route like `user/[id]`. There's a capturing rule in the regex called `named capturing group` that allows you to capture the matched part of the path and name it. You can use the named capturing group to define the path parameters. For example:
```javascript
Route("user/(?<id>.*)").comp(UserView)
// or
Route("user/(?<id>.*)").comp(() => import("./User.view"))
```
In the `UserView`, you can get the `id` jus like a regular DLight prop:
```javascript
@View
class UserView {
  @Prop id
  View() {
    h1(`User ${this.id}`)
  }
}
```

# Route info
You can set some route information to the route. The route information is a plain object and can be accessed in the route lifecycle hooks. For example:
```javascript
Route("home")
  .info({ title: "Home", unauthorized: false })
```
Technically, it's called `meta` in other frameworks. But here in DLight you can set `reactive` route information. That's why I call it `info` instead of `meta`.


# Path environment
In every one of your components used inside a `RouteGroup`, you can get the current path from the environment:
```javascript
@View
class MyComp {
  @Env path
  View() {
    h1(`Current path: ${path}`)
  }
}
```

