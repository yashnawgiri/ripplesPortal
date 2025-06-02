import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";
import { compression } from 'vite-plugin-compression2';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    compression({
      algorithm: 'gzip',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    compression({
      algorithm: 'brotliCompress',
      exclude: [/\.(br)$/, /\.(gz)$/],
    }),
    ViteImageOptimizer({
      test: /\.(jpe?g|png|gif|webp|svg)$/i,
      png: {
        quality: 80,
        compressionLevel: 9,
      },
      jpeg: {
        quality: 80,
        progressive: true,
      },
      jpg: {
        quality: 80,
        progressive: true,
      },
      webp: {
        lossless: false,
        quality: 85,
        alphaQuality: 90,
        force: true,
        effort: 6,
        preset: "photo",
        smartSubsample: true,
        mixed: true,
      },
    }),
  ],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          "react-vendor": ["react", "react-dom"],
          "ui-vendor": ["framer-motion"],
          "chart-vendor": ["recharts"],
          "form-vendor": ["react-hook-form", "@hookform/resolvers", "zod"],
          "date-vendor": ["date-fns"],
          "router-vendor": ["react-router-dom"],
          "state-vendor": ["recoil"],
          "toast-vendor": ["react-hot-toast", "sonner"],
          "swiper-vendor": ["swiper"],
        },
      },
    },
    // Optimize chunk size and compression
    chunkSizeWarningLimit: 1000,
    assetsInlineLimit: 4096,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: [
          "console.log",
          "console.info",
          "console.debug",
          "console.warn",
        ],
      },
    },
    // Enable brotli compression
    reportCompressedSize: true,
    target: ["es2020", "edge88", "firefox78", "chrome87", "safari14"],
  },
  optimizeDeps: {
    include: ["react", "react-dom", "framer-motion"],
    exclude: [],
  },
  server: {
    headers: {
      "Cache-Control": "public, max-age=31536000",
    },
  },
});


