import transformDlight from "@dlightjs/transpiler-standalone"
import { Project } from "./project"
import { TransformedProjectModule, ToBeTransformedModule } from "./types"

export class DLightProject {
  modules: ToBeTransformedModule[]
  transformedModules: TransformedProjectModule[]
  project: Project
  moduleId: string
  console: any

  constructor(modules: ToBeTransformedModule[], entryFile = "/index") {
    this.modules = modules
    this.transformedModules = modules.map(module => ({ ...module, dlightCode: transformDlight(module.code) }))
    this.moduleId = Math.random().toString(32).slice(2, 8)
    this.project = new Project(entryFile, this.moduleId)
    for (const module of this.transformedModules) {
      this.project.addModule(module.path, module.dlightCode)
    }
  }

  async run() {
    await this.project.run()
    this.console = this.project.console
  }

  new(func: (modules: ToBeTransformedModule[]) => ToBeTransformedModule[]) {
    return new DLightProject(func(this.modules))
  }
}
