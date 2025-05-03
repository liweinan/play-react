import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    // you might want to disable CSS modules for testing
    css: false,
    coverage: {
      reporter: ['text', 'json', 'html'],
    },
  }
})
