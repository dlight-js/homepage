export const indexCode = `
import {View, render} from "@dlightjs/dlight"

export class MyComp extends View {
  count = 0  
  countPlus1 = this.count + 1  

  Body() {
    h1("hello, dlight js, jsd")
    div(this.count)
    div(this.countPlus1)
    button("+")
      .onclick(() => {
        this.count ++
      })
    button("-")
      .onclick(() => {
        this.count --
      })
  }
}

render(document.getElementById("app"), MyComp)
`
