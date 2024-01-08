The concept of a "lifecycle" in web development refers to the different stages a component or an element goes through from its inception to its removal from the DOM. By understanding and leveraging these stages, developers can perform specific actions at precise moments, enhancing user experience and ensuring the efficient operation of the component.

DLight offers a **genuine** lifecycle, reflecting actual visual changes in the component on the screen. This can be very helpful when handling animations, fetching data, or ensuring the smooth transition of elements.

# Lifecycle in Custom Components:
For custom components, there are four lifecycle methods:

* willMount: This is invoked right before the component is rendered on the DOM. It's an ideal place for setting initial states or triggering events that need to happen before the component appears.
* didMount: Called immediately after the component has been rendered and is now part of the DOM. It's perfect for actions that require the component to be in the DOM, like accessing its properties or making API calls.
* willUnmount: Triggered just before the component is about to be removed from the DOM. This is where you'd typically handle cleanup operations, like clearing timers or canceling network requests.
* didUnmount: Invoked right after the component has been removed from the DOM. Use this if you need to execute any final actions after the component is gone.

There're two ways of using lifecycle inside a custom components:
## As Class Methods
The first method is directly embedding these lifecycle hooks as methods within the class definition of a custom component. It's akin to defining any method within the class.

For instance:
```js
@View
class MyComponent {
  willMount() {
    // This code will run just before the component mounts
  }

  didMount() {
    // This code will run right after the component mounts
  }
  // ... similarly for willUnmount and didUnmount

  Body() {...}
}
```
This approach allows developers to cohesively group the component's logic, state, and lifecycle-related operations, ensuring clarity and ease of maintenance.

## During Component Invocation
The second method allows developers to dynamically assign lifecycle methods during the component's invocation. This can be particularly useful when you want to provide additional behavior without altering the component's original class definition.

Usage:
```js
// inside Body
MyComponent()
  .willMount(comp => {
    console.log(`${comp} is about to mount!`)
    // Code to run before mounting
  })
  .didMount(() => {
    // Code to run after mounting
  });
  // ... similarly for willUnmount and didUnmount
```
This method provides flexibility, especially when reusing components across different parts of an application. It enables developers to tailor component behavior on-the-fly based on its context of usage.

# Lifecycle in HTML Elements
HTML elements in DLight have the same lifecycle methods as custom components. However, unlike custom components where lifecycle methods can be added both within the class definition and during invocation, HTML elements in DLight utilize the methods directly during the element's declaration:

```js
div()
  .willMount(() => {
    console.log("div will appear in the DOM!")
  })
  .didMount(element => {
    console.log(`${element} has appeared in the DOM!`)
  })
  .willUnmount(() => {
    console.log("div will be removed from the DOM!")
  })
  .didUnmount(() => {
    console.log("div has been removed from the DOM!")
  })
```
This approach allows developers to easily and intuitively define lifecycle behaviors directly where the element is declared, making it clear when and how the element's lifecycle methods will be invoked.

# Lifecycle order in nested components/elements
## willMount/willUnmount
The `willMount` and `willUnmount` methods are invoked in the order of the component's hierarchy. For instance, if you have a component that contains another component, the `willMount` method of the parent component will be invoked before the child component's `willMount` method. Similarly for `willUnmount`.

## didMount/didUnmount
The `didMount` and `didUnmount` methods are invoked in the reverse order of the component's hierarchy. For instance, if you have a component that contains another component, the `didMount` method of the child component will be invoked after the parent component's `didMount` method. Similarly for `didUnmount`.

Example:
```js
A(); {
  B(); {
    C()
  }
  D()
}
```
Lifecycle order:
```
A.willMount -> B.willMount -> C.willMount -> D.willMount 
-> D.didMount -> C.didMount -> B.didMount -> A.didMount

A.willUnmount -> B.willUnmount -> C.willUnmount -> D.willUnmount
-> D.didUnmount -> C.didUnmount -> B.didUnmount -> A.didUnmount
```
