// @ts-ignore
import { transform } from "@babel/standalone"

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class CodeParser {
  static noMountIdRender(code: string, mountId: string) {
    return code.replace(/render\("(.+?)"/g, `render("$1-${mountId}"`)
  }

  static toRequire(code: string) {
    return transform(code, { plugins: ["transform-modules-commonjs"] }).code
  }

  static toAwaitRequire(code: string) {
    return code.replace(/require\(/g, "await require(")
  }
}

const AsyncFunction = Object.getPrototypeOf(async function() {}).constructor

export class Module {
  path
  codeRunFunc
  moduleExports: undefined | object
  constructor(path: string, code: string) {
    this.path = path
    const parsedCode = this.parseCode(code)
    this.codeRunFunc = Module.stringToFunc(parsedCode)
  }

  parseCode(code: string) {
    return CodeParser.toAwaitRequire(CodeParser.toRequire(code))
  }

  static stringToFunc(code: string) {
    return new AsyncFunction("require", "exports", "console", code)
  }
}
