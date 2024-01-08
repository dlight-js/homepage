We use conditional rendering in a daily basis. And let's take a glance at how other popular frameworks approach this. Credit [component party](https://component-party.dev/#conditional) for these examples:
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

These frameworks all more or less introduced their own custom syntax to do a conditional render. While many of these additions aim to reduce the complexity for developers, they inevitably bring in a layer of learning and adjustment. However, our approach is to embrace the raw, unaltered syntax of JavaScript, which is our favorite `if else` statement!
The traffic lights example above will look like this in DLight with if statements:
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
Or with switch case statements:
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
With the if-else and switch-case statements, there are no extra frills. It’s straightforward logic that developers have been using for ages. 

DLight support all `if`/`if-else`/`if-else if`/`switch-case` statements and when the condition of the statement changes, the ui view will automatically re-render. This approach not only promotes best practices but also ensures that developers can focus on logic and functionality without the distraction of adapting to new syntax rules.