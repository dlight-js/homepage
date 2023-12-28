import { ExmaplesCodeDataType } from "../utils/types"

export const ExamplesCodeData: ExmaplesCodeDataType[] = [
  {
    title: "Reactivity",
    zhName: "响应式",
    description: "",
    path: "/examples/declare-state",
    children: [
      {
        title: "Declare State",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import Name from "./Name.view"

@View
class MyComp {
  View() {
    Name()
  }
}
render("app", MyComp)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View } from "@dlightjs/dlight"

@View
class Name {
  name = "John"

  View() {
    h1(this.name)
  }
}

export default Name`,
            path: "/Name.view.ts"
          }
        ]
      },
      {
        title: "Update State",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import Name from "./Name.view"

@View
class MyComp {
  View() {
    Name()
  }
}
render("app", MyComp)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View } from "@dlightjs/dlight"

@View
class Name {
  name = "John"

  beforeInit() {
    this.name = "Jane"
  }

  View() {
    h1(this.name)
  }
}
            
export default Name`,
            path: "/Name.view.ts"
          }
        ]
      },
      {
        title: "Computed State",
        description: "Lorem ipsum dolor sit amet, consectetur.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import DoubleCount from "./DoubleCount.view"

@View
class MyComp {
  View() {
    DoubleCount()
  }
}
render("app", MyComp)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View } from "@dlightjs/dlight"

@View
class DoubleCount {
  count = 10
  doubleCount = this.count * 2

  View() {
    div(this.doubleCount)
  }
}

export default DoubleCount`,
            path: "/DoubleCount.view.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Templating",
    zhName: "模板",
    description: "",
    path: "/examples/minimal-template",
    children: [
      {
        title: "Minimal Template",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class HelloWorld {
  View() {
    h1("hello world")
  }
}
render("app", HelloWorld)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Styling",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class CssStyle {
  View() {
    button("I am a button")
  }
}

render("app", CssStyle)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Loop",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class Colors {
  colors = ["red", "green", "blue"]

  View() {
    ul()
    {
      for (const color of this.colors) {
        li(color)
      }
    }
  }
}

render("app", Colors)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Event Click",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class Counter {
  count = 0

  View() {
    p(this.count)
    button("+1")
      .onClick(() => {
        this.count++
      })
  }
}

render("app", Counter)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Dom Ref",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class InputFocused {
  inputElement

  didMount() {
    this.inputElement.value = 500
  }

  View() {
    input()
      .type("text")
      .element(this.inputElement)
  }
}

render("app", InputFocused)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Conditional",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

const TRAFFIC_LIGHTS = ["red", "orange", "green"]

@View
class TrafficLight {
  lightIndex = 0
  light = TRAFFIC_LIGHTS[this.lightIndex]

  nextLight() {
    if (this.lightIndex + 1 > TRAFFIC_LIGHTS.length - 1) {
      this.lightIndex = 0
    } else {
      this.lightIndex++
    }
  }

  View() {
    button("Next light")
      .onClick(this.nextLight)
    p(this.light)
    p()
    {
      "You must"
      if (this.light === "red") {
        span("STOP")
      } else if (this.light === "orange") {
        span("SLOW DOWN")
      } else if (this.light === "green") {
        span("GO")
      }
    }
  }
}

render("app", TrafficLight)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Lifecycle",
    zhName: "生命周期",
    description: "",
    path: "/examples/on-mount",
    children: [
      {
        title: "On Mount",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class PageTitle {
  pageTitle = ""

  didMount() {
    this.pageTitle = document.title
  }

  View() {
    p(this.pageTitle)
  }
}

render("app", PageTitle)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "On Unmount",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class Time {
  time = new Date().toLocaleTimeString()
  timer

  didMount() {
    this.timer = setInterval(() => {
      this.time = new Date().toLocaleTimeString()
    }, 1000)
  }

  willUnmount() {
    clearInterval(this.timer)
  }

  View() {
    span("Current time: ")
    span(this.time)
  }
}

render("app", Time)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Component Composition",
    zhName: "组件组合",
    description: "",
    path: "/examples/props",
    children: [
      {
        title: "Props",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import UserProfile from "./UserProfile.view"

@View
class App {
  View() {
    UserProfile()
      .name("John")
      .age(20)
      .favouriteColors(["green", "blue", "red"])
      .isAvailable(true)
  }
}
render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View } from "@dlightjs/dlight" 

@View
class UserProfile {
  @Prop name = ""
  @Prop age = null
  @Prop favouriteColors = []
  @Prop isAvailable = false

  View() {
    div()
    {
      span("My name is ")
      span(this.name)
    }
    div()
    {
      span("My age is ")
      span(this.age)
    }
    div()
    {
      span("I am ")
      span(this.isAvailable ? "available" : "not available")
    }
    div()
    {
      span("My favourite colors are ")
      span(this.favouriteColors.join(", "))
    }
  }
}

export default UserProfile`,
            path: "/UserProfile.view.ts"
          }
        ]
      },
      {
        title: "Emit To Parent",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import AnswerButton from "./AnswerButton.view"

@View
class App {
  canCome = true

  onAnswerNo() {
    this.canCome = false
  }

  onAnswerYes() {
    this.canCome = true
  }

  View() {
    p("Are you happy?")
    AnswerButton()
      .onYes(this.onAnswerYes)
      .onNo(this.onAnswerNo)
    p(this.canCome ? "😀" : "😥")
  }
}

render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View } from "@dlightjs/dlight" 

