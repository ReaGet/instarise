import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url';
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    outDir: 'build',
  },
  plugins: [
    react(),
    visualizer({
      emitFile: true,
      filename: "stats.html"
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src/', import.meta.url))
    }
  },
})
