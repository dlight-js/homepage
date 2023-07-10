import { defineConfig } from "vite"
import dlight from "vite-plugin-dlight"
import dts from "vite-plugin-dts"

export default defineConfig({
  server: {
    port: 26660
  },
  base: "",
  plugins: [
    dts(),
    dlight({ appendix: ["view.ts"] })
  ]
})
