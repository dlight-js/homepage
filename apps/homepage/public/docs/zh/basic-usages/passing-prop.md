# 单向还是双向呢?

将属性传递给组件意味着你可以从一个组件发送数据到另一个组件。

在过往版本的 DLight 中，我们实现了一个双向数据绑定机制，其允许在组件之间进行数据同步。尽管双向数据绑定具有一些优点，但它有时会导致数据流不清晰，从而使得代码难以维护。这就是为什么在最新版本的 DLight 中，我们决定过渡到单向数据流模型。

# 声明一个属性（props）

属性是一种将数据传递进一个组件的方法。 在 DLight 中，你可以在组件类内部使用 `@Prop` 装饰器来声明属性（props）。例如：

```js
@View
class MyComp {
  @Prop myFirstProp

  View() {
    div(this.myFirstProp)
  }
}
```

# 传递一个属性

一旦你声明了一个属性（prop），你可以在“正在使用这个组件”的其他组件内将数据传递给它。要传递一个属性，你只需要将组件视为一个函数，并使用函数点链接来为属性提供值，如下所示：

```js
@View
class App {
  View() {
    MyComp()
      .myFirstProp("this prop is declared in MyComp component")
  }
}
```

在这个示例中，我们在 `App` 组件内渲染了一个 `MyComp` 组件的实例，并将字符串 "Hello, DLight!" 作为 `myFirstProp` 属性的值传递。

当然你想声明多少属性都随你心意：

```js
@View
class MyComp {
  @Prop myFirstProp
  @Prop mySecondProp
  @Prop myThirdProp
  @Prop ...

  View() { ... }
}

@View
class App {
  View() {
    MyComp()
      .myFirstProp("1st prop")
      .mySecondProp({ value: "2nd prop" })
      .myThirdProp(3)
      ...
  }
}
```

# 内容属性

`Content` 属性允许你将**一个**内容属性直接传递给一个组件。

考虑以下例子：

```javascript
@View
class MyComp {
  @Prop @Content myContentProp

  View() {
    div(this.myContentProp)
  }
}

@View 
class App {
  View() {
    MyComp("This is content prop")
  }
}
```

`@Content` 装饰器允许你无需使用点链接而直接将内容传递给组件。在 `MyComp` 组件中，我们声明了 `@Content` `myContentProp`，表示它接受内容属性作为其值。

这并不复杂，就像 HTML 元素中的 `innerText` 一样。**不过这是一个快捷方式**! 当然，你可以使用 `div().innerText("hi")`，但是 `div("hi")` 不是更简单吗？在 DLight 中的自定义组件也是如此。

# 数据流

我们已经讨论过 DLight 遵循单向数据流的概念，这意味着数据只能从父组件流向子组件。让我们看看这个例子：

```js
@View
class MyComp {
  @Prop compCount

  View() {
    div(this.compCount)
  }
}

@View
class App {
  count = 0

  View() {
    MyComp()
      .compCount(this.count)
  }
}
```

考虑到以下的这几种情况：

* ✅ 改变 `count` 会导致 `compCount` 的改变
* ❌ 改变 `compCount` 会导致 `count` 的改变
* ✅ 改变 `compCount` 会导致 `div(this.compCount)` 的改变

那么，我们可以怎样更改 `MyComp` 组件中的 `count`，也就是从子组件去更新父组件呢？

只需像这样传递一个设置 `count` 变量的函数就可以啦：

```js
@View
class MyComp {
  @Prop changeCount

  View() {
    button("change count")
      .onclick(() => {
        this.changeCount()
      })
  }
}

@View
class App {
  count = 0

  changeCount() {
    this.count ++
  }

  View() {
    MyComp()
      .compCount(this.changeCount)
  }
}
```



<!-- ```js
@View
class MyComp {
  @Prop changeCount
  
  count = 1
  prev_cnt = this.count
  View() { 
    setInterval(() => {
      if (this.count !== this.prev_cnt) {
        this.changeCount()
        this.prev_cnt = this.count;
      }
    }, 1000);
  }
}

@View
class App {
  count = 0

  changeCount() {
    this.count ++
  }

  View() {
    MyComp()
      .compCount(this.changeCount)
  }
}
``` -->
