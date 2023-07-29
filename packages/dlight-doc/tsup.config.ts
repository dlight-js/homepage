import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/DlightDoc.view.ts"],
  format: ["cjs", "esm"],
  outDir: "lib",
  clean: true,
  minify: true
})
