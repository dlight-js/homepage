# Route guards
Route guards are used to protect the route from being accessed by unauthorized users. Setting a guard to a route is simple in DLight.js:

```javascript
RouteGroup()
  .guard((to, from, baseUrl) => {
    if (to.path === "/admin" && !user.isAdmin) {
      return "/login"
    }
    // ---- unauthorized is set by YOU!
    if (to.unauthorized) {
      return false
    }
  })
```
The guard function will be called when the route is being navigated to. If the guard function returns a string, the router will navigate to the returned path. If the guard function returns nothing, the route will be navigated to as usual. If the guard function returns false, the route will stay at the current path.

The guard function has 3 arguments:
1. `to`: The route that is being navigated to. It's an object that contains:
   * `path`: Next absolute path.
  * `...info`: Other route information set by the you in the `Route` component.
2. `from`: The route that is being navigated from. It's an object that contains:
   * `path`: Current absolute path.
   * `...info`: Other route information set by the you in the `Route` component.
3. `baseUrl`: The base url of the route group. It's a string and meant to conveniently access the base url of the route group.
 
Also, the guard function can be async.

# Route lifecycle hooks
There're 2 RouteGroup level lifecycle hooks in DLight.js:

1. `beforeLeave`: This hook is called before the route is navigated away from. 

2. `afterEnter`: This hook is called after the route is navigated to. 

Parameters of the hooks are the same as the guard function.
```javascript
RouteGroup()
  .beforeLeave((to, from, baseUrl) => {
    console.log(`Leaving ${from.path} to ${to.path}`)
  })
  .afterEnter((to, from, baseUrl) => {
    console.log(`Entered ${to.path} from ${from.path}`)
  })
```