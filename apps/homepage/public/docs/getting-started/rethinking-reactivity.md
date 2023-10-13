A Deep Dive into the Reactivity Graph

# Introduction
Reactivity, or the ability to update the UI in response to data changes, is pivotal in modern frontend frameworks. As frontend applications burgeon in complexity, managing the mutable states and their effects on the UI is vitally important. While the frontend community has devised various solutions for reactivity, a handful of common issues and challenges still linger:
* Inconsistent Updates: Issues can sprout from inconsistencies between data changes and UI updates.
* Over-rendering: An inability to precisely discern which UI parts need re-rendering can lead to unnecessary computations and DOM manipulations.
* Dependency Management Challenges: Understanding and managing dependencies between various states becomes increasingly intricate in large applications.
* Debugging Difficulties: Without clear data flow and update logic, troubleshooting can become a notably time-consuming task.


# The Concept of a Reactivity Graph
Reflecting on these challenges, can we discern a pattern? Don’t these updates, dependencies, and data movements construct a graph? The data states serve as nodes and their dependencies as edges, weaving a network wherein changes propagate to trigger UI updates when data alters.

This brings us to the crux of today's discussion — the “Reactivity Graph”. Within this graphical model:
* Nodes: Represent an observable and mutable state.
* Edges: Depict dependencies between states.
* Direction: Determines the propagation direction of data changes.

Each state change in this model will propagate along the direction of the dependencies (edges), accurately updating all affected parts in the application and minimizing unnecessary renders and calculations.

While the concept of the `Reactivity Graph` has been explored and applied in various domains since the last century, its thorough and systematic implementation in frontend frameworks is notably lacking. This gap presents an opportunity to explore and adapt this robust model to address the unique challenges of managing reactivity and data flow in modern web development.

# Building the Reactivity Graph
## Basic count example
Consider a simple application state where we have `count`, `doubleCount` (which is always twice the count), and a UI element `first-el` that displays the count value.

Before we visualize our Reactivity Graph, let’s take a moment to conceptualize our example through code. Note that the following syntax ISN'T specific to any framework but is written to convey the idea in an understandable manner.
```js [reactivity example]
let count = declareState(1);
let doubleCount = declareComputed(() => count * 2);
const el1 = document.createElement("div");
el1.id = "first-el";
bindView(el, "innerText", () => count);
```
Here's a simplified breakdown:
* `declareState(0)`: Declares a reactive state count initialized with 0.
* `declareComputed(() => count * 2)`: Declares a reactive computed state doubleCount that is always double the value of count.
* `document.createElement("div")`: Creates a new `<div>` element and assigns it an ID of "first-el".
* `bindView(el, "innerText", () => count)`: Binds the inner text of our el element to always display the current value of count.

Now, let's transform this into a simple reactivity graph:
![reactivity-graph0](../imgs/reactivity-graph0.jpeg "reactivity-graph0" 100%)

In this graph, nodes (`count`, `doubleCount`, and `div: first-el`) represent our states and UI element and edges signify the dependencies between them, which will be:
1. When `count` changes, `doubleCount` re-calculates **ONCE** 
2. When `count` changes, `first-el` re-renders innerText **ONCE**
Put them in a table:

| state | target |
| --- | --- |
| count | doubleCount |
|       | first-el |

Visualizing will be like:

![reactivity-graph0-count](../imgs/reactivity-graph0-count.gif "reactivity-graph0-count" 100%)

## Adding a Layer of Complexity
Let’s modify our example to make `first-el` display `doubleCount` instead of `count`. We'll also make some small changes to the JavaScript pseudo-code to reflect this:
```jsx
let count = declareState(1);
let doubleCount = declareComputed(() => count * 2);
let el1 = document.createElement("div");
el1.id = "first-el";
bindView(el, "innerText", () => /*CHANGE*/doubleCount/*CHANGE*/);
```
The reactivity graph would look like:
```js
[ count ] ---> [ doubleCount ] ---> [ first-el ]
```
Here's an illustration of the reactivity flow within our new graph:
1. When `count` changes, `doubleCount` re-calculates **ONCE** 
2. When `doubleCount` changes, `first-el` re-renders innerText **ONCE**



## More Complexity - Double Element Display
Expanding our previous example, let’s include another UI element, second-el, which will display the count value while first-el continues to display doubleCount.
Again, let’s illustrate with code before visualizing the reactivity graph:
```js
let count = declareState(1);
let doubleCount = declareComputed(() => count * 2);
let el1 = document.createElement("div");
let el2 = document.createElement("div");
el1.id = "first-el";
el2.id = "second-el";
bindView(el1, "innerText", () => doubleCount);
bindView(el2, "innerText", () => count);
```
With this setup, let’s visualize the reactivity graph:
```text
[ count ] ---> [ doubleCount ] ---> [ first-el ]
    |
    V
[ second-el ]
```
We can now conclude the data flow as:
1. When `count` changes, `doubleCount` re-calculates **ONCE** 
2. When `count` changes, `first-el` re-renders innerText **ONCE**
2. When `doubleCount` changes, `second-el` re-renders innerText **ONCE**