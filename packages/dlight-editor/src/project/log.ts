export class Console {
  logs: any[][] = []
  errors: any[] = []

  log(...messages: any[]) {
    console.log("inner", ...messages)
    this.logs.push(messages)
  }

  error(...messages: any[]) {
    console.error("inner", ...messages)
    this.errors.push(messages)
  }
}
