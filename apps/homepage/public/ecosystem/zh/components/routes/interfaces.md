一些组件的接口定义。

```typescript
interface RouteGroupProps {
  /**
   * @brief The mode of the router, "hash" or "history"
   * @default "history"
   */
  mode?: "hash" | "history"
  /**
   * @brief The callback function when the path is updated
   */
  onPathUpdate?: (path: string) => void
  /**
   * @brief The loading component(applied only when the route is a lazy component)
   */
  loading?: (View: any) => void
  /**
   * @brief The guard function to check the route
   */
  guard?: LifecycleFunc
  /**
   * @brief The callback function after entering the route
   */
  afterEnter?: LifecycleFunc
  /**
   * @brief The callback function before leaving the route
   */
  beforeLeave?: LifecycleFunc
}
```

```typescript
interface RouteOption {
  /**
   * @brief The component of the route, could be a dlight component class or a lazy component
   */
  comp?: DLightViewComp | DLightViewLazy
  /**
   * @brief The children of the route, either comp or children should be provided
   */
  children?: DLightViewProp
  /**
   * @brief The loading component(applied only when the route is a lazy component)
   */
  loading?: DLightViewProp | DLightViewComp
  /**
   * @brief The redirect path
   */
  redirect?: string
  /**
   * @brief The info of the route, will be passed to the lifecycle functions
   */
  info?: Record<string, any>
}
```

```typescript
interface LinkProps {
  /**
   * @brief The content of the link
   */
  content?: ContentProp<string>
  /**
   * @brief The path to navigate to
   */
  to: string
  /**
   * @brief The mode of navigation, will retrieved from the navigator if not provided
   */
  mode?: "hash" | "history"
  /**
   * @brief The style of the a tag
   */
  style?: Record<string, string>
  /**
   * @brief The class of the a tag
   */
  class?: string
}
```