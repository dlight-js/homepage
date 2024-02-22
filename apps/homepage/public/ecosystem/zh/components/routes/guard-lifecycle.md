# 路由守卫

路由守卫用于防止未经授权的用户访问路由。在DLight.js中设置路由守卫很简单：

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
当导航到路由时，将调用守卫函数。如果守卫函数返回一个字符串，路由器将导航到返回的路径。如果守卫函数没有返回任何内容，将像往常一样导航到该路由。如果守卫函数返回false，路由将停留在当前路径。

守卫函数有3个参数：
1. `to`: 正在导航到的路由。它是一个对象，包含：
   * `path`: 下一个绝对路径。
  * `...info`: 你在Route组件中设置的其他路由信息。
2. `from`: 你在Route组件中设置的其他路由信息。
   * `path`: 当前的绝对路径。
   * `...info`: 你在Route组件中设置的其他路由信息。
3. `baseUrl`: 路由组的基本URL。它是一个字符串，用于方便地访问路由组的基本URL。


另外，守卫函数可以是异步的。

# 路由生命周期钩子
在DLight.js中有2个`RouteGroup`级别的生命周期钩子：

1. `beforeLeave`: 这个钩子在路由被导航离开之前调用。

2. `afterEnter`: 这个钩子在路由被导航到之后调用。

钩子的参数与守卫函数相同。
```javascript
RouteGroup()
  .beforeLeave((to, from, baseUrl) => {
    console.log(`Leaving ${from.path} to ${to.path}`)
  })
  .afterEnter((to, from, baseUrl) => {
    console.log(`Entered ${to.path} from ${from.path}`)
  })
```