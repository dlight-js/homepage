One of the best features of **React** is its encapsulation of a certain chunk of logic into a so-called **hook**. This is a great way to modularize your code and make it more maintainable. In DLight.js, we offer a similar yet more powerful OOP way to achieve this. We call it **Models**.
# Build an example model class
A common use case is that we want to fetch some data from the server and display it in the view, with a loading state and an error state. Let's first see how we can achieve this in a regular way:
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

This obviously works, but it's not very maintainable. We have to write the same logic in every component that needs to fetch data. And if we want to change the way we fetch data, we have to change every component. This is not a good practice.

Now let's see how we can achieve this with a model. **Models are just View classes without the `Body()` method**:
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
And use it in the view:
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
Here, we use a `use` function to create an instance of the `FetchModel` class. This is similar to how you use hooks in React. The `use` function will create a new instance of the model class and return it. You can then use the instance in your view just like any other property. Any changes to the model's properties will trigger a recalculating of the model property, i.e., `this.fetchModel` in this case, which will then update the view.

# Pass data to models
You can also pass data to a model when creating an instance of it just like you do with a view component:
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
And use it in the view:
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
Here the second argument of the `use` function is an object that contains the data to be passed to the model, which will be captured by the `@Prop` decorator in the model class. Note that the third argument of the `use` function is content prop and will be captured by the `@Content` decorator in the model class, which won't be commonly used in models so let's just ignore it.

# Model lifecycle
Models have a lifecycle similar to view components. The order of the lifecycle methods is the same as view components. Consider the following example:
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
The order of the lifecycle methods will be:
```
B.willMount() -> A.willMount() -> C.willMount() -> D.willMount() 
-> D.didMount() -> C.didMount() -> A.didMount() -> B.didMount()
```

# Constraints
There's one big constraint to note: **The property that is trying to use a model must be a `use()` function call only**, i.e.,
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
This is because if we mix the `use()` function call with other expressions, it will be hard to track the reactivity of the model along with the view component and the model may be initialized multiple times, which is not what we want. By strictly enforcing this constraint, we can ensure that the model will be initialized only once per property and will be reactive to the view component.

# Nested Models
Models can be nested just like view components. Consider the following example:
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
Here, the `AdvancedFetch` model uses the `Fetch` model to fetch data. The `AdvancedFetch` model has a `fetchModel` property that is an instance of the `Fetch` model. The `AdvancedFetch` model also has a `loading`, `data`, and `error` property that are derived from the `fetchModel` property. This is similar to how you derive properties from other properties in a view component.

So now the data flow will be:
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

# Wrap up
In this section, we've talked about how to use models in DLight.js. Models are a powerful way to encapsulate a certain chunk of logic and make your code more maintainable. You can use models to fetch data, manage state, and more. Models have a lifecycle similar to view components and can be nested just like view components. We'll soon provide a [library](https://github.com/dlight-js/models) of common models for you to use in your projects just like [react-use](https://github.com/streamich/react-use). Stay tuned!
