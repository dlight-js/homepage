export const indexCode = `import DLight, { View, render } from "@dlightjs/dlight"
import HelloView from "./hello"
import CounterView from "./counter"
import ArrayView from "./array"
import ToggleView from "./toggle"

class MyComp extends View {
  Body() {
    HelloView()
    CounterView()
    ArrayView()
    ToggleView()
  }
}

render("app", MyComp)
`

export const HelloView = `import DLight, { View } from "@dlightjs/dlight"

class HelloView extends View {
  Body() {
    h1("hello, dlight js")
  }
}

export default HelloView
`

export const CounterView = `import DLight, { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper"

class CountView extends View {
  count = 1

  Body() {
    WrapperView()
      .color("gray")
    {
      div(this.count)
      button("+")
        .onclick(() => {
          this.count ++
        })
      button("-")
        .onclick(() => {
          this.count --
        })
    }
  }
}

export default CountView
`

export const ArrayView = `import DLight, { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper"

class ArrayView extends View {
  apples = ["apple0", "apple1", "apple2"]

  Body() {
    WrapperView()
      .color("blue")
    {
      button("add apple")
        .onclick(() => {
          this.apples.push(\`apple\${this.apples.length}\`)
          this.apples = [...this.apples]
        })
      button("remove apple")
        .onclick(() => {
          this.apples = [...this.apples.slice(0, -1)]
        })
      for (let apple of this.apples) {
        div(apple)
      }
    }
  }
}

export default ArrayView
`

export const ToggleView = `import DLight, { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper"

class ToggleView extends View {
  toggle = true

  Body() {
    WrapperView()
      .color(this.toggle ? "green" : "red")
    {
      button("toggle")
        .onclick(() => {
          this.toggle = !this.toggle
        })
      if (this.toggle) {
        div("now toggle is true")
          ._color("green")
      } else {
        div("xxxxx")
          ._color("red")
      }
    }
  }
}

export default ToggleView
`

export const WrapperView = `import DLight, { View, required } from "@dlightjs/dlight"

class WrapperView extends View {
  @Prop color = required
  Body() {
    div()
      .style({
        border: \`1px solid \${this.color}\`,
        padding: "10px",
        margin: "10px"
      })
    {
      _(this._$children)
    }
  }
}

export default WrapperView
`

export const codeTemplate = (tabName: string) => `import DLight, { View } from "@dlightjs/dlight"

class ${tabName[0].toUpperCase() + tabName.slice(1)}View extends View {
  Body() {
    "I am ${tabName} view"
  }
}

export default ${tabName[0].toUpperCase() + tabName.slice(1)}View
`
export interface Color {
  background: string
  text: string
  primary: string
  secondary: string
  secondaryText: string
}

export const colors: Record<string, Color> = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#ccc",
    secondary: "#f5f5f5",
    secondaryText: "#ccc"
  },
  dark: {
    background: "#1C1C1E",
    text: "#FFFFFF",
    primary: "#0A84FF",
    secondary: "#333",
    secondaryText: "#ccc"
  }
}

export const headerHeight = 35

export const dividerWidth = 8
