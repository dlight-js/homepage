export const indexCode = `import DLight, { View, render } from "@dlightjs/dlight"
import HelloView from "./hello"
import CounterView from "./counter"
import ArrayView from "./array"
import ToggleView from "./toggle"

@View
class MyComp {
  View() {
    HelloView()
    CounterView()
    ArrayView()
    ToggleView()
  }
}

render("app", MyComp)
`

export const HelloView = `import DLight, { View } from "@dlightjs/dlight"

@View
class HelloView {
  View() {
    h1("hello, dlight js")
  }
}

export default HelloView
`

export const CounterView = `import DLight, { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper"

@View
class CountView {
  count = 1

  View() {
    WrapperView()
      .color("gray")
    {
      div(this.count)
      button("+")
        .onClick(() => {
          this.count ++
        })
      button("-")
        .onClick(() => {
          this.count --
        })
    }
  }
}

export default CountView
`

export const ArrayView = `import DLight, { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper"

@View
class ArrayView {
  apples = ["apple0", "apple1", "apple2"]

  View() {
    WrapperView()
      .color("blue")
    {
      button("add apple")
        .onClick(() => {
          this.apples.push(\`apple\${this.apples.length}\`)
          this.apples = [...this.apples]
        })
      button("remove apple")
        .onClick(() => {
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

@View
class ToggleView {
  toggle = true

  View() {
    WrapperView()
      .color(this.toggle ? "green" : "red")
    {
      button("toggle")
        .onClick(() => {
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

@View
class WrapperView {
  @Prop color = required
  View() {
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

@View
class ${tabName[0].toUpperCase() + tabName.slice(1)}View {
  View() {
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
    text: "#ddd",
    primary: "#0856b6",
    secondary: "#333",
    secondaryText: "#ccc"
  }
}

export const headerHeight = 35

export const dividerWidth = 8
