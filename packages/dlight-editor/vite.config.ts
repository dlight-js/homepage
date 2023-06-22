import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import { resolve } from "path"
import dts from "vite-plugin-dts"
import { dependencies } from "./package.json"

export default defineConfig({
  server: {
    port: 27000
  },
  base: "",
  plugins: [
    dts(),
    dlight({ appendix: ["view.ts"] })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "./src/views/Playground.view.ts"),
      name: "component",
      fileName: "index"
    },
    rollupOptions: {
      external: [...Object.keys(dependencies)]
    }
  }
})
