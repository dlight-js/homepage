
# 视图定义路由
不同于其他框架的路由器需要在一个单独的文件中定义路由，DLight.js允许您在视图文件中定义路由。这意味着在DLight中的Router只是一个常规组件。这使得管理路由和视图变得更加容易，并且也使得所有类型的路由响应性变得可用。


```javascript
import { RouteGroup, Route } from '@dlightjs/components';

@View
class MyComp {
  View() {
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

这里我们使用RouteGroup来定义一组路由。组内的所有路由将共享相同的路径前缀和一些其他属性，如guards或loading。然后我们使用Route来定义单个路由。Route的content参数是路由路径，它应该是一个regex字符串。路径的默认值是.*，这意味着它将匹配所有的路径。

# 路由显示视图
有3种方式定义当路由匹配时要显示的视图：


1. 设置Route的子元素。这是定义视图的最简单方式。但在现实世界的应用程序中，视图可能更复杂，最好将视图定义为一个单独的类组件。
```javascript
Route("home")
{
  h1("Home")
  h2("Welcome to the home page")
}
```
2. 通过Route.comp设置一个DLight组件类。这将一个DLight视图类组件传递给路由。当路由匹配时，该组件将被实例化。

```javascript
import HomeView from "./Home.view"
Route("home").comp(HomeView)
```
3. 通过Route.comp使用懒加载设置。这是定义视图的最灵活的方式。它允许您异步加载视图。lazy函数应该返回一个promise，该promise解析为一个视图类组件。
```javascript
Route("home").comp(() => import("./Home.view"))
```

# 嵌套路由
就像调用常规组件一样，您可以在RouteGroup内部调用RouteGroup来定义嵌套路由。例如：

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
这将定义2个嵌套路由：`admin/user`和`admin/role`，它们共享相同的视图`h1("Admin")`。