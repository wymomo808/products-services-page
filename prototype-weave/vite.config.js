import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    outDir: "dist",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        entryFileNames: "assets/weave-app.js",
        chunkFileNames: "assets/weave-app-[name].js",
        assetFileNames: "assets/weave-app.[ext]",
        inlineDynamicImports: true,
      },
    },
  },
});
