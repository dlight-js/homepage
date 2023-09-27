Let's review how far we've went. We've talked about html elements, text nodes, custom components, if statements and for loops. The syntax seems pretty smooth and straight forward, but what on earth are these function calls? How can it be collected in the Body method?

Let's take our first step by get to know "what are they".

In DLight, each of this function call is a DLNode. They're all different sub-nodes, having different features, but all inheriting from DLNode:

| html elements | text nodes | custom components | if statements | for loops|
| --- | --- | --- | --- | --- |
| HTMLNode | TextNode | CustomNode | IfNode | ForNode |

for example:

```js
div("hello") // ~> new HTMLNode("hello")
"world"      // ~> new TextNode("hello")
Greeting()   // ~> new CustomNode(Greeting)
```
So now you might ask, if every node type is fixed, is there a way to dynamically determine the current variable's node type and display it in the view? 

In another word, is there a function `xxx` that can achieve this?
```js
xxx(thisCouldBeAndNode) 
// -> switch (thisCouldBeAndNode.type)
//    case html: new HTMLNode()
//    case text: new TextNode()
//    case custom: new CustomNode()
```
Yes, there is, and the `xxx` function is called `_` or you can even ignore it. Quick example:
```js
@View
class MyComp {
  // I don't know which type it is
  @Prop variable: DLNode | string | undefined | null | (DLNode | string | undefined | null)[]

  Body() {
    // But I can just write this
    _(this.variable)
    // or
    this.variable
  }
}
```
But how can we determine if it's a `ExpressionNode`? 
1. wrapped with `_` function
2. not a call expression
for instance:
```js
@View
class MyComp {
  @Prop RUOK
  @Prop good
  @Prop bad

  Body() {
    _(this.RUOK ? this.good : this.bad)
    // or
    this.RUOK ? this.good : this.bad
  }
}
```
Just because it's not a `call expression` like `div()`, it's a changeable `ExpressionNode`.

This feature is most useful in **child component** or **slot**, which will be covered in basic-usages. Now you just need to know it's a valid syntax and it accepts everything.