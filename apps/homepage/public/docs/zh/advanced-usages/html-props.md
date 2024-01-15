在[DLight语法/HTML元素](/docs/dlight-syntax/html-elements)部分, 我们介绍了如何在DLight中创建HTML元素，并讨论了一些常用的属性，如 `property`/`style`/`class`/`event`/`children`。 在这一部分中，我们将介绍DLight.js的一些不太常见但有用的特性。

对于单个DLight HTML元素属性，我们遵循[MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element) 中的属性列表来区分属性和特性。 我们提供了一个名为 `attributeMap` 的babel选项，允许自定义js属性和html特性之间的映射。例如， `ariaAutocomplete` 是一个属性名，其对应的特性名是 `aria-autocomplete`。因此 `el.ariaAutocomplete = "true"` 是有效的，而 `el.setAttribute("ariaAutocomplete", "true")` 不是。 在单个属性中你不需要处理这个，因为它已经在DLight中预定义了。但是当你想一次性设置多个特性时，你需要注意这一点。

注意两个例外： `class` 和 `for`

我对于使用 `class` 还是 `className` / `for` 还是 `htmlFor` 作为属性名纠结了很久。

其他成对属性和特性的主要命名区别是， 属性名是驼峰式的，而特性名是短横线连接的...... 除了 `class` 与 `className` 和 `for` 与 `htmlFor`。原因是 `class` 和 `for` 是js中的保留关键字，所以我们不能将它们用作属性名。因此，在js中使用 `class` 和 `for` 来表示属性名是没有意义的。而使用 `className` 和 `htmlFor` 也没有意义， 因为现在 `class` 和 `for` 可以作为DLight中成员表达式的属性名。

经过考虑，我们决定同时使用 `class` 和 `for` + `className` 和 `htmlFor` 。是的，它们都是有效的。但我们建议使用 `class` 和 `for` ，因为它们更短。

# 一次性设置多个prop
在DLight中，你可以通过使用 `prop` 属性一次性设置多个prop。例如，如果你有一个预定义的对象，像这样：

```js
const props = {
  id: "my-id",
  className: "my-class",
  style: {
    color: "red"
  }
}
```
你想把所有这些prop设置到一个元素上，你可以这样做：

```js
div().prop(props)
```

当涉及到使用stylex时，这非常有用：

```js
import * as stylex from '@stylexjs/stylex';

const styles = stylex.create({
  base: {
    fontSize: 16,
    lineHeight: 1.5,
    color: 'grey',
  },
  highlighted: {
    color: 'rebeccapurple',
  },
});

@View
class TestStyleX {
  View() {
    div("hello stylex")
      .prop(stylex.props(styles.base, styles.highlighted))
  }
}
```

# 一次性设置多个attribute
类似于 `prop` ，你也可以通过使用 `attr` 一次性设置多个attribute。例如，如果你有一个预定义的对象，像这样：

```js
const attrs = {
  "my-id": "my-id",
  "custom-attr": "my-class",
  "aria-autocomplete": "inline"
}
```

然后你想把所有这些attribute设置到一个元素上，你可以这样做：

```js
div().attr(attrs)
```

# Dataset

在JavaScript中，dataset是一个特殊的属性，它允许你设置数据属性。例如，如果你想在JavaScript中将 `data-id` 设置为 `my-id` ，你可以这样做：
```js
el.dataset.id = "my-id"
```
在DLight中，我们提供了一个 `dataset` 属性，允许你一次性设置数据集。例如：
```js
div().dataset({ id: "my-id" })
```
