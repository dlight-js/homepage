我们每天都在使用条件渲染。让我们来看看其他流行的框架是如何处理这一点的。感谢 [component party](https://component-party.dev/#conditional) 提供这些例子:
```js [react]
return (
  <>
    <button onClick={nextLight}>Next light</button>
    <p>Light is: {light}</p>
    <p>
      You must
      {light === "red" && <span>STOP</span>}
      {light === "orange" && <span>SLOW DOWN</span>}
      {light === "green" && <span>GO</span>}
    </p>
  </>
)
```

```js [vue]
<template>
  <button @click="nextLight">Next light</button>
  <p>Light is: {{ light }}</p>
  <p>
    You must
    <span v-if="light === 'red'">STOP</span>
    <span v-else-if="light === 'orange'">SLOW DOWN</span>
    <span v-else-if="light === 'green'">GO</span>
  </p>
</template>
```

```js [solid]
return (
  <>
    <button onClick={nextLight}>Next light</button>
    <p>Light is: {light()}</p>
    <p>
      You must
      <Switch>
        <Match when={light() === "red"}>
          <span>STOP</span>
        </Match>
        <Match when={light() === "orange"}>
          <span>SLOW DOWN</span>
        </Match>
        <Match when={light() === "green"}>
          <span>GO</span>
        </Match>
      </Switch>
    </p>
  </>
)
```

```js [svelte]
<button on:click={nextLight}>Next light</button>
<p>Light is: {light}</p>
<p>
  You must
  {#if light === "red"}
    <span>STOP</span>
  {:else if light === "orange"}
    <span>SLOW DOWN</span>
  {:else if light === "green"}
    <span>GO</span>
  {/if}
</p>
```

这些框架或多或少都引入了它们自己的自定义语法来进行条件渲染。虽然这些新增功能旨在减少开发者的复杂性，但它们不可避免地带来了学习和调整的层面。然而，我们的方法是拥抱原生的、未经修改的JavaScript语法，这就是我们最喜欢的`if else`语句！
上面的交通灯示例在DLight中使用if语句将会是这样的：
```js [dlight]
button("Next light").onclick(nextLight)
p(`Light is: ${light}`)
p(); {
  "You must"
  if (light === "red") {
    span("STOP")
  } else if (light === "orange") {
    span("SLOW DOWN")
  } else if (light === "greed") {
    span("GO")
  }
}
```
或者使用 switch case 语句：
```js [dlight]
button("Next light").onclick(nextLight)
p(`Light is: ${light}`)
p(); {
  "You must"
  switch (light) {
    case "red":
      span("STOP")
      break
    case "orange":
      span("SLOW DOWN")
      break
    case "greed":
      span("GO")
  }
}
```
使用 if-else 和 switch-case 语句，没有额外的语法。这是开发者多年来一直使用的逻辑。

DLight 支持所有的 `if`/`if-else`/`if-else if`/`switch-case` 语句，当语句的条件改变时，UI 视图将自动重新渲染。这种方法不仅推广了最佳实践，还确保开发者可以专注于逻辑和功能，而不是分心适应新的语法规则。