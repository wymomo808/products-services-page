import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "127.0.0.1",
    port: 5174,
    strictPort: true,
  },
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/weave-vision-app.js",
        chunkFileNames: "assets/weave-vision-app-[name].js",
        assetFileNames: "assets/weave-vision-app.[ext]",
        inlineDynamicImports: true,
      },
    },
  },
});
