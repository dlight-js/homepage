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
      ._border(\`1px solid \${this.color}\`)
      ._padding("10px")
      ._margin("10px")
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
  orange0: string
  orange1: string
  orange2: string
  orange3: string
  orange4: string
  orange5: string
  orange6: string
  orange7: string
  orange8: string
  orange9: string
  orange10: string
  orange11: string
  orange12: string
  orange13: string
}

export const colors: Record<string, Color> = {
  light: {
    orange0: "#fff",
    orange1: "#fff9f4",
    orange2: "#fef2e8",
    orange3: "#feecdd",
    orange4: "#fcd8bb",
    orange5: "#fbcba5",
    orange6: "#fabe8e",
    orange7: "#daa172",
    orange8: "#bb8357",
    orange9: "#9b663b",
    orange10: "#8b572d",
    orange11: "#7c4820",
    orange12: "#6c3a12",
    orange13: "#5c2b04"

  },
  dark: {
    orange0: "#5c2b04",
    orange1: "#6c3a12",
    orange2: "#7c4820",
    orange3: "#8b572d",
    orange4: "#9b663b",
    orange5: "#bb8357",
    orange6: "#daa172",
    orange7: "#fabe8e",
    orange8: "#fbcba5",
    orange9: "#fcd8bb",
    orange10: "#feecdd",
    orange11: "#fef2e8",
    orange12: "#fff9f4",
    orange13: "#fff"
  }
}

export const headerHeight = 35

export const dividerWidth = 8
