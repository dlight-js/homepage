# File Naming Convention
DLight is using a pre-compiler to compile DLight DSL into js code. There's a babel preset called `babel-preset-dlight` to do this job. In this preset's option, there're two parameters called `files` and `excludeFiles` to specify which files to compile. By default, it's `**/*.{js,jsx,ts,tsx}` for files and `**/{dist,node_modules,lib}/*` for excludeFiles. You can change it in your babel config file.

We recommend you to use `*.view.js` as your view file's extension, in this way, it'll be very clear for you to know which file is a view file and which is not. And also, it'll make the compiler faster because it only compiles view files. So a recommended babel preset option will be:
```json
{
  "presets": [
    [
      "babel-preset-dlight",
      {
        "files": "**/*.view.{js,ts}",
      }
    ]
  ]
}
```
or a vite config:
```js
import dlight from "vite-plugin-dlight"

export default {
  plugins: [
    dlight({
      files: "**/*.view.{js,ts}",
    })
  ]
}
```

# Methods
Writing a component in DLight is just like how you regularly write a class in js. So here's a question: how do you write a function in a js class? 

There're two ways to do it
1. Write a method
2. Write a property of type function or arrow function

In DLight, it'll be:
```js
@View
class Counter {
  count = 0
  increment() {
    this.count++
  }

  View() {
    button("increment")
      .onClick(this.increment)
  }
}
```
or
```js
@View
class Counter {
  count = 0
  increment = () => {
    this.count++
  }

  View() {
    button("increment")
      .onClick(this.increment)
  }
}
```

First, both would work. But there's a slight difference between them. In DLight, every used property(by used, I mean it's used in the view or by any other property that is used in the view) will be reactive. So in this case, if you wrote `increment` as an arrow-functioned class property, it'll be a computed state, which means it'll be re-calculated every time `this.count` is changed, which of course makes sense in DLight but this is not what we want. So instead, we recommend you to write it as a method.

They're actually a couple of more benefits of writing a method instead of a property on a js level:
1. Less compiled code memory usage, because a method is only compiled once, but an arrow function is compiled every time it's created.
2. Less closure memory usage, because a method is a syntax sugar of a function, so it'll only be created in the top level. But an arrow function is a closure, so it'll be multiple closure instance every time it's created.

It's worth noting that in DLight, every method is automatically bound to the class instance, so you don't need to worry about the `this` context. We won't let some ugly and stupid `this.increment = this.increment.bind(this)` happen in DLight.


# Styling
Since we regard DLight as an UI rendering library instead of a framework, we don't want to add too much complexity to it. So we don't have a built-in style solution. But it can seamlessly work with any style solution you like. Here's a list of style solutions that we recommend:

## clsx
[clsx](https://github.com/lukeed/clsx) is a tiny utility for constructing className strings conditionally.

Example integration in DLight:
```js
div("hello clsx")
  .class(
    clsx(
      "text-red-500",
      this.isRed && "bg-red-500",
      this.isBlue && "bg-blue-500",
    )
  )
```

## Tailwind
[Tailwind](https://tailwindcss.com/) is a utility-first CSS framework for rapidly building custom user interfaces.

We recommend you to use `Vite` to build your DLight project. For a vite + tailwind project, you can refer to [doc](https://tailwindcss.com/docs/guides/vite) to set up your project.

In vscode, you can install [tailwindcss intellisense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) to get auto-completion and linting for tailwind classes.

Add the following config to your vscode JSON user configuration to enable tailwindcss intellisense for DLight and clsx:
```json
{
  "tailwindCSS.experimental.classRegex": [
    ["clsx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"],
    ["class\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ]
}
```

Example integration in DLight:
```js
div("hello tailwind")
  .class("text-red-500 bg-red-500")
```

## Css in Js
In the frontend community, there're a lot of css in js solutions like [emotion](https://emotion.sh) or [Linaria](https://linaria.dev/). I even implemented a minimal static css in js solution called [easy-css](https://github.com/IanDxSSXX/easy-css).

Example integration in DLight:
```js
div("hello css in js")
  .class(css`
    color: red;
    background-color: red;
  `)

```

How we recommend in a DLight component:
```js
@View
class MyComp {
  @Prop color: string

  View() {
    div("hello css in js")
      .class(this.helloWorldCss)
  }

  // ---- Style ----
  helloWorldCss = css`
    color: ${this.color};
    background-color: ${this.color};
  `
}
```

## StyleX
[StyleX](https://github.com/facebook/stylex) is a JavaScript library for defining styles for optimized user interfaces.

You can use stylex in DLight with the following steps:
1. Add a [vite plugin](https://github.com/nonzzz/vite-plugin-stylex) to transform stylex code. In your vite config:
```js
import { defineConfig } from 'vite'
import dlight from "vite-plugin-dlight"
import { stylexPlugin } from "vite-plugin-stylex-dev";

export default defineConfig({
  plugins: [
    dlight({ files: "**/*.view.js" }),
    stylexPlugin()
  ]
});
```

2. Create a style in stylex:
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
```
3. Use it in DLight:
```js
@View
class TestStyleX {
  View() {
    div("hello stylex")
      .prop(stylex.props(styles.base, styles.highlighted))
  }
}
```


# Coding style
There're some coding styles that we recommend you to follow when you're coding in DLight. Soon we'll make an eslint plugin to enforce these rules.

## Don't get over 200 lines for one component
If your component is over 200 lines, it's probably doing too much. Try to break it down into smaller components or extract some logic into a reusable function.

## Inline props or new line props
When the number of props is less than 2, you can inline them. Otherwise, you should put them in a new line for better readability.

Example:
```js
// inline
a("hello").href("https://dlight.dev").target("_blank")
// new line
a("hello")
  .href("https://dlight.dev")
  .target("_blank")
  .title("DLight.js")
  .rel("noopener noreferrer")
```

This brings to the position of children block left parenthesis. We recommend you to put it in a new line if there're more than 2 props.
```js
// inline
a("hello").href("https://dlight.dev").target("_blank"); {
  div("child1")
  div("child2")
}
// new line
a("hello")
  .href("https://dlight.dev")
  .target("_blank")
  .title("DLight.js")
  .rel("noopener noreferrer")
{
  div("child1")
  div("child2")
}
```
Now it looks GOOD!

## One component per file
We recommend you to put one component in one file. This will make your code more readable and maintainable. And for our future SSR support, it'll be effortless for you to migrate your code from client-side to server-side if you follow this rule.
```js
// ~> App.view.js
@View
class App {
  View() {
    div("hello")
  }
}

export default App
```
----
But of course you can do what the fk you want in DLight and don't need to follow any of the rules.