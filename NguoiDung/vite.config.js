import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // server configuration
  server: { port: 5174 },

  // CSS preprocessor options
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: '@use "sass:math"; @import "./src/css/banner.css";',
      },
    },
  },
})
