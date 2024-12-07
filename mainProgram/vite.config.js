import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // base: '/app-master',
  build: {
    outDir: 'mainProgram',
    // assetsDir: 'app-master',
  },
  server: {
    port: 9002,
  },
  plugins: [react()],
})
