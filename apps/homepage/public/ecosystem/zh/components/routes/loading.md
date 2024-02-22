# 路由加载
由于我们可以异步加载视图，我们需要一种方法在路由加载时显示加载视图。有两种方法可以做到这一点：


1. 设置一个RouteGroup级别的共享加载视图。这是定义加载视图的最简单方式。组内的所有路由将共享相同的加载视图。

```javascript
// ---- Prop view
RouteGroup()
  .loading(View => h1("Loading..."))
// ---- Comp view
RouteGroup()
  .loading(LoadingView)
```

2. 设置一个Route级别的加载视图。这是定义加载视图的最灵活方式。您可以为每个路由定义不同的加载视图。
```javascript
RouteGroup(); {
  Route("home")
    .comp(() => import("./Home.view"))
    .loading(HomeLoadingView)

  Route("about")
    .comp(() => import("./About.view"))
    .loading(View => h1("Loading about view"))
}
```

（如果你不知道什么是Prop View，去看Prop View文档）


