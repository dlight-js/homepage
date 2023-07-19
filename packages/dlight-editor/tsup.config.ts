import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/views/Playground.view.ts"],
  format: ["cjs", "esm"],
  clean: true,
  minify: true
})
