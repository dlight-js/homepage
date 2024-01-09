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
            path: "/index.js"
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
            path: "/index.js"
          },
          {
            code: `html,
body {
  margin: 0;
  padding: 0;
}

.button {
  margin: 0;
  padding: 0;
  border: 0;
  background: none;
  font-size: 100%;
  vertical-align: baseline;
  font-family: inherit;
  font-weight: inherit;
  color: inherit;
  -webkit-appearance: none;
  appearance: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  line-height: 1.4em;
  min-width: 230px;
  max-width: 550px;
  margin: 0 auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-weight: 300;
}

:focus {
  outline: 0;
}

.hidden {
  display: none;
}

.todoapp {
  background: #fff;
  margin: 130px 0 40px 0;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2),
              0 25px 50px 0 rgba(0, 0, 0, 0.1);
}

.todoapp input::-webkit-input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::-moz-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp input::input-placeholder {
  font-style: italic;
  font-weight: 300;
  color: #e6e6e6;
}

.todoapp h1 {
  position: absolute;
  top: -155px;
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
  color: rgba(175, 47, 47, 0.15);
  -webkit-text-rendering: optimizeLegibility;
  -moz-text-rendering: optimizeLegibility;
  text-rendering: optimizeLegibility;
}

.new-todo,
.edit {
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 24px;
  font-family: inherit;
  font-weight: inherit;
  line-height: 1.4em;
  border: 0;
  color: inherit;
  padding: 6px;
  border: 1px solid #999;
  box-shadow: inset 0 -1px 5px 0 rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.new-todo {
  padding: 16px 16px 16px 60px;
  border: none;
  background: rgba(0, 0, 0, 0.003);
  box-shadow: inset 0 -2px 1px rgba(0,0,0,0.03);
}

.main {
  position: relative;
  z-index: 2;
  border-top: 1px solid #e6e6e6;
}

.toggle-all {
  width: 1px;
  height: 1px;
  border: none; /* Mobile Safari */
  opacity: 0;
  position: absolute;
  right: 100%;
  bottom: 100%;
}

.toggle-all + label {
  width: 60px;
  height: 34px;
  font-size: 0;
  position: absolute;
  top: -52px;
  left: -13px;
  -webkit-transform: rotate(90deg);
  transform: rotate(90deg);
}

.toggle-all + label:before {
  content: '❯';
  font-size: 22px;
  color: #e6e6e6;
  padding: 10px 27px 10px 27px;
}

.toggle-all:checked + label:before {
  color: #737373;
}

.todo-list {
  margin: 0;
  padding: 0;
  list-style: none;
}

.todo-list li {
  position: relative;
  font-size: 24px;
  border-bottom: 1px solid #ededed;
}

.todo-list li:last-child {
  border-bottom: none;
}

.todo-list li.editing {
  border-bottom: none;
  padding: 0;
}

.todo-list li.editing .edit {
  display: block;
  width: 506px;
  padding: 12px 16px;
  margin: 0 0 0 43px;
}

.todo-list li.editing .view {
  display: none;
}

.todo-list li .toggle {
  text-align: center;
  width: 40px;
  /* auto, since non-WebKit browsers doesn't support input styling */
  height: auto;
  position: absolute;
  top: 0;
  bottom: 0;
  margin: auto 0;
  border: none; /* Mobile Safari */
  -webkit-appearance: none;
  appearance: none;
}

.todo-list li .toggle {
  opacity: 0;
}

.todo-list li .toggle + label {
  /*
    Firefox requires \`#\` to be escaped - https://bugzilla.mozilla.org/show_bug.cgi?id=922433
    IE and Edge requires *everything* to be escaped to render, so we do that instead of just the \`#\` - https://developer.microsoft.com/en-us/microsoft-edge/platform/issues/7157459/
  */
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23ededed%22%20stroke-width%3D%223%22/%3E%3C/svg%3E');
  background-repeat: no-repeat;
  background-position: center left;
}

.todo-list li .toggle:checked + label {
  background-image: url('data:image/svg+xml;utf8,%3Csvg%20xmlns%3D%22http%3A//www.w3.org/2000/svg%22%20width%3D%2240%22%20height%3D%2240%22%20viewBox%3D%22-10%20-18%20100%20135%22%3E%3Ccircle%20cx%3D%2250%22%20cy%3D%2250%22%20r%3D%2250%22%20fill%3D%22none%22%20stroke%3D%22%23bddad5%22%20stroke-width%3D%223%22/%3E%3Cpath%20fill%3D%22%235dc2af%22%20d%3D%22M72%2025L42%2071%2027%2056l-4%204%2020%2020%2034-52z%22/%3E%3C/svg%3E');
}

.todo-list li label {
  word-break: break-all;
  padding: 15px 15px 15px 60px;
  display: block;
  line-height: 1.2;
  transition: color 0.4s;
}

.todo-list li.completed label {
  color: #d9d9d9;
  text-decoration: line-through;
}

.todo-list li .destroy {
  display: none;
  position: absolute;
  top: 0;
  right: 10px;
  bottom: 0;
  width: 40px;
  height: 40px;
  margin: auto 0;
  font-size: 30px;
  color: #cc9a9a;
  margin-bottom: 11px;
  transition: color 0.2s ease-out;
}

.todo-list li .destroy:hover {
  color: #af5b5e;
}

.todo-list li .destroy:after {
  content: '×';
}

.todo-list li:hover .destroy {
  display: block;
}

.todo-list li .edit {
  display: none;
}

.todo-list li.editing:last-child {
  margin-bottom: -1px;
}

.footer {
  color: #777;
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}

.footer:before {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 50px;
  overflow: hidden;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2),
              0 8px 0 -3px #f6f6f6,
              0 9px 1px -3px rgba(0, 0, 0, 0.2),
              0 16px 0 -6px #f6f6f6,
              0 17px 2px -6px rgba(0, 0, 0, 0.2);
}

.todo-count {
  float: left;
  text-align: left;
}

.todo-count strong {
  font-weight: 300;
}

.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}

.filters li {
  display: inline;
}

.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}

.filters li a:hover {
  border-color: rgba(175, 47, 47, 0.1);
}

.filters li a.selected {
  border-color: rgba(175, 47, 47, 0.2);
}

.clear-completed,
html .clear-completed:active {
  float: right;
  position: relative;
  line-height: 20px;
  text-decoration: none;
  cursor: pointer;
}

.clear-completed:hover {
  text-decoration: underline;
}

.info {
  margin: 65px auto 0;
  color: #bfbfbf;
  font-size: 10px;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.5);
  text-align: center;
}

.info p {
  line-height: 1;
}

.info a {
  color: inherit;
  text-decoration: none;
  font-weight: 400;
}

.info a:hover {
  text-decoration: underline;
}

/*
  Hack to remove background from Mobile Safari.
  Can't use it globally since it destroys checkboxes in Firefox
*/
@media screen and (-webkit-min-device-pixel-ratio:0) {
  .toggle-all,
  .todo-list li .toggle {
    background: none;
  }

  .todo-list li .toggle {
    height: 40px;
  }
}

@media (max-width: 430px) {
  .footer {
    height: 50px;
  }

  .filters {
    bottom: 10px;
  }
}`,
            path: "/index.css"
          },
          {
            code: `hr {
  margin: 20px 0;
  border: 0;
  border-top: 1px dashed #c5c5c5;
  border-bottom: 1px dashed #f7f7f7;
}

.learn a {
  font-weight: normal;
  text-decoration: none;
  color: #b83f45;
}

.learn a:hover {
  text-decoration: underline;
  color: #787e7e;
}

.learn h3,
.learn h4,
.learn h5 {
  margin: 10px 0;
  font-weight: 500;
  line-height: 1.2;
  color: #000;
}

.learn h3 {
  font-size: 24px;
}

.learn h4 {
  font-size: 18px;
}

.learn h5 {
  margin-bottom: 0;
  font-size: 14px;
}

.learn ul {
  padding: 0;
  margin: 0 0 30px 25px;
}

.learn li {
  line-height: 20px;
}

.learn p {
  font-size: 15px;
  font-weight: 300;
  line-height: 1.3;
  margin-top: 0;
  margin-bottom: 0;
}

#issue-count {
  display: none;
}

.quote {
  border: none;
  margin: 20px 0 60px 0;
}

.quote p {
  font-style: italic;
}

.quote p:before {
  content: '“';
  font-size: 50px;
  opacity: .15;
  position: absolute;
  top: -20px;
  left: 3px;
}

.quote p:after {
  content: '”';
  font-size: 50px;
  opacity: .15;
  position: absolute;
  bottom: -42px;
  right: 3px;
}

.quote footer {
  position: absolute;
  bottom: -40px;
  right: 0;
}

.quote footer img {
  border-radius: 3px;
}

.quote footer a {
  margin-left: 5px;
  vertical-align: middle;
}

.speech-bubble {
  position: relative;
  padding: 10px;
  background: rgba(0, 0, 0, .04);
  border-radius: 5px;
}

.speech-bubble:after {
  content: '';
  position: absolute;
  top: 100%;
  right: 30px;
  border: 13px solid transparent;
  border-top-color: rgba(0, 0, 0, .04);
}

.learn-bar > .learn {
  position: absolute;
  width: 272px;
  top: 8px;
  left: -300px;
  padding: 10px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, .6);
  transition-property: left;
  transition-duration: 500ms;
}

@media (min-width: 899px) {
  .learn-bar {
    width: auto;
    padding-left: 300px;
  }

  .learn-bar > .learn {
    left: 8px;
  }
}`,
            path: "/base.css"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/UserProfile.view.js"
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
            path: "/index.js"
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
            path: "/BeautifulButton.view.js"
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
            path: "/index.js"
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
            path: "/CenterAlign.view.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/Header.view.js"
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
            path: "/index.js"
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
            path: "/index.js"
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
            path: "/Apple.view.js"
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
            path: "/index.js"
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
            path: "/Apple.view.js"
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
            path: "/index.js"
          }
        ]
      }
    ]
  }
]
