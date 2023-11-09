在 Web 开发中，“生命周期”的概念指的是组件或元素从创建到从 DOM 中移除的不同阶段。通过理解和利用这些阶段，开发者可以在精确的时刻执行特定的操作，从而提升用户体验并确保组件的高效运行。

DLight 提供了一个**真实的** 生命周期，反映了组件在屏幕上的实际可见变化。这在处理动画、数据获取或确保元素的平滑过渡时非常有帮助。

# 自定义组件的生命周期

对于自定义组件来说，有四个生命周期的方法：

* willMount: 它将会在组件渲染到 DOM 之前调用。这里非常适合用于设置初始状态或设置需要在组件显示之前触发的事件。
* didMount: 它将会在组件被渲染并成为 DOM 的一部分之后立即调用。这是那些“需要组件已经在 DOM 中”的操作被执行的理想时机，比如访问组件属性或调用 API。
* willUnmount: 它将在组件即将从 DOM 中移除之前触发。通常在这里处理清理操作，比如清除定时器或取消网络请求。
* didUnmount: 它将会在组件从 DOM 中移除后立即调用。在这里进行那些需要组件消失后才执行的最终操作。

在自定义组件内部，有两种方法来使用生命周期：

## 以类方法的形式

第一种方法是将这些生命周期钩子以方法的形式直接嵌入到自定义组件的类定义中，类似于定义类内的任何方法。

比如：

```js
@View
class MyComponent {
  willMount() {
    // This code will run just before the component mounts
  }

  didMount() {
    // This code will run right after the component mounts
  }
  // ... similarly for willUnmount and didUnmount

  Body() {...}
}
```

这种方法允许开发者将组件的逻辑、状态和与生命周期相关的操作紧凑地组织在一起，确保了代码的清晰和易维护性。

## During Component Invocation

第二种方法允许开发者在组件调用时动态地分配生命周期方法。它会在你想要提供额外行为却不想改变组件的原始类定义时特别有用。

举例：

```js
// inside Body
MyComponent()
  .willMount(() => {
    // Code to run before mounting
  })
  .didMount(() => {
    // Code to run after mounting
  });
  // ... similarly for willUnmount and didUnmount
```

这种方法，特别是当你想在不同部分的应用中重用组件时，会非常灵活。它允许开发者根据组件的使用上下文，轻松地动态调整组件的行为。

# HTML 元素中的生命周期

DLight 中的 HTML 元素有着稍微不一样的生命周期钩子：

* willAppear: 这个方法在元素被添进 DOM 之前被触发。
* didAppear: 这个方法在元素被添加进入 DOM 之后被触发。
* willDisappear: 在元素从 DOM 中移除之前会被触发。
* didDisappear: 在元素从 DOM 中被移除之后会被触发。

## 使用

与自定义组件（其生命周期方法可以在类定义中和在方法调用期间被添加）不同，DLight 中的 HTML 元素在元素声明期间会直接使用这些方法：<!--（🤔疑惑）-->

```js
div()
  .willAppear(() => {
    console.log("div will appear in the DOM!")
  })
  .didAppear(() => {
    console.log("div has appeared in the DOM!")
  })
  .willDisappear(() => {
    console.log("div will be removed from the DOM!")
  })
  .didDisappear(() => {
    console.log("div has been removed from the DOM!")
  })
```

这种机制允许开发者在元素声明的位置轻松且直观地定义生命周期行为。同时，也使得元素的生命周期方法将在何时调用以及将被如何调用一目了然。

# 小结

DLight 中的生命周期为开发者提供了在特定阶段处理组件和元素行为的细粒度，也确保了高效流畅的用户体验。
