# Route Loading
Since we can load the view asynchronously, we need a way to show a loading view when the route is being loaded. There're 2 ways to do this:

1. Setting a RouteGroup level shared loading view. This is the simplest way to define the loading view. All the routes within the group will share the same loading view.
```javascript
// ---- Prop view
RouteGroup()
  .loading(View => h1("Loading..."))
// ---- Comp view
RouteGroup()
  .loading(LoadingView)
```

2. Setting a Route level loading view. This is the most flexible way to define the loading view. You can define a different loading view for each route.
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

(if you don't know what Prop view is, please refer to the view prop documentation)
