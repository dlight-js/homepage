export class Console {
  logs: any[][] = []
  errors: any[] = []
  dlNode: any

  log(...messages: any[]) {
    console.log("inner", ...messages)
    this.logs.push(messages)
    // this.dlNode.logs = [...this.logs]
  }

  error(...messages: any[]) {
    console.error("inner", ...messages)
    this.errors.push(messages)
    this.dlNode.errors = [...this.errors]
  }

  register(node: any) {
    this.dlNode = node
  }
}
