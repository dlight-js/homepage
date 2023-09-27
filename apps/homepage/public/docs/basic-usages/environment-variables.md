In modern web development, managing global or shared state efficiently is a paramount concern. Reactive variables alone inside a single component is not enough. We need a way to pass states across components and require global states. Containers of this type of state will often be called as `context` or `store`. And in DLight, we call them `environment`.

A context or store can save a group of states, and when these states change, relative views will be re-render. This will often be done in a publisher-subscriber pattern. But not this time in DLight. Before we dive into our new `environment` strategy, let's first examine how other frameworks addressed this.


```js [react]

```

```html [vue]
<template>
  <ul>
    <li
      v-for="color in colors"
      :key="color"
    >
      {{ color }}
    </li>
  </ul>
</template>
```

```js [solid]
return (
  <ul>
    <For each={colors}>{(color) => <li>{color}</li>}</For>
  </ul>
)
```

```html [svelte]
<ul>
  {#each colors as color (color)}
    <li>{color}</li>
  {/each}
</ul>
```


