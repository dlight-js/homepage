# 哈希模式
默认情况下，路由器使用`history`模式。如果您想使用`hash`模式：

```javascript
RouteGroup().mode("hash")
```

# Link
链接是一个组件，允许你导航到一个路由。它也由`@dlightjs/components`包提供。

`Link`是一个接受`to`、`mode`、`style`和`class`属性的`a`标签。您可以通过传递子元素或content属性来设置这个`a`元素的子元素。


```javascript
import { Link } from "@dlightjs/components"
@View
class MyComp {
  View() {
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

`to`属性可以是:
* 绝对路径: `/about`
* 相对路径: `about`, `./about`, `../about`, `~/about`


# Navigator
导航器是一个以编程方式导航到路由的工具：

```javascript
import { Navigator } from "@dlightjs/components"
@View
class MyComp {
  navigator = new Navigator()
  View() {
    h1("Home")
    button("Go to about")
      .onClick(() => this.navigator.to("/about"))
  }
}
```
如果你的组件位于RouteGroup内，您也可以从环境中获取导航器：

```javascript
@View
class MyComp {
  @Env navigator
  View() {
    h1("Home")
    button("Go to about")
      .onClick(() => navigator.to("/about"))
  }
}
```