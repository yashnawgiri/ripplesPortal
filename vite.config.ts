import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(), 
    tsconfigPaths(),
    ViteImageOptimizer({
      png: {
        quality: 85,
      },
      jpeg: {
        quality: 85,
      },
      jpg: {
        quality: 85,
      },
      webp: {
        lossless: true,
        quality: 100,
        alphaQuality: 100,
        force: true,
        effort: 4
      }
    })
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'ui-vendor': ['@nextui-org/react'],
          'motion-vendor': ['framer-motion']
        }
      }
    },
    // Add asset size limits
    chunkSizeWarningLimit: 1500,
    assetsInlineLimit: 4096
  }
});