@View
class AnswerButton {
  @Prop onYes
  @Prop onNo

  View() {
    button("yes")
      .onClick(this.onYes)
    button("NO")
      .onClick(this.onNo)
  }
}

export default AnswerButton`,
            path: "/AnswerButton.view.ts"
          }
        ]
      },
      {
        title: "Slot",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import FunnyButton from "./FunnyButton.view"

@View
class App {
  View() {
    FunnyButton()
    {
      "Click me!"
    }
  }
}


render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View, Children } from "@dlightjs/dlight" 

@View
class FunnyButton {
  @Children children
  View() {
    button()
      .style({
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0"
      })
    {
      this.children
    }
  }
}

export default FunnyButton`,
            path: "/FunnyButton.view.ts"
          }
        ]
      },
      {
        title: "Slot Fallback",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import FunnyButton from "./FunnyButton.view"

@View
class App {
  View() {
    FunnyButton()
    {
      "I got content!"
    }
    FunnyButton()
  }
}


render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View, Children } from "@dlightjs/dlight" 

@View
class FunnyButton {
  @Children children
  View() {
    button()
      .style({
        background: "rgba(0, 0, 0, 0.4)",
        color: "#fff",
        padding: "10px 20px",
        fontSize: "30px",
        border: "2px solid #fff",
        margin: "8px",
        transform: "scale(0.9)",
        boxShadow: "4px 4px rgba(0, 0, 0, 0.4)",
        transition: "transform 0.2s cubic-bezier(0.34, 1.65, 0.88, 0.925) 0s",
        outline: "0"
      })
    {
      if (this.children.length === 0) {
        span("No content found")
      } else {
        this.children
      }
    }
  }
}

export default FunnyButton`,
            path: "/FunnyButton.view.ts"
          }
        ]
      },
      {
        title: "Context",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"
import UserProfile from 'UserProfile.view'

@View
class App {
  user = {
    id: 1,
    username: "unicorn42",
    email: "unicorn42@example.com"
  }

  updateUsername(newUserName) {
    this.user = { ...this.user, userName: newUserName }
  }

  View() {
    h1("Welcome back, " + this.user.userName)
    env()
      .user(this.user)
      .updateUsername(this.updateUsername)
    {
      UserProfile()
    }
  }
}

render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import DLight, { View } from "@dlightjs/dlight" 

@View
class UserProfile {
  @Env user
  @Env updateUsername

  View() {
    div()
    {
      h2("My Profile")
      p("Username: " + this.user.username)
      p("Email: " + this.user.email)
      button("Update username to Jane")
        .onClick(() => this.updateUsername("Jane"))
    }
  }
}

export default UserProfile`,
            path: "/UserProfile.view.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Form Input",
    zhName: "表单输入",
    description: "",
    path: "/examples/input-text",
    children: [
      {
        title: "Input Text",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class InputHello {
  text = "Hello world"

  View() {
    input()
      .value(this.text)
      .oninput(e => {
        this.text = e.target.value
      })
    p(this.text)
  }
}

render("app", InputHello)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Checkbox",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class IsAvailable {
  isAvailable = false

  View() {
    input(this.text)
      .type("checkbox")
      .id("is-available")
      .checked(this.isAvailable)
      .onchange(() => { this.isAvailable = !this.isAvailable })
    label("Is Available")
      .for("is-available")
  }
}

render("app", IsAvailable)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Radio",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class PickPill {
  picked = "red"

  handleChange(event) {
    this.picked = event.target.value
  }

  View() {
    div()
    {
      span("Picked: ")
      span(this.picked)
    }
    div()
    {
      input()
        .id("blue-pill")
        .type("radio")
        .value("blue")
        .checked(this.picked === "blue")
        .onchange(this.handleChange)
      label("Blue pill")
        .for("blue-pill")
    }
    div()
    {
      input()
        .id("red-pill")
        .type("radio")
        .value("red")
        .checked(this.picked === "red")
        .onchange(this.handleChange)
      label("Red pill")
        .for("red-pill")
    }
  }
}

render("app", PickPill)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Select",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import DLight, { View, render } from "@dlightjs/dlight"

@View
class ColorSelect {
  selectedColorId = 2
  colors = [
    { id: 1, text: "red" },
    { id: 2, text: "blue" },
    { id: 3, text: "green" },
    { id: 4, text: "gray", isDisabled: true }
  ]

  View() {
    select()
      .value(this.selectedColorId)
      .onchange(e => { this.selectedColorId = e.target.value })
    {
      for (const { id, text, isDisabled } of this.colors) {
        option(text)
          .value(id)
          .disabled(isDisabled)
      }
    }
  }
}

render("app", ColorSelect)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  }
]
