/* eslint-disable new-cap */
import * as monaco from "monaco-editor"
// @ts-expect-error
import editorWorker from "monaco-editor/esm/vs/editor/editor.worker?worker"
// @ts-expect-error
import jsonWorker from "monaco-editor/esm/vs/language/json/json.worker?worker"
// @ts-expect-error
import cssWorker from "monaco-editor/esm/vs/language/css/css.worker?worker"
// @ts-expect-error
import htmlWorker from "monaco-editor/esm/vs/language/html/html.worker?worker"
// @ts-expect-error
import tsWorker from "monaco-editor/esm/vs/language/typescript/ts.worker?worker"

export const loadMonacoWorker = () => {
  self.MonacoEnvironment = {
    getWorker(_, label) {
      if (label === "json") {
        return new jsonWorker()
      }
      if (label === "css" || label === "scss" || label === "less") {
        return new cssWorker()
      }
      if (label === "html" || label === "handlebars" || label === "razor") {
        return new htmlWorker()
      }
      if (label === "typescript" || label === "javascript") {
        return new tsWorker()
      }
      return new editorWorker()
    }
  }

  monaco.languages.typescript.typescriptDefaults.setDiagnosticsOptions({
    noSemanticValidation: true,
    noSyntaxValidation: true
  })
}
