import { ToBeTransformedModule, TransformedProjectModule } from "./types"
import { transformDlight, transformEmbeddedCode } from "./module"

export class DLightProject {
  modules: ToBeTransformedModule[]
  transformedModules: TransformedProjectModule[]
  moduleClasses: any[] = []
  moduleId: string
  console: any
  srcDoc: string = ""

  constructor(modules: ToBeTransformedModule[], entryFile = "./index") {
    this.modules = modules
    this.transformedModules = modules.map(module => ({ ...module, dlightCode: transformDlight(module.code) }))
    this.moduleId = Math.random().toString(32).slice(2, 8)
    for (const { path, code } of modules) {
      const dlightCode = transformDlight(code)!
      this.moduleClasses.push(transformEmbeddedCode(dlightCode, path.replace(/\.js$/, "")))
    }
    const callEntryFile = `\n(${entryFile.replace(/\./g, "_").replace(/\//g, "$")})()`
    this.srcDoc = this.moduleClasses.join("\n") + callEntryFile
  }

  new(func: (modules: ToBeTransformedModule[]) => ToBeTransformedModule[]) {
    return new DLightProject(func(this.modules))
  }
}
