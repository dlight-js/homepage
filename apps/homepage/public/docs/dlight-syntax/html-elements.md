# Basic
In DLight's DSL, HTML elements are articulated as function calls:
```js
div("hello")
span(":D")
```
The first parameter in this HTMLNode function call would be its `innerText`, so the DSL above can be rendered to a html that looks like this:
```html
<div>hello</div>
<span>:D</span>
```
