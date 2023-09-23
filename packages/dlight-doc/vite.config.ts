import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import dlightEasyCss from "vite-plugin-easy-css"

export default defineConfig({
  plugins: [
    dlightEasyCss({ files: "**/*.view.ts" }),
    dlight({ files: "**/*.view.ts" })
  ]
})
