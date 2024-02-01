import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"

export default defineConfig({
  server: {
    port: 5932
  },
  base: "",
  plugins: [
    dlight({ files: "**/*.view.ts" })
  ]
})
