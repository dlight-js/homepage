This is a rather complicated example that showcases all the capabilities of the `Route` and `RouteGroup` components. It's a good idea to read the documentation of these components before reading this example.

```typescript [App.view.ts]
import { Main, View, div, h1, h2 } from "@dlightjs/dlight"
import { RouteGroup, Route } from "@dlightjs/components"
import DocView from "./Doc.view";
import AboutView from "./About.view";
import Links from "./Links.view";

@View
@Main
class App {
  Body() {
    Links([
      "/home", 
      "/about", 
      "/docs/normal-doc", 
      "/docs/another-good-doc", 
      "/docs/bad-doc", 
      "/docs/confidential-doc-2",
      "/docs/redirect-doc"
    ])

    RouteGroup(); {
      // ---- Lazy loaded route
      Route("home")
        .comp(() => import("./Home.view"))
        .loading(View => {
          div("Loading...")
        })

      // ---- Component route
      Route("about")
        .comp(AboutView)

      Route("docs"); {
        h1("Docs")
        div().class("doc-wrapper"); {
          // ---- Nested RouteGroup
          RouteGroup()
            .guard((to, from, baseUrl) => {
              // ---- Checking path, redirecting to good-doc
              if (to.path === `${baseUrl}/bad-doc`) return "~/not-found"
              // ---- Checking info, if confidential, block access
              if (to.confidential) return false
            })
            .afterEnter((to, from) => {
              // ---- Before route enter
              console.log(`Entering ${to.path} from ${from.path}...`)
            })
            .beforeLeave((to, from) => {
              // ---- Before route leave
              console.log(`Leaving ${from.path} to ${to.path}...`)
            })
            .loading(View => {
              // ---- Same as Route().loading(), 
              //      but applied for all path in this RouteGroup
              div("doc loading")
            })
          {
            // ---- Children Route
            Route("not-found"); {
              h2("404 - Not Found")
            }

            // ---- Redirect route, will be redirected to good-doc, 
            //      ~ means base path, which is /docs
            Route("redirect-doc")
              .redirect("~/good-doc")

            // ---- Confidential route, fully regex supported
            Route("confidential.+?")
              .info({
                confidential: true
              })

            // ---- Using regex named group to get the name of the doc from the path
            //      and treat it as a prop passed to DocView
            Route("(?<name>.*)")
              .comp(DocView)

            // ---- Any other route will be redirected to here,
            //      same with Route(".*")
            Route(); {
              h2("You're not supposed to be here")
            }
          }
        }
      }
    }
  }
}

```

```typescript [Links.view.ts]
import { View, type Pretty, type Typed, ContentProp, Content, required, button, div } from "@dlightjs/dlight"
import { Link } from "@dlightjs/components"

interface LinksProps {
  links: ContentProp<string[]>
}

@View
class Links implements LinksProps {
  @Content links: LinksProps["links"] = required

  @View
  Link = ({content: path}: any) => {
    Link().to(path); {
      button(path)
    }
  }

  Body() {
    div(); {
      for (const link of this.links) {
        this.Link(link)
      }
    }
  }
}

export default Links as Pretty as Typed<LinksProps>
```
```typescript [Home.view.ts]
import { View, type Pretty, type Typed, h1 } from "@dlightjs/dlight"

@View
class Home {
  Body() {
    h1("Home: component")
  }
}

export default Home as Pretty as Typed
```
```typescript [About.view.ts]
import { View, type Pretty, type Typed, h1 } from "@dlightjs/dlight"

@View
class About {
  Body() {
    h1("About: component")
  }
}

export default About as Pretty as Typed
```
```typescript [Doc.view.ts]
import { View, type Pretty, type Typed, Prop, required, h2 } from "@dlightjs/dlight"

@View
class Doc {
  @Prop name: string = required

  willMount() {
    console.log(`Doc willMount: ${this.name}`)
  }
  willUnmount() {
    console.log(`Doc willUnmount: ${this.name}`)
  }
  
  Body() {
    h2(`Doc name: ${this.name}`)
  }
}

export default Doc as Pretty as Typed
```