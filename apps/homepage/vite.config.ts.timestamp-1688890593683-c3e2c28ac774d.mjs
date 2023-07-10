// vite.config.ts
import { defineConfig } from "file:///projects/homepage/node_modules/.pnpm/vite@4.3.9/node_modules/vite/dist/node/index.js";
import dlight from "file:///projects/homepage/node_modules/.pnpm/vite-plugin-dlight@0.8.24/node_modules/vite-plugin-dlight/dist/index.js";
var vite_config_default = defineConfig({
  server: {
    port: 26667
  },
  base: "",
  plugins: [
    dlight({ appendix: [".view.ts"] })
  ]
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvcHJvamVjdHMvaG9tZXBhZ2UvYXBwcy9ob21lcGFnZVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL3Byb2plY3RzL2hvbWVwYWdlL2FwcHMvaG9tZXBhZ2Uvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL3Byb2plY3RzL2hvbWVwYWdlL2FwcHMvaG9tZXBhZ2Uvdml0ZS5jb25maWcudHNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgZGxpZ2h0IGZyb20gXCJ2aXRlLXBsdWdpbi1kbGlnaHRcIlxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiAyNjY2N1xuICB9LFxuICBiYXNlOiBcIlwiLFxuICBwbHVnaW5zOiBbXG4gICAgZGxpZ2h0KHsgYXBwZW5kaXg6IFtcIi52aWV3LnRzXCJdIH0pXG4gIF1cbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWtSLFNBQVMsb0JBQW9CO0FBQy9TLE9BQU8sWUFBWTtBQUVuQixJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTyxFQUFFLFVBQVUsQ0FBQyxVQUFVLEVBQUUsQ0FBQztBQUFBLEVBQ25DO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
