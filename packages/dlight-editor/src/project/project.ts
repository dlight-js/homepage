/* eslint-disable no-eval */
import { Console } from "./log"
import { CodeParser, Module } from "./module"
import { Path } from "./path"
import * as DLight from "@dlightjs/dlight"
import * as Types from "@dlightjs/types"
import * as Components from "@dlightjs/components"

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

  // async run() {
  //   try {
  //     await this.require(this.entryFile)
  //   } catch (e) {
  //     this.console.error(e)
  //   }
  // }

  addModule(path: string, code: string) {
    this.modules.push(new Module(path, code))
  }

  // async require(fileName: string) {
  //   if (![".", "/"].includes(fileName[0])) {
  //     switch (fileName) {
  //       case "@dlightjs/dlight":
  //         return DLight
  //       case "@dlightjs/types":
  //         return Types
  //       case "@dlightjs/components":
  //         return Components
  //       default:
  //         return
  //     }
  //   }
  //   this.currentPath.to(fileName)
  //   const module = this.modules.find(module => module.path === this.currentPath.path)
  //   if (!module) {
  //     throw new Error(`No module named ${this.currentPath.path}`)
  //   }
  //   if (module.moduleExports === undefined) {
  //     module.moduleExports = {}
  //     await module.codeRunFunc(this.require.bind(this), module.moduleExports, this.console)
  //   }
  //   return module.moduleExports
  // }

  async generator() {
    const code = this.modules.map(module => `(async () => { 
      await (${module.codeRunFunc})(); 
    })();`).join("\n")
    return code
  }

  
    
  //   if (![".", "/"].includes(fileName[0])) {
  //     switch (fileName) {
  //       case "@dlightjs/dlight":
  //         return DLight
  //       case "@dlightjs/types":
  //         return Types
  //       case "@dlightjs/components":
  //         return Components
  //       default:
  //         return
  //     }
  //   }
  //   this.currentPath.to(fileName)
  //   const module = this.modules.find(module => module.path === this.currentPath.path)
  //   if (!module) {
  //     throw new Error(`No module named ${this.currentPath.path}`)
  //   }
  //   if (module.moduleExports === undefined) {
  //     module.moduleExports = {}
  //     await module.codeRunFunc(this.require.bind(this), module.moduleExports, this.console)
  //   }
  //   return module.moduleExports
  // }
}
