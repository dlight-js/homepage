我们在日常工作中经常使用条件渲染。让我们来看看其他流行的框架如何处理这个问题。感谢 [component party](https://component-party.dev/#conditional) 提供这些示例：

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

这些框架都或多或少引入了他们自己的自定义语法来进行条件渲染。尽管这些增添的语法旨在为开发人员降低复杂性，但它们不可避免地为开发者带来了额外的学习和调整。然而，我们的方法是采用原始、未经修改的 JavaScript 语法，这就是我们最喜欢的 `if else` 语句！

上面的交通灯示例在 DLight 中将如下所示：

```js [dlight]
button("Next light")
  .onclick(nextLight)
p(`Light is: ${light}`)
p()
{
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

使用 if-else 语句，没有多余的花哨。这是开发人员长期以来一直在使用的直接逻辑。

DLight 支持所有的 `if`/`if-else`/`if-else if` 语句。当条件语句的条件改变时所有的 UI 视图将会自动渲染。这种方法不仅促进了最优实践，还确保了开发人员可以专注于逻辑和功能，而不必分心去适应新的语法规则。
