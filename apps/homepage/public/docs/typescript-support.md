We've got PURE JS POWER in DLight's View syntax. We want the same thing for the typing support of TypeScript, which means no plugins, no extra vscode extensions, and no extra configuration. We want to use ts's buildin typing support to make developing experience smooth and delightful. 

This integration is provided by the `@dlightjs/types` package. It provides a set of typescript types for DLight's DSL syntax. You should install it as a `devDependency` instead of a `dependency` because it's only used for typing support(even though you may see some value references in your code, but they'll all be removed by the DLight compiler).

# HTML Elements
Example first:
```typescript
import { View } from "@dlightjs/dlight"
import { div, button } from "@dlightjs/types"

@View
class MyComp {
  View() {
    div().class("app"); {
      button("click me")
        .onClick(() => {
          alert("clicked")
        })
    }
  }
}
```

No difference from the js version. But after you add imports from `@dlightjs/types`, you'll get full typing support in your IDE:

Attributes & events:
![image](./imgs/ts-el-attr.gif)

Inline style & dataset:
![image](./imgs/ts-el-style.gif)

Lifecycle & element:
![image](./imgs/ts-el-dlight.gif)


# Components
Also example first:

```typescript
import { View } from "@dlightjs/dlight"
import { required, type Typed, type Pretty } from "@dlightjs/types"

interface MyCompProps {
  /** This is prop1 */
  prop1: string
  /** Prop2 is a number */
  prop2: number
  /**
   * @default true
   * Prop3 is a boolean
   */
  prop3: boolean
}

@View
class MyComp implements MyCompProps {
  @Prop prop1 = required
  @Prop prop2 = required
  @Prop prop3 = required

  View() {}
}

export default MyComp as Pretty as Typed<MyCompProps>
```

So to get full typing support for your component, you need to:
1. Declare a type for your component props as you always do in ts
2. Implement the type in your component class
3. Cast component first to `Pretty` and then to `Typed` with the type you declared in step 1

The reason that we need to cast the component to `Pretty` first is that we need to force cast a class type to a function, and `Pretty` is just an alias of `any`. So basically, we're doing this:
```typescript
export default MyComp as any as Typed<MyCompProps>
```

But this would be too ugly and became **AnyScript**, so we do `as Pretty as` to make our code `as Pretty as` the type we defined.


And what you get in your IDE:
![image](./imgs/ts-comp.gif)


# Environment
Example:
```typescript

interface EnvType {
  theme?: Theme
  language?: string
}

class SubCompClass implements EnvType {
  @Env theme?: Theme | undefined
  @Env language?: string | undefined
  View() {}
}

const SubComp = SubCompClass as Pretty as Typed

@View
class MyComp {

  View() {
    env<EnvType>()
      .language("en")
      .theme(darkTheme)
    {
      SubComp()
    }
  }
}
```
What you get in your IDE:
![image](./imgs/ts-env.gif)