import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"

export default defineConfig({
  server: {
    port: 26667
  },
  base: "",
  plugins: [
    dlight({ appendix: [".view.ts"] })
  ]
})
