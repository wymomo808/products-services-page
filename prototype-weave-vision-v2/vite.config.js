import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5175,
    strictPort: true,
  },
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/weave-vision-v2-app.js",
        chunkFileNames: "assets/weave-vision-v2-app-[name].js",
        assetFileNames: "assets/weave-vision-v2-app.[ext]",
        inlineDynamicImports: true,
      },
    },
  },
});
