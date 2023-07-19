import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import dts from "vite-plugin-dts"

export default defineConfig({
  server: {
    port: 27000
  },
  base: "",
  plugins: [
    dts(),
    dlight()
  ],
  build: {
    outDir: "dist-view"
  }
})
