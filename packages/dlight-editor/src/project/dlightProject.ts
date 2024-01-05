import transformDlight from "@dlightjs/transpiler-standalone"
import { Project } from "./project"
import { TransformedProjectModule, ToBeTransformedModule } from "./types"
import { Module } from "./module"

export class DLightProject {
  modules: ToBeTransformedModule[]
  transformedModules: TransformedProjectModule[]
  moduleClasses: any[] = []
  project: Project
  moduleId: string
  console: any
  srcDoc: string = ""

  constructor(modules: ToBeTransformedModule[], entryFile = "./index") {
    this.modules = modules
    this.transformedModules = modules.map(module => ({ ...module, dlightCode: transformDlight(module.code) }))
    this.moduleId = Math.random().toString(32).slice(2, 8)
    this.project = new Project(entryFile, this.moduleId)
    for (const module of this.transformedModules) {
      this.moduleClasses.push(new Module(module.path, module.dlightCode))
      this.project.addModule(module.path, module.dlightCode)
    }
    const callEntryFile = `\n(${this.project.entryFile.replace(/\./g, "_").replace(/\//g, "$")})()`
    this.srcDoc = this.moduleClasses.map(module => module.parsedCode).join("\n") + callEntryFile
    this.console = this.project.console
  }

  new(func: (modules: ToBeTransformedModule[]) => ToBeTransformedModule[]) {
    return new DLightProject(func(this.modules))
  }
}
