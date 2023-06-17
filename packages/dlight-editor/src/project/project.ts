import { Console } from "./log"
import { CodeParser, Module } from "./module"
import { Path } from "./path"

export class Project {
  modules: Module[] = []
  entryFile = "/index.ts"
  console = new Console()
  currentPath: Path
  mountId = ""

  constructor(entryFile: string, mountId: string, fileExtension = "ts") {
    this.entryFile = entryFile
    this.mountId = mountId
    this.currentPath = new Path(fileExtension)
    this.currentPath.to(this.entryFile)
  }

  async run() {
    try {
      await this.require(this.entryFile)
    } catch (e) {
      this.console.errors.push(e)
    }
  }

  addModule(path: string, code: string) {
    this.modules.push(new Module(path, CodeParser.noMountIdRender(code, this.mountId)))
  }

  async require(fileName: string) {
    if (![".", "/"].includes(fileName[0])) {
      switch (fileName) {
        case "@dlightjs/dlight":
          return await import("@dlightjs/dlight")
        case "@dlightjs/types":
          return await import("@dlightjs/types")
        case "@dlightjs/components":
          return await import("@dlightjs/components")
        case "@dlightjs/emotion":
          return await import("@dlightjs/emotion")
        default:
          return
      }
    }
    this.currentPath.to(fileName)
    const module = this.modules.find(module => module.path === this.currentPath.path)
    if (!module) {
      throw new Error(`No module named ${this.currentPath.path}`)
    }
    if (module.moduleExports === undefined) {
      module.moduleExports = {}
      await module.codeRunFunc(this.require.bind(this), module.moduleExports)
    }
    return module.moduleExports
  }
}
