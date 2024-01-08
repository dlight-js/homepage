import { ExmaplesCodeDataType } from "../utils/types"

function javascript(strings: TemplateStringsArray, ...values: any[]): string {
  return strings.reduce((acc, str, i) => {
    return acc + str + (values[i] || "")
  }, "")
}

export const ExamplesCodeData: ExmaplesCodeDataType[] = [
  {
    title: "Introduction",
    zhName: "介绍",
    description: "",
    path: "/examples/introduction/hello-world",
    children: [
      {
        title: "Hello World",
        description: "A greeting from DLight.js.",
        zhDescription: "来自DLight的问候。",
        modules: [
          {
            code: javascript`import { View, render } from "@dlightjs/dlight"

@View
class HelloWorld {
  View() {
    div("Hello World!")
  }
}

render("app", HelloWorld)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "TodoMVC",
        description: "The ToDoMVC example demonstrates how to create a ToDo List application using the dlight.js.",
        zhDescription: "ToDoMVC示例展示了如何使用@dlightjs/dlight框架创建一个ToDoMVC应用程序。",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
      
@View
class TodoMVC {
  todos = []

  editingId = null

  editingText = ""

  remainingCount = this.todos.filter(todo => !todo.completed).length

  showMode = location.hash.slice(2) || "all"

  filteredTodos = this.todos.filter(todo => {
    switch (this.showMode) {
      case "active":
        return !todo.completed
      case "completed":
        return todo.completed
      default:
        return true
    }
  })

  addTodo({ target, key }) {
    const title = target.value.trim()
    if (key === "Enter" && title) {
      this.todos = [
        ...this.todos,
        {
          id: performance.now(),
          title,
          completed: false,
        },
      ]
      ;target.value = ""
    }
  }

  removeTodo(id) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  toggleTodo(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }

  doneEditing(id) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, title: this.editingText } : todo
    )
    this.editingId = null
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  locationHandler() {
    this.showMode = location.hash.slice(2) || "all"
  }

  willMount() {
    window.addEventListener("hashchange", this.locationHandler)
  }

  didUnmount() {
    window.removeEventListener("hashchange", this.locationHandler)
  }

  @View
  ToDoItem({ id, title, completed, editing }) {
    li().class(
      \`todo \${editing ? "editing" : ""} \${completed ? "completed" : ""}\`.trim()
    )
    {
      div().class("view")
      {
        input()
          .class("toggle")
          .type("checkbox")
          .checked(completed)
          .onInput(() => this.toggleTodo(id))
        label(title).onDblClick(() => {
          this.editingText = title
          this.editingId = id
        })
        button()
          .class("button destroy")
          .onClick(() => {
            this.removeTodo(id)
          })
      }
      if (editing) {
        input()
          .class("edit")
          .value(this.editingText)
          .onInput(e => {
            this.editingText = e.target.value
          })
          .onBlur(() => this.doneEditing(id))
          .element(el => {
            setTimeout(() => el.focus())
          })
      }
    }
  }

  @View
  Footer() {
    footer().class("footer")
    {
      span().class("todo-count")
      {
        strong(this.remainingCount)
        ;\` \${this.remainingCount > 1 ? "items" : "item"} left\`
      }
      ul().class("filters")
      {
        li()
        {
          a("All")
            .class(this.showMode === "all" ? "selected" : "")
            .href("#/")
        }
        li()
        {
          a("Active")
            .class(this.showMode === "active" ? "selected" : "")
            .href("#/active")
        }
        li()
        {
          a("Completed")
            .class(this.showMode === "completed" ? "selected" : "")
            .href("#/completed")
        }
      }
      if (this.remainingCount !== this.todos.length) {
        button("Clear completed")
          .class("button clear-completed")
          .onClick(this.clearCompleted)
      }
    }
  }

  @View
  Info() {
    footer().class("info")
    {
      p("Double-click to edit a todo")
      p()
      {
        "Written by "
        a("Yihan Duan").href("https://github.com/IanDxSSXX")
      }
      p()
      {
        "Part of "
        a("TodoMVC").href("http://todomvc.com")
      }
    }
  }

  View() {
    section().class("todoapp")
    {
      header().class("header")
      {
        h1("todos")
        input()
          .class("new-todo")
          .placeholder("What needs to be done?")
          .autofocus(true)
          .onKeyDown(this.addTodo)
      }
      if (this.todos.length > 0) {
        section().class("main")
        {
          input().id("toggle-all").class("toggle-all").type("checkbox")
          label().for("toggle-all")
          ul().class("todo-list")
          {
            for (const { id, title, completed } of this.filteredTodos) {
              key: id
              this.ToDoItem()
                .id(id)
                .title(title)
                .completed(completed)
                .editing(this.editingId === id)
            }
          }
        }
        this.Footer()
      }
    }
    this.Info()
  }
}

render("app", TodoMVC)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Reactivity",
    zhName: "响应式",
    description: "",
    path: "/examples/reactivity/reactive-states",
    children: [
      {
        title: "Reactive States",
        description: "Showcase how to use reactive states in dlight.js.",
        modules: [
          {
            code: javascript`import { View, render } from "@dlightjs/dlight"

@View
class NameComp {
  name = "John"
  View() {
    div(this.name)
  }
}
render("app", NameComp)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Computed States",
        description: "Showcase how to use computed states in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class NameComp {
  firstName = "John"
  lastName = "Doe"
  fullName = \`\${this.firstName} \${this.lastName}\`

  View() {
    div(this.fullName)
  }
}
render("app", NameComp)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Reactive Assignments",
        description: "Showcase how to assign reactive states in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class CountComp {
  count = 0

  View() {
    div(this.count)
    button("Add")
      .onClick(() => { this.count += 1 })
  }
}
render("app", CountComp)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Watcher",
        description: "Showcase how to use @Watcher to watch reactive state update in dlight.js.",
        modules: [
          {
            code: `import { View, render, Watch } from "@dlightjs/dlight"

@View
class CountComp {
  count = 0

  @Watch
  watchCount() {
    console.log(\`The count change to: \${this.count}\`)
  }

  View() {
    button("Add")
      .onClick(() => { this.count ++ })
    div(this.count)
  }
}
render("app", CountComp)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Environment",
        description: "Showcase how to use env block to store the global properties and use @Env to receive environment properties in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class SubSubComp {
  @Env theme
  View() {
    div("I am Sub Sub Component!")
      .style({ color: this.theme.textColor, backgroundColor: this.theme.bgColor, margin: "10px 0" })
  }
}

@View
class SubComp2 {
  @Env theme
  View() {
    div("I am Sub Component2!")
      .style({ color: this.theme.textColor, backgroundColor: this.theme.bgColor, margin: "10px 0" })
  }
}

@View
class SubComp {
  @Env theme

  View() {
    div("I am Sub Component1!")
      .style({ color: this.theme.textColor, backgroundColor: this.theme.bgColor, margin: "10px 0" })
    SubSubComp()
  }
}

@View
class RootComp {
  themeType = "Light"
  theme = {
    Light: {
      bgColor: "#fff",
      textColor: "#000"
    },
    Dark: {
      bgColor: "#000",
      textColor: "#fff"
    }
  }

  changeTheme() {
    this.themeType = this.themeType === "Light" ? "Dark" : "Light"
  }

  View() {
    env()
      .theme(this.theme[this.themeType])
    {
      div("The themeType is " + this.themeType)
      button("Change Theme")
        .onClick(this.changeTheme)
      SubComp()
      SubComp2()
    }
  }
}

render("app", RootComp)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  },
  {
    title: "DLight Syntax",
    zhName: "DLight语法",
    description: "",
    path: "/examples/dlight-syntax/text-element",
    children: [
      {
        title: "Text Element",
        description: "Showcase which is text element in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class TextElement {
  View() {
    "I am a Text Element!"
    \`I am also a Text Element! \`
    'Me too!'
  }
}
render("app", TextElement)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Html Element",
        description: "Showcase how to use html element in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class HtmlElement {
  View() {
    div("I am a Html Element!")
    span("I am also a Html Element!")
    div()
    {
      button("Button")
    }
  }
}

render("app", HtmlElement)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Html Element Props",
        description: "Showcase how to use props with html element.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class HtmlElementProps {
  View() {
    a("Click to DLight Github")
      .href("https://github.com/dlight-js/dlight")
  }
}

render("app", HtmlElementProps)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Component",
        description: "Showcase how to build and invoke a custom component.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
@View 
class SubComp {
  View() {
    div("I am Sub Component!")
  }
}

@View
class RootComp {
  View() {
    div("I am Root Component!")
    SubComp()
  }
}

render("app", RootComp)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "If Block",
        description: "Showcase how to use if block in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

const TRAFFIC_LIGHTS = ["red", "orange", "green"]

@View
class TrafficLight {
  lightIndex = 0
  light = TRAFFIC_LIGHTS[this.lightIndex]

  nextLight() {
    this.lightIndex = (this.lightIndex + 1)%TRAFFIC_LIGHTS.length
  }

  View() {
    button("Next light")
      .onClick(this.nextLight)
    p(this.light)
    p()
    {
      "You must "
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
      },
      {
        title: "For Loop",
        description: "Showcase how to use for loop view in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

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
        title: "Keyed For Loop",
        description: "Showcase how to use key in for loop to ensure correctness of array sequence.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class NumComp {
  numArr = [0,1,2,3,4]

  changeNumArr() {
    this.numArr = [...this.numArr, this.numArr.length]
  }

  View() {
    button("Change numArr")
      .onClick(this.changeNumArr)
    ul()
    {
      for (const num of this.numArr) {
        key: num
        li(num)
      }
    }
  }
}

render("app", NumComp)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Switch Case",
        description: "Using TrafficLight component to showcase how to use switch case in dlight.js.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

const TRAFFIC_LIGHTS = ["red", "orange", "green"]

@View
class TrafficLight {
  lightIndex = 0
  light = TRAFFIC_LIGHTS[this.lightIndex]

  nextLight() {
    this.lightIndex = (this.lightIndex + 1)%TRAFFIC_LIGHTS.length
  }

  View() {
    button("Next light")
      .onClick(this.nextLight)
    p(this.light)
    p()
    {
      "You must "
      switch (this.light) {
        case "red":
          span("STOP")
          break
        case "orange":
          span("SLOW DOWN")
          break
        case "green":
          span("GO")
          break
      }
    }
  }
}

render("app", TrafficLight)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Expression",
        description: "Showcase how to use expression as a view in View block.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class Expression {
  count = 2

  View() {
    _(this.count*2)
  }
}

render("app", Expression)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Component",
    zhName: "组件",
    description: "",
    path: "/examples/component/props",
    children: [
      {
        title: "Props",
        description: "UserProfile component receiving dynamic properties from an App class",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import UserProfile from "./UserProfile.view"

@View
class App {
  name = "John"

  View() {
    UserProfile()
      .name(this.name)
      .age(20)
      .favouriteColors(["green", "blue", "red"])
      .isAvailable(true)
  }
}
render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import { View } from "@dlightjs/dlight" 

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
        title: "Content",
        description: "Showcase how to use @Content decorator to receive dynamic content from a parent component which is different way to receive props from dot call.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import BeautifulButton from "./BeautifulButton.view"

@View
class App {
  count = 0

  View() {
    div(this.count)
    BeautifulButton("Add")
      .handleClick(()=>{
        this.count ++
      })
    BeautifulButton("Minus")
      .handleClick(()=>{
        this.count --
      })
  }
}

render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import { View } from "@dlightjs/dlight" 

@View
class BeautifulButton {
  @Content btnName
  @Prop handleClick

  View() {
    button(this.btnName)
      .onClick(this.handleClick)
      .style({ color: "white", backgroundColor: "green", border: "none",
        padding: "5px 10px", marginRight: "10px", borderRadius: "4px" })
  }
}

export default BeautifulButton`,
            path: "/BeautifulButton.view.ts"
          }
        ]
      },
      {
        title: "Children",
        description: "Showcase how to receive dynamic children which is passing in {} from a parent component.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import CenterAlign from "./CenterAlign.view"

@View
class App {
  View() {
    CenterAlign()
    {
      div("A very very very long text")
      div("short text")
      div("Another very very very long text")
    }
  }
}

render("app", App)`,
            path: "/index.ts"
          },
          {
            code: `import { View, Children } from "@dlightjs/dlight" 

@View
class CenterAlign {
  @Children children

  View() {
    div()
    .style({ display: "flex", flexDirection: "column", alignItems: "center" })
    {
      this.children
    }
  }
}

export default CenterAlign`,
            path: "/CenterAlign.view.ts"
          }
        ]
      },
      {
        title: "Sub View",
        description: "Showcase how to use @View in a class to create a sub view.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class App {
  count = 0

  @View
  BeautifulBtn({content, handleClick}) {
    button(content)
      .onClick(handleClick)
      .style({ color: "white", backgroundColor: "green", border: "none",
        padding: "5px 10px", marginRight: "10px", borderRadius: "4px" })
  }

  View() {
    div(this.count)
    this.BeautifulBtn("Add")
      .handleClick(()=>{ this.count ++ })
    this.BeautifulBtn("Minus")
      .handleClick(()=>{ this.count -- })
  }
}

render("app", App)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Prop View",
        description: "Showcase how to pass a view as a prop to a component.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import Header from './Header.view'

@View
class PropViewComp {
  View() {
    Header()
      .leftView(View => div("X"))
      .centerView(View => div("Title"))
      .rightView(View => div("···"))
  }
}

render("app", PropViewComp)`,
            path: "/index.ts"
          },
          {
            code: `import { View } from "@dlightjs/dlight" 

@View
class Header {
  @Prop leftView
  @Prop centerView
  @Prop rightView

  View() {
    div()
      .style({ display: "flex", justifyContent: "space-between", alignItems: "center",
        backgroundColor: "#a9a9a9", color: "black", padding: "5px 10px" })
    {
      if (this.leftView) {
        this.leftView
      }
      if (this.centerView) {
        this.centerView
      }
      if (this.rightView) {
        this.rightView
      }
    }
  }
}

export default Header`,
            path: "/Header.view.ts"
          }
        ]
      }
    ]
  },
  {
    title: "Lifecycle",
    zhName: "生命周期",
    description: "",
    path: "/examples/lifecycle/html-element-lifecycle",
    children: [
      {
        title: "Html Element Lifecycle",
        description: "A Firecracker class showcasing HTML element lifecycle management by dynamically removing firecracker.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class Firecracker {
  firecrackers = new Array(10).fill(0)

  fire() {
    this.firecrackers = this.firecrackers.slice(0, this.firecrackers.length - 1)
  }

  View() {
    for (const firecracker of this.firecrackers) {
      div("🀫")
        .didUnmount(() => { 
          if (this.firecrackers.length > 0) {
            setTimeout(() => {
              this.firecrackers = this.firecrackers.slice(0, this.firecrackers.length - 1)
            }, 50)
          }
        })
    }
    button("🔥")
      .onClick(this.fire)
    button("get a new firecracker")
      .onClick(() => { this.firecrackers = new Array(10).fill(0) })
  }
}

render("app", Firecracker)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Component Lifecycle",
        description: "An interactive AppleTree class demonstrates the component lifecycle using lifecycle hooks.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import Apple from "./Apple.view"

@View
class AppleTree {
  appleIds = [0,1,2,3]

  View() {
    button("Add an Apple")
      .onClick(() => { 
        const newAppleId = [...Array(this.appleIds.length + 1).keys()]
          .find(i => !this.appleIds.includes(i))
        this.appleIds = [...this.appleIds, newAppleId] 
      })
    button("Pick an Apple")
      .onClick(() => { 
        this.appleIds.splice(Math.floor(Math.random() * this.appleIds.length), 1)
        this.appleIds = [...this.appleIds]
       })
    for (const appleId of this.appleIds) {
      key: appleId
      Apple()
        .appleId(appleId)
        .willMount(() => { console.log("[willMount] apple " + appleId) })
        .didMount(() => { console.log("[didMount] apple " + appleId) })
        .willUnmount(() => { console.log("[willUnmount] apple " + appleId) })
        .didUnmount(() => { console.log("[didUnmount] apple " + appleId) })
    }
  }
}

render("app", AppleTree)`,
            path: "/index.ts"
          },
          {
            code: `import { View } from "@dlightjs/dlight" 

@View
class Apple {
  @Prop appleId

  View() {
    div("🍎apple " + this.appleId)
  }
}

export default Apple`,
            path: "/Apple.view.ts"
          }
        ]
      },
      {
        title: "Instant Component Lifecycle",
        description: "An interactive AppleTree class demonstrates instant component lifecycle using lifecycle hooks.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import Apple from "./Apple.view"

@View
class AppleTree {
  appleIds = [0,1,2,3]

  View() {
    button("Add an Apple")
      .onClick(() => { 
        const newAppleId = [...Array(this.appleIds.length + 1).keys()]
          .find(i => !this.appleIds.includes(i))
        this.appleIds = [...this.appleIds, newAppleId] 
      })
    button("Pick an Apple")
      .onClick(() => { 
        this.appleIds.splice(Math.floor(Math.random() * this.appleIds.length), 1)
        this.appleIds = [...this.appleIds]
       })
    for (const appleId of this.appleIds) {
      key: appleId
      Apple()
        .appleId(appleId)
    }
  }
}

render("app", AppleTree)`,
            path: "/index.ts"
          },
          {
            code: `import { View } from "@dlightjs/dlight" 

@View
class Apple {
  @Prop appleId

  willMount() {
    console.log("[willMount] apple " + this.appleId)
  }

  didMount() {
    console.log("[didMount] apple " + this.appleId)
  }

  willUnmount() {
    console.log("[willUnmount] apple " + this.appleId)
  }

  didUnmount() {
    console.log("[didUnmount] apple" + this.appleId)
  }

  View() {
    div("🍎apple " + this.appleId)
  }
}

export default Apple`,
            path: "/Apple.view.ts"
          }
        ]
      },
      {
        title: "Did Update",
        description: "A dynamic time display demonstrates how to use didUpdate feature to update every second",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class Time {
  time = new Date().toLocaleTimeString()
  timer

  didMount() {
    this.timer = setTimeout(() => {
      this.time = new Date().toLocaleTimeString()
    }, 1000)
  }

  willUnmount() {
    clearInterval(this.timer)
  }

  View() {
    span(\`Current time: \${this.time}\`)
      .didUpdate(() => {
        this.timer = setTimeout(() => {
          this.time = new Date().toLocaleTimeString()
        }, 1000)
      })
  }
}

render("app", Time)`,
            path: "/index.ts"
          }
        ]
      }
    ]
  }
]
