/* eslint-disable no-eval */
import { Console } from "./log"
import { Module } from "./module"
import { Path } from "./path"

export class Project {
  modules: Module[] = []
  entryFile = "/index.ts"
  console = new Console()
  currentPath: Path
  mountId = ""
  imports = []

  constructor(entryFile: string, mountId: string, fileExtension = "ts") {
    this.entryFile = entryFile
    this.mountId = mountId
    this.currentPath = new Path(fileExtension)
    this.currentPath.to(this.entryFile)
  }

  addModule(path: string, code: string) {
    this.modules.push(new Module(path, code))
  }
}
