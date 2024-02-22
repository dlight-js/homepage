
# 动态路由

由于dlight的路由器接受的路径是一个regex字符串，您可以使用正则表达式定义动态路由。例如，您可以定义一个与所有以2024结尾的路径匹配的路由，如下所示：

```javascript
Route(".*2024")
{
  h1("2024")
}
```
我们在这里使用正则表达式的原因是它更灵活、更强大，我不想引入新的语法来定义动态路由。

如果你不知道如何编写正则表达式，[regex101](https://regex101.com/)可以帮助你。

请你学学正则表达式，它非常强大。

# 重定向
在web应用程序中，重定向是一个常见的用例。在DLight.js中定义重定向非常简单：

```javascript
Route("admin")
  .redirect("~/login")
Route("admin2")
  .redirect("../login")
```


# 路径参数
一个常见的用例是您想向路由传递一些参数，比如`user/[id]`。在正则表达式中有一个称为`命名捕获组`的捕获规则，允许您捕获路径的匹配部分并命名它。您可以使用命名捕获组来定义路径参数。例如：


```javascript
Route("user/(?<id>.*)").comp(UserView)
// or
Route("user/(?<id>.*)").comp(() => import("./User.view"))
```

在`UserView`中，您可以像普通的DLight属性一样获取`id`：

```javascript
@View
class UserView {
  @Prop id
  View() {
    h1(`User ${this.id}`)
  }
}
```

# 路由信息
你可以为路由设置一些路由信息。路由信息是一个普通对象，并且可以在路由生命周期钩子中访问。例如：

```javascript
Route("home")
  .info({ title: "Home", unauthorized: false })
```
理论上，在其他框架中称为`meta`。但在DLight中，你可以设置reactive路由信息。这就是为什么我称之为`info`而不是`meta`。



# 路径环境
在`RouteGroup`内使用的每一个组件中，你可以从环境中获取当前路径：

```javascript
@View
class MyComp {
  @Env path
  View() {
    h1(`Current path: ${path}`)
  }
}
```

