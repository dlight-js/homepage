In the [DLight Syntax/HTML Element](/docs/dlight-syntax/html-elements) section, we've introduced how to create an HTML element in DLight and talked about some common used properties like `property`/`style`/`class`/`event`/`children`. In this section, we'll introduce some less common but useful features of DLight.js.

For single dlight html element property, we followed the property list in [MDN](https://developer.mozilla.org/en-US/docs/Web/API/Element) to distinguish between property and attribute. And we provide a babel option called `attributeMap` to allow customizing the mapping between js property and html attribute. For instance, `ariaAutocomplete` is a property name and its corresponding attribute name is `aria-autocomplete`. As a result `el.ariaAutocomplete = "true"` is valid while `el.setAttribute("ariaAutocomplete", "true")` is not. You don't need to handle this in single property because it's all pre-defined in DLight. But when you want to set a bunch of attributes at once, you need to be aware of this.

It's worth noting of two exceptions: `class` and `for`

I've been hesitating a lot about whether to use `class` or `className` / `for` or `htmlFor` as property names.

The main naming difference for other paired properties and attributes is that the property name is camelCased while the attribute name is kebab-cased... except for `class` vs. `className` and `for` vs. `htmlFor`. The reason is that `class` and `for` are reserved keywords in js, so we can't use them as property names. So it makes no sense to use `class` and `for` to represent property names in js. It also makes no sense to use `className` and `htmlFor` since now `class` and `for` are available as a member expression's property name in DLight. 

After a long-time consideration, we decided to go with `class` and `for` + `className` and `htmlFor`. Yeah both of them are valid. But we recommend using `class` and `for` since they're shorter.

# Set a bunch of properties at once
In DLight, you can set a bunch of properties at once by using the `prop` prop. For instance, if you have a pre-defined object like this:
```js
const props = {
  id: "my-id",
  className: "my-class",
  style: {
    color: "red"
  }
}
```
and you want to set all these properties to an element, you can do it like this:
```js
div().prop(props)
```
Very useful when involving with stylex:
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

# Set a bunch of attributes at once
Similar to `prop`, you can also set a bunch of attributes at once by using the `attr` prop. For instance, if you have a pre-defined object like this:
```js
const attrs = {
  "my-id": "my-id",
  "custom-attr": "my-class",
  "aria-autocomplete": "inline"
}
```
and you want to set all these attributes to an element, you can do it like this:
```js
div().attr(attrs)
```

# Dataset
In js, dataset is a special property that allows you to set data attributes. For instance, if you want to set `data-id` to `my-id`, you can do it like this in js:
```js
el.dataset.id = "my-id"
```
In DLight, we provide a `dataset` prop to allow you to set dataset at once. For instance:
```js
div().dataset({ id: "my-id" })
```
