在现代 Web 开发中，高效地管理全局或共享状态是一个至关重要的问题。仅仅使用单个组件内部的响应式变量是不够的。我们需要一种方式来在组件之间传递状态并引入全局状态。这种类型的状态容器通常被称为 `context` 或 `store` 。而在 DLight 中，我们将它们称为 `environment`。

# 现行的实现

上下文或存储可以保存一组状态，当这些状态发生变化时，相关的视图将被重新渲染。通常，这将采用发布者-订阅者模式来实现。但在 DLight 中不是这样的。在深入了解我们新的 `environment` 策略之前，让我们首先看看其他框架是如何处理这个问题的。 （所有这些示例都来自 [Component Party](https://component-party.dev/#context)）。

在 React 里：

```js [react/App.jsx]
import { useState, createContext } from "react";
import UserProfile from "./UserProfile";

export const UserContext = createContext();

export default function App() {
  // In a real app, you would fetch the user data from an API
  const [user, setUser] = useState({
    id: 1,
    username: "unicorn42",
    email: "unicorn42@example.com",
  });

  function updateUsername(newUsername) {
    setUser((userData) => ({ ...userData, username: newUsername }));
  }

  return (
    <>
      <h1>Welcome back, {user.username}</h1>
      <UserContext.Provider value={{ ...user, updateUsername }}>
        <UserProfile />
      </UserContext.Provider>
    </>
  );
}
```

```js [react/UserProfile.jsx]
import { useContext } from "react";
import { UserContext } from "./UserContext";

export default function UserProfile() {
  const { username, email, updateUsername } = useContext(UserContext);

  return (
    <div>
      <h2>My Profile</h2>
      <p>Username: {username}</p>
      <p>Email: {email}</p>
      <button onClick={() => updateUsername("Jane")}>
        Update username to Jane
      </button>
    </div>
  );
}
```

在 Vue3 里：

```html [vue/App.vue]
<script setup>
import { ref, provide } from "vue";
import UserProfile from "./UserProfile.vue";

const user = ref({
  id: 1,
  username: "unicorn42",
  email: "unicorn42@example.com",
});

function updateUsername(username) {
  user.value.username = username;
}

provide("user", { user, updateUsername });
</script>

<template>
  <h1>Welcome back, {{ user.username }}</h1>
  <UserProfile />
</template>

```

```html [vue/UserProfile.vue]
<script setup>
import { inject } from "vue";
const { user, updateUsername } = inject("user");
</script>

<template>
  <div>
    <h2>My Profile</h2>
    <p>Username: {{ user.username }}</p>
    <p>Email: {{ user.email }}</p>
    <button @click="() => updateUsername('Jane')">
      Update username to Jane
    </button>
  </div>
</template>
```

接下来，虽然 React 和 Vue3 的示例展示了在组件之间如何传递状态和方法，但它们确实也引入了一定程度的复杂性和很多新概念，如上下文（context）、提供（provide）和注入（inject）。对于初学者来说，这可能会带来学习成本。

# DLight 中的环境

有人可能会问：为什么我们不能以一种直接的方式来管理多个组件之间的共享状态，正如我们在父子组件之间传递属性的方式那样呢？毕竟，在多个组件之间传递数据的原则难道不应该与只有两个组件时的原则一样嘛？

我们不一定需要重新发明轮子；我们只需要一种更直观的的方法，让我们在只需掌握更少的概念的同时，来实现从简单的父子组件属性传递范式到全局状态管理场景的无缝过渡。

在 DLight 中，环境（environment）就像一个共享的空间或者说一个公共的地方。在“环境”里，所有组件都可以访问相同的状态和方法。这个空间在代码中明确定义，清晰地显示了哪些组件是这个共享上下文的一部分。

现在，将我们上述的理解以下示例结合起来：

```js [DLight/App.js]
// ~> App.js
import { View } from "@dlightjs/dlight"
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

  Body() {
    h1(`Welcome back, ${this.user.userName}`)
    env()
      .user(this.user)
      .updateUsername(this.updateUsername)
    {
      UserProfile()
    }
  }
}

export default App
```

```js [DLight/UserProfile.js]
// ~> UserProfile.js
@View
class UserProfile {
  @Env user
  @Env updateUsername

  Body() {
    div()
    {
      h2("My Profile")
      p(`Username: ${this.user.username}`)
      p(`Email: ${this.user.email}`)
      button("Update username to Jane")
        .onclick(() => this.updateUsername("Jane"))
    }
  }
}

export default UserProfile
```

在给出的 DLight 代码片段中：

* App 组件使用 `env` 节点来定义了一个环境（environment）。**这个节点** 有效地为所有其包含的组件创建了一个共享空间。这些组件被包裹在后面的 "{}" 中，比如上面代码的 `UserProfile`。
* 在 `UserProfile` 组件里，`@Env` 装饰器被用来引入共享的状态和方法。
  就像你使用 `@Prop` 来检索获取属性一样，这种直接链接展示了在环境中访问共享资源是多么直观和简单。

通过将状态管理整合到清晰的环境中，DLight 确保了开发者可以构建更易维护、更高性能、更有组织性的应用程序。这一范式消除了围绕共享状态产生的许多困惑，并且为我们提供了一种简化和高效的方式来管理跨组件的全局和共享状态。

# 嵌套环境

在DLight中，你可以在其他环境内部拥有环境。我们称之为 “嵌套环境”。以下是你需要了解的内容：

* 如果是在嵌套环境中，你可以访问来自外部环境和内部环境的变量。
* 如果内部环境中有与外部环境中相同名称的变量，那么内部环境中的变量会被使用。

以下是一个简单的示例来展示上述内容：

```js
@View
class MyComp {
  @Env message // this will be ok
  @Env count // this will be 100

  Body() {
    "nothing here"
  }
}

@View
class App {
  Body() {
    env()
      .message("ok")
      .count(0)
    {
      env()
        .count(100)
      {
        MyComp()
      }
    }
  }
}
```

# 性能问题
环境设置会导致性能问题吗？答案是否定的。设置环境就像设置一个属性一样。这是一次性操作。环境不是一个响应式变量，并且当它改变时不会导致重新渲染。它只是一种在组件之间传递数据和方法的方式。