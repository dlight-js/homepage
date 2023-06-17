
export class Path {
  path = ""
  extension

  constructor(extension: string) {
    this.extension = extension
  }

  toAbsolute(path: string) {
    this.path = path
  }

  to(path: string) {
    if (!path.endsWith("." + this.extension)) {
      path += "." + this.extension
    }
    if (path.startsWith("..")) {
      this.back()
      this.back()
      this.forward(path.replace(/^\.\.\//, ""))
      return
    }
    if (path.startsWith(".")) {
      this.back()
      this.forward(path.replace(/^\.\//, ""))
    }
    if (path.startsWith("/")) {
      this.toAbsolute(path)
    }
  }

  forward(path: string) {
    this.path += "/" + path
  }

  back() {
    const pathArr = this.path.split("/")
    if (pathArr.length === 0) {
      throw new Error("No way back")
    }
    this.path = pathArr.slice(0, -1).join("/")
  }
}
