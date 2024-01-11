import { ToBeTransformedModule, TransformedProjectModule } from "./types"
import { transformDlight, transformEmbeddedCode } from "./parser"

export class DLightProject {
  modules: ToBeTransformedModule[]
  transformedModules: TransformedProjectModule[]
  moduleClasses: any[] = []
  moduleId: string
  srcDoc: string = ""
  css: string = ""

  constructor(modules: ToBeTransformedModule[], entryFile = "./index") {
    this.modules = modules
    const jsModules = modules.filter(module => module.path.endsWith(".js"))
    this.transformedModules = jsModules.map(module => ({ ...module, dlightCode: transformDlight(module.code) }))
    this.moduleId = Math.random().toString(32).slice(2, 8)
    for (const { path, code } of jsModules) {
      const dlightCode = transformDlight(code)!
      this.moduleClasses.push(transformEmbeddedCode(dlightCode, path.replace(/\.js$/, "")))
    }
    const callEntryFile = `\n(${entryFile.replace(/\./g, "_").replace(/\//g, "$")})()`
    this.css = modules.filter(module => module.path.endsWith(".css")).map(module => module.code).join("\n")
    this.srcDoc = this.moduleClasses.join("\n") + callEntryFile
  }

  new(func: (modules: ToBeTransformedModule[]) => ToBeTransformedModule[]) {
    return new DLightProject(func(this.modules))
  }
}
