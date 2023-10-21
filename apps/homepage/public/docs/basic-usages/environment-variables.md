In modern web development, managing global or shared state efficiently is a paramount concern. Reactive variables alone inside a single component is not enough. We need a way to pass states across components and require global states. Containers of this type of state will often be called as `context` or `store`. And in DLight, we call them `environment`.

# Current Implementations
A context or store can save a group of states, and when these states change, relative views will be re-rendered. This will often be done in a publisher-subscriber pattern. But not this time in DLight. Before we dive into our new `environment` strategy, let's first examine how other frameworks addressed this. (All these examples are from [Component Party](https://component-party.dev/#context))

In react:
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

In Vue3:
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

Next, while the examples from React and Vue3 showcase ways of passing states and methods between components, they indeed introduce a level of complexity and new concepts, such as context, provide, and inject. For beginners, this might present a learning curve.

# Environment in DLight
One might ask: Why can't we manage the shared state across multiple components in a straightforward manner, similar to how we handle prop-passing between parent-child components? After all, shouldn't the principle of passing data between multiple components be the same as with just two components? We don't necessarily need to reinvent the wheel; we just need a method that's more intuitive, with fewer concepts to juggle and a seamless transition from the simple parent-child prop-passing paradigm to a more global state management scenario.

In DLight, an environment is like a shared space or a common ground where all participating components have access to the same state and methods. This space is defined explicitly in the code, making it unmistakably clear which components are part of this shared context. 

Now, integrating this understanding with the provided example:
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

In the given DLight code:
* The App component defines an environment using the `env` node. This node effectively creates a shared space for all enclosed components, which are wrapped up with a following "{}", in this case, `UserProfile`.
* Inside the `UserProfile` component, the `@Env` decorator is then utilized to pull in the shared state and methods. Just like how you retrieve a prop using `@Prop`, this direct link showcases how intuitive and straightforward it is to access shared resources within an environment.

By consolidating state management into clear environments, DLight ensures developers can craft more maintainable, performant, and organized applications. This paradigm removes much of the confusion around shared state and offers a simplified and efficient way to manage global and shared states across components.

# Nested Environment
In DLight, you can have environments inside other environments. We call this a "nested environment". Here's what you need to know:
* If you're inside a nested environment, you can access variables from both the outer and inner environment.
* If the inner environment has a variable with the same name as the outer one, the inner one is used.

Here's a simple example sorting this:
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
