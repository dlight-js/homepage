
React最佳功能之一是其将特定逻辑块封装成所谓的**钩子**（hook）。这是一种模块化代码并使其更易于维护的绝佳方式。在DLight.js中，我们提供了一种类似但更强大的面向对象编程（OOP）方式来实现这一点。我们称之为**模型**（Models）。

# 构建一个模型类示例
一个常见的用例是，我们想从服务器获取一些数据，并在视图中显示它，同时具有加载状态和错误状态。让我们首先看看如何以常规方式实现这一点：
```js
@View
class MyComp {
  loading = true
  error = null
  data = null

  async willMount() {
    try {
      const res = await fetch("https://api.example.com/data")
      const data = await res.json()
      this.data = data
    } catch (e) {
      this.error = e
    } finally {
      this.loading = false
    }
  }

  Body() {
    if (this.loading) {
      Loading()
    } else if (this.error) {
      ErrorPage()
    } else {
      DataPage(this.data)
    }
  }
}
```

这显然是可行的，但并不是很易于维护。我们必须在每个需要获取相同数据的组件中编写相同的逻辑。如果我们想要改变获取数据的方式，我们就必须修改每个组件。这不是一个好的做法。

现在让我们看看如何通过模型来实现这一点。**模型只是没有 `Body()` 方法的视图类**：
```js
@Model
class FetchModel {
  loading = true
  error = null
  data = null

  async willMount() {
    try {
      const res = await fetch("https://api.example.com/data")
      const data = await res.json()
      this.data = data
    } catch (e) {
      this.error = e
    } finally {
      this.loading = false
    }
  }
}
```
在view里使用它:
```js
@View
class MyComp {
  fetchModel = use(FetchModel)

  Body() {
    if (this.fetchModel.loading) {
      Loading()
    } else if (this.fetchModel.error) {
      ErrorPage()
    } else {
      DataPage(this.fetchModel.data)
    }
  }
}
```

在这里，我们使用 `use` 函数创建一个 `FetchModel` 类的实例。这与你在React中使用钩子的方式类似。 `use` 函数将创建一个模型类的新实例并返回它。然后你可以像使用其他属性一样在你的视图中使用这个实例。模型属性的任何更改都将触发模型属性的重新计算，即在这种情况下的 `this.fetchModel` ，然后更新视图。

# 向模型传递数据
当创建模型的实例时，你可以像在视图组件中一样向模型传递数据：
```js
@Model
class FetchModel {
  @Prop url
  loading = true
  error = null
  data = null

  // ---- Use a watcher to fetch data when the url prop changes
  @Watch
  async fetch() {
    this.loading = true
    try {
      const res = await fetch(this.url)
      const data = await res.json()
      this.data = data
    } catch (e) {
      this.error = e
    }
    this.loading = false
  }
}
```
在view里使用它:
```js
@View
class MyComp {
  fetchModel = use(FetchModel, { url: "https://api.example.com/data" })

  Body() {
    if (this.fetchModel.loading) {
      Loading()
    } else if (this.fetchModel.error) {
      ErrorPage()
    } else {
      DataPage(this.fetchModel.data)
    }
  }
}
```

这里， `use` 函数的第二个参数是一个包含要传递给模型参数的对象，这将被模型类中的 `@Prop`装饰器捕获。注意， `use`函数的第三个参数是内容参数，将被模型类中的 `@Content` 装饰器捕获，这在模型中不常用，所以我们就忽略它。

# 模型的生命周期
模型具有与视图组件相似的生命周期。生命周期方法的顺序与视图组件相同。参考以下示例：
```js
@View
class A {
  model = use(B)

  Body() {
    C()
    D()
  }
}
```
生命周期的顺序将会是：
```
B.willMount() -> A.willMount() -> C.willMount() -> D.willMount() 
-> D.didMount() -> C.didMount() -> A.didMount() -> B.didMount()
```

# 约束
有一个重要的约束需要注意： **使用模型必须且仅能调用 `use()` 方法**，即：
```js
@View
class A {
  // ✅
  model1 = use(B) 
  // ✅
  model2 = use(B, { url })
  // ❌
  model3 = new B()
  // ❌
  model4 = url && use(B, { url })
  // ❌
  model5 = calculate(use(B))

  Body() {
    C()
    D()
  }
}
```

这是因为如果我们将 `use()` 函数调用与其他表达式混合，将很难跟踪模型与视图组件的反应性，且模型可能会被多次初始化，这不是我们想要的。通过严格执行这个约束，我们可以确保模型每个属性只初始化一次，并且对视图组件具有reactive的控制。

# 嵌套模型
模型可以像视图组件一样进行嵌套。参考以下示例：
```js

@Model
class Fetch {
  @Prop url
  loading = false
  data = null
  error = null

  @Watch
  async fetch() {
    this.loading = true
    try {
      const res = await fetch(this.url)
      this.data = await res.json()
    } catch (e) {
      this.error = e
    }
    this.loading = false
  }
}

@Model
class AdvancedFetch {
  baseUrl = "https://dlight.dev/api/"
  @Prop path
  // ---- Use Fetch model to fetch data
  fetchModel = use(Fetch, { url: this.baseUrl + this.path })

  loading = this.fetchModel.loading
  data = this.processData(this.fetchModel.data)
  error = this.fetchModel.error

  processData(data) {
    console.log("processing data...", data)
    return data
  }
}
```
在这里， `AdvancedFetch` 模型使用 `Fetch` 模型来获取数据。 `AdvancedFetch` 模型有一个 `fetchModel` 属性，这是 `Fetch` 模型的一个实例。 `AdvancedFetch` 模型还有 `loading`、 `data` 和 `error` 属性，这些属性来自于 `fetchModel` 属性。这类似于你在视图组件中从其他属性派生属性的方式。

因此，现在数据流将是：
```
AdvancedFetch.path[changed] -> 
AdvancedFetch.fetchModel.url[changed] -> 
Fetch.fetch()[called] -> (
  Fetch.loading[changed] +
  Fetch.data[changed] +
  Fetch.error[changed]
) -> AdvancedFetch.fetchModel[changed] -> (
  AdvancedFetch.loading[changed] +
  AdvancedFetch.data[changed] +
  AdvancedFetch.error[changed]
)
```

# 总结
在本节中，我们讨论了如何在DLight.js中使用模型。模型是封装特定逻辑块并使你的代码更加可维护的强大方式。你可以使用模型来获取数据、管理状态等。模型有一个类似于视图组件的生命周期，并且可以像视图组件一样进行嵌套。我们很快就会提供一个常用模型的[库](https://github.com/dlight-js/models)，供你在项目中使用，就像[react-use](https://github.com/streamich/react-use)一样。敬请期待！