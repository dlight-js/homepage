import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/views/Playground.view.ts"],
  format: ["cjs", "esm"],
  outDir: "lib",
  clean: true,
  minify: true
})
