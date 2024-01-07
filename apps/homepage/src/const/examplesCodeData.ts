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
    path: "/examples/hello-world",
    children: [
      {
        title: "Hello World",
        description: "A simple greeting using the dlight.js framework.",
        zhDescription: "一个用dlight实现地简单问候。",
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
        title: "ToDoMVC",
        description: "The ToDoMVC example demonstrates how to create a simple ToDo List application using the @dlightjs/dlight framework.",
        zhDescription: "ToDoMVC示例展示了如何使用@dlightjs/dlight框架创建一个ToDoMVC应用程序。",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import {
  type Typed,
  type Pretty,
  div,
  section,
  header,
  h1,
  input,
  label,
  ul,
  SubTyped,
  button,
  li,
  footer,
  span,
  strong,
  a,
  p,
} from "@dlightjs/types"
            
interface ToDo {
  id: number
  title: string
  completed: boolean
}

interface ToDoItemProps {
  id: number
  editing: boolean
  title: string
  completed: boolean
}

type Filter = "all" | "active" | "completed"
            
@View
class TodoMVC {
  todos: ToDo[] = []

  editingId: number | null = null

  editingText = ""

  remainingCount = this.todos.filter(todo => !todo.completed).length

  showMode: Filter = (location.hash.slice(2) as Filter) || "all"

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

  addTodo({ target, key }: KeyboardEvent) {
    const title = (target as HTMLInputElement).value.trim()
    if (key === "Enter" && title) {
      this.todos = [
        ...this.todos,
        {
          id: performance.now(),
          title,
          completed: false,
        },
      ]
      ;(target as HTMLInputElement).value = ""
    }
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter(todo => todo.id !== id)
  }

  toggleTodo(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )
  }

  doneEditing(id: number) {
    this.todos = this.todos.map(todo =>
      todo.id === id ? { ...todo, title: this.editingText } : todo
    )
    this.editingId = null
  }

  clearCompleted() {
    this.todos = this.todos.filter(todo => !todo.completed)
  }

  locationHandler() {
    this.showMode = (location.hash.slice(2) as Filter) || "all"
  }

  willMount() {
    window.addEventListener("hashchange", this.locationHandler)
  }

  didUnmount() {
    window.removeEventListener("hashchange", this.locationHandler)
  }

  @View
  ToDoItem = (({ id, title, completed, editing }: ToDoItemProps) => {
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
          .class("destroy")
          .onClick(() => {
            this.removeTodo(id)
          })
      }
      if (editing) {
        input()
          .class("edit")
          .value(this.editingText)
          .onInput(e => {
            this.editingText = (e.target as HTMLInputElement).value
          })
          .onBlur(() => this.doneEditing(id))
          .element(el => {
            setTimeout(() => el.focus())
          })
      }
    }
  }) as Pretty as SubTyped<ToDoItemProps>

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
          .class("clear-completed")
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

render("app", ToDoMVC)`,
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
    path: "/examples/reactive-states",
    children: [
      {
        title: "Reactive States",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae.",
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
        description: "Lorem ipsum dolor sit amet, consectetur.",
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
        description: "Lorem ipsum dolor sit amet, consectetur.",
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
        description: "Lorem ipsum dolor sit amet, consectetur.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class SubComp2 {
  @Env themeType
  View() {
    div("I am Sub Component2!")
  }
}

@View
class SubComp {
  @Env themeType

  View() {
    div("I am Sub Component1!")
  }
}

@View
class RootComp {
  themeType = "Light"

  changeTheme() {
    this.themeType = this.themeType === "Light" ? "Dark" : "Light"
  }

  View() {
    env()
      .themeType(this.themeType)
    {
      button("Change Theme")
        .onClick(this.changeTheme)
      SubComp()
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
    path: "/examples/text-element",
    children: [
      {
        title: "Text Element",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
@View SubComponent {
  View() {
    div("I am Sub Component!")
  }
}

@View
class RootComponent {
  View() {
    div("I am Root Component!")
    SubComponent()
  }
}

render("app", RootComponent)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "If Block",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
      },
      {
        title: "For Loop",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class Colors {
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

render("app", Colors)`,
            path: "/index.ts"
          }
        ]
      },
      {
        title: "Switch Case",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

@View
class Expression {
  count = 2

  View() {
    _(count*2)
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
    path: "/examples/props",
    children: [
      {
        title: "Props",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
        title: "Content",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
            code: `import DLight, { View } from "@dlightjs/dlight" 

@View
class BeautifulButton {
  @Content btnName
  @Prop handleClick

  View() {
    button(this.btnName)
      .onClick(this.handleClick)
  }
}

export default BeautifulButton`,
            path: "/BeautifulButton.view.ts"
          }
        ]
      },
      {
        title: "Children",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
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
            code: `import DLight, { View, Children } from "@dlightjs/dlight" 

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

export default RowDisplay`,
            path: "/RowDisplay.view.ts"
          }
        ]
      },
      {
        title: "SubView",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"

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
          }
        ]
      },
      {
        title: "Prop View",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing.",
        modules: [
          {
            code: `import { View, render } from "@dlightjs/dlight"
import UserProfile from 'UserProfile.view'

@View
class PropView {
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

render("app", PropView)`,
            path: "/index.ts"
          },
          {
            code: `import { View } from "@dlightjs/dlight" 

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
  }
]
