import { ExmaplesCodeDataType } from "../utils/types"

export const ExamplesCodeData: ExmaplesCodeDataType[] = [
  {
    title: "Reactivity",
    description: "",
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
    Body() {
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
  
    Body() {
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
    Body() {
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
  
    Body() {
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
    Body() {
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
  
    Body() {
      div(this.doubleCount)
    }
  }
  
  export default DoubleCount`,
            path: "/DoubleCount.view.ts"
          }
        ]
      }
    ]
  }

]
