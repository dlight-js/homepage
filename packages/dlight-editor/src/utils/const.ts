
export const indexCode = `import { View, render } from "@dlightjs/dlight"
import HelloView from "./hello.view"
import CounterView from "./counter.view"
import ArrayView from "./array.view"
import ToggleView from "./toggle.view"

@View
class MyComp {
  Body() {
    HelloView()
    CounterView()
    ArrayView()
    ToggleView()
  }
}

render("app", MyComp)
`

export const HelloView = `import { View } from "@dlightjs/dlight"

@View
class HelloView {
  Body() {
    h1("hello, dlight js")
  }
}

export default HelloView
`

export const CounterView = `import { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper.view"

@View
class CountView {
  count = 1

  Body() {
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

export const ArrayView = `import { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper.view"
@View
class ArrayView {
  apples = ["apple0", "apple1", "apple2"]
  
  Body() {
    WrapperView()
      .color("blue")
    {
      button("add apple")
        .onClick(() => {
          this.apples = [...this.apples, \`apple\${this.apples.length}\`]
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

export const ToggleView = `import { View } from "@dlightjs/dlight"
import WrapperView from "./wrapper.view"

@View
class ToggleView {
  toggle = true

  Body() {
    WrapperView()
      .color(this.toggle ? "green" : "red")
    {
      button("toggle")
        .onClick(() => {
          this.toggle = !this.toggle
        })
      if (this.toggle) {
        div("now toggle is true")
          .style({ color: "green" })
      } else {
        div("xxxxx")
          .style({ color: "red" })
      }
    }
  }
}

export default ToggleView
`

export const WrapperView = `import { View, required } from "@dlightjs/dlight"

@View
class WrapperView {
  @Prop color
  @Children children
  Body() {
    div()
      .style({
        border: \`1px solid \${this.color}\`,
        padding: "10px",
        margin: "10px"
      })
    {
      this.children
    }
  }
}

export default WrapperView
`

export const codeTemplate = (tabName: string) => `import DLight, { View } from "@dlightjs/dlight"

@View
class ${tabName[0].toUpperCase() + tabName.slice(1)}View {
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
  test: string
}

export const colors: Record<string, Color> = {
  light: {
    background: "#FFFFFF",
    text: "#000000",
    primary: "#ccc",
    secondary: "#f5f5f5",
    secondaryText: "#ccc",
    test: "#c9c9c9"
  },
  dark: {
    background: "#1C1C1E",
    text: "#ddd",
    primary: "#0856b6",
    secondary: "#333",
    secondaryText: "#ccc",
    test: "#757575"
  }
}

export const headerHeight = 35

export const dividerWidth = 8
