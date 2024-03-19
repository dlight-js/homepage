In component-based frameworks, the concept of "children" is fundamental. Children components allow developers to encapsulate parts of their UI, making it easier to reuse, maintain, and read the code. They are the components you place inside another component, serving as content or a part of the parent component's rendering. DLight has made working with children components a breeze.

# An Intuitive DLight Example
Imagine a Card component that provides a styled container. Inside this container, you might want to put various content, like text, images, or even other components. Here's how you'd do it in DLight:

```js
// ~> Card.js
import { View } from "@dlightjs/dlight"

@View
class Card {
  @Children cardContent

  Body() {
    div()
      .style({
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "5px"
      })
    {
      this.cardContent
    }
  }
}

export default Card
```
Then in your App:
```js
// ~> App.js
import { View } from "@dlightjs/dlight"
import Card from "./Card.view"

@View
class App {
  Body() {
    Card(); {
      div("This is the content inside the card.")
    }
  }
}

export default App
```
In this example, the Card component can wrap around any content. The content placed inside it becomes its "children", which is referred to in the Card component as `this.cardContent`.

DLight's approach to handling children components is all about intuitive design. By utilizing the `{}` notation, it mirrors the familiar structure found in HTML's child nodes. The `{}` notation signifies a cohesive unit, an organized block that can be easily interpreted and modified through out DLight. You can find it in elements' childNodes, environment, components' children and even for and if expression.

# Another way to set children
Remember in HTMLNode, we also provide a so called `PropView` way to set nested elements? You can also use this way to set "children"(looks like children but is content in fact) in a custom component. For example:

```js
// ~> Card.js
import { View } from "@dlightjs/dlight"

@View
class Card {
  @Content cardContent

  Body() {
    div()
      .style({
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "5px"
      })
    {
      this.cardContent
    }
  }
}

export default Card
// ~> App.js
import { View } from "@dlightjs/dlight"
import Card from "./Card.view"

@View
class App {
  Body() {
    Card(View => {
      div("This is the content inside the card.")
    })
  }
}

export default App
```

Note that here we receive this "children" with `@Content` decorator. Yeah that's true and it's consistent with the `@Content` in the "Prop Passing" section. You'll get to know more about it in the "Advanced Usages/View Prop" section. Here's a simple preview:
```js

// ~> Card.js
import { View } from "@dlightjs/dlight"

@View
class Card {
  @Prop anyPropViewToHoldIt

  Body() {
    div()
      .style({
        border: "1px solid gray",
        padding: "15px",
        borderRadius: "5px"
      })
    {
      this.anyPropViewToHoldIt
    }
  }
}

export default Card
// ~> App.js
import { View } from "@dlightjs/dlight"
import Card from "./Card.view"

@View
class App {
  Body() {
    Card()
      .anyPropViewToHoldIt(View => {
        div("This is the content inside the card.")
      })
  }
}

export default App
```
