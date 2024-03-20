我们在 DLight 的 View 语法中拥有了纯 JS 的力量。我们希望 TypeScript 的类型支持也能做到同样的事情，这意味着不需要插件，不需要额外的 vscode 扩展，也不需要额外的配置。我们希望利用 ts 的内置类型支持来使开发体验流畅而愉快。

这种集成由 `@dlightjs/types` 包提供。它为 DLight 的 DSL 语法提供了一套 TypeScript 类型。你应该将其安装为 `devDependency` 而不是 `dependency`，因为它仅用于提供类型支持（即使你可能在代码中看到一些值引用，但它们都会被 DLight 编译器移除）。

# HTML 元素
先来个示范：
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

与 JS 版本无异。但在你引入 `@dlightjs/types`之后, 你会在你的IDE里得到完整的类型支持：

属性 & 事件：
![ts-el-attr](./imgs/ts-el-attr.gif "ts-el-attr")

内联样式 & 数据集：
![ts-el-style](./imgs/ts-el-style.gif "ts-el-style")

生命周期 & 元素：
![ts-el-dlight](./imgs/ts-el-dlight.gif "ts-el-dlight")


# 组件
同样也先来个示范：

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

为了使组件得到完整的类型支持，你需要:
1. 给你的组件属性声明一个类型，就像你在 ts 中常做的那样
2. 在你的组件类中实现这个类型
3. 将组件转换为 `Pretty` ，然后用你在第一步中声明的类型转换为 `Typed` 

我们需要首先将组件转换为 `Pretty` 的原因是我们需要强制将一个类类型转换为一个函数， 而 `Pretty` 只是 `any`。的一个别名。所以基本上，我们在做这件事：
```typescript
export default MyComp as any as Typed<MyCompProps>
```

但这样做太丑了，会变成 **AnyScript**, 所以我们使用 `as Pretty as` 来使我们的代码 `as Pretty as` 我们定义的类型。


你在 IDE 中得到的将是：
![ts-comp](./imgs/ts-comp.gif "ts-comp")


# 环境
示例:
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
在你的 IDE 中你会得到：
![ts-env](./imgs/ts-env.gif "ts-env")

# 模型
示例：
```typescript
import { Model, type Modeling, type Pretty } from "@dlightjs/dlight"

interface FetchModelProps {
  url: string
}

@Model
class FetchModel implements FetchModelProps {
  @Prop url = required
  data = await fetch(this.url)
}

export default FetchModel as Pretty as Modeling<FetchModel, FetchModelProps>
```

DLight提供了一个类型，用于在TypeScript中使用 `use` 函数时获得最佳编码体验。第一个参数是模型类，第二个参数是模型需要的props。

## 泛型模型
```typescript
import { Model, type Modeling, type Pretty } from "@dlightjs/dlight"

interface FetchModelProps<G> {
  url: string
  args: G
}

@Model
class FetchModel<T, G> implements FetchModelProps<G> {
  @Prop url = required
  @Prop args = required
  data: T = await fetch(this.url, this.args)
}

export default FetchModel as Pretty as <T, G>(props: G) => GetData<T, G>
```

当你想要创建一个泛型模型时，事情会变得有点复杂。你需要在模型类和props接口中声明泛型类型，然后你需要声明一个具有泛型类型参数的函数类型，以将模型类转换为它。这样当你在 `use` 函数中使用它时，你可以这样做：

```typescript
const fetchModel = use(FetchModel<string, MyDataType>, { url, args })
```

除非你正在做一些高级的事情或你是一个库构建者，否则你不会经常看到这个。