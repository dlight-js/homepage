import { transform } from "@babel/standalone"
import DLightPreset from "babel-preset-dlight"
import T from "@babel/types"

function ParserPlugin({ types: t }: { types: typeof T }, { fileName }: any) {
  return {
    visitor: {
      Program(path) {
        const rootNode = path.node
        // ---- Imports ----
        const imports = rootNode.body.filter(node => t.isImportDeclaration(node))
        // ---- Remove all imports that not start with ./
        imports.forEach(node => {
          if (!node.source.value.startsWith("./")) {
            rootNode.body = rootNode.body.filter(n => n !== node)
          }
        })
        // ---- Transform import to const { default: Component } = xx()
        const filteredImports = imports.filter(node => node.source.value.startsWith("./"))
        filteredImports.forEach(node => {
          const specifiers = node.specifiers.map(specifier => {
            if (t.isImportDefaultSpecifier(specifier)) {
              return ["default", specifier.local.name]
            } else {
              return [specifier.imported.name, specifier.local.name]
            }
          })
          const newImport = t.variableDeclaration("const", [
            t.variableDeclarator(
              t.objectPattern(
                specifiers.map(([imported, local]) =>
                  t.objectProperty(t.identifier(imported), t.identifier(local))
                )
              ),
              t.callExpression(t.identifier(
                node.source.value
                  .replace(/\./g, "_")
                  .replace(/\//g, "$")
              ), [])
            )
          ])
          const nodeIdx = rootNode.body.findIndex(n => n === node)
          // replace
          rootNode.body[nodeIdx] = newImport
        })

        // ---- Exports ----
        // ---- Push const exports = {} to the start of the file
        rootNode.body.unshift(t.variableDeclaration("const", [
          t.variableDeclarator(
            t.identifier("exports"),
            t.objectExpression([])
          )
        ]))
        // ---- Transform export to module.exports = Component
        const defaultExports = rootNode.body.filter(node => t.isExportDefaultDeclaration(node))
        defaultExports.forEach(node => {
          const newExport = t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.memberExpression(t.identifier("exports"), t.identifier("default")),
              node.declaration
            )
          )
          const nodeIdx = rootNode.body.findIndex(n => n === node)
          // replace
          rootNode.body[nodeIdx] = newExport
        })
        // ---- Transform all export to module.exports = { Component }
        const namedExports = rootNode.body.filter(node => t.isExportNamedDeclaration(node))
        namedExports.forEach(node => {
          const newExport = t.expressionStatement(
            t.assignmentExpression(
              "=",
              t.memberExpression(t.identifier("exports"), t.identifier(node.specifiers[0].exported.name)),
              node.specifiers[0].local
            )
          )
          const nodeIdx = rootNode.body.findIndex(n => n === node)
          // replace
          rootNode.body[nodeIdx] = newExport
        })
        // return exports
        rootNode.body.push(t.returnStatement(t.identifier("exports")))
        // ---- Wrap with a function
        rootNode.body = [
          t.functionDeclaration(
            t.identifier(`_${fileName.replace(/\./g, "_").replace(/\//g, "$")}`),
            [],
            t.blockStatement([
              ...rootNode.body
            ])
          )
        ]
      }
    }
  }
}

export function transformEmbeddedCode(code: string, path: string) {
  return transform(code, { plugins: [[ParserPlugin, { fileName: path }]] }).code
}

export function transformDlight(code: string) {
  return transform(code, {
    presets: [
      [DLightPreset, { files: "*" }]
    ]
  }).code
}
