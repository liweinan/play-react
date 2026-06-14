import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const SEARCH_ITEMS = [
  { id: 1, label: 'Apple' },
  { id: 2, label: 'Banana' },
  { id: 3, label: 'Cherry' },
  { id: 4, label: 'Date' },
  { id: 5, label: 'Elderberry' },
  { id: 6, label: 'Fig' },
  { id: 7, label: 'Grape' },
  { id: 8, label: 'Honeydew' },
]

function searchApiPlugin() {
  return {
    name: 'search-api',
    configureServer(server) {
      server.middlewares.use('/api/search', (req, res) => {
        const url = new URL(req.url, 'http://localhost')
        const query = url.searchParams.get('q')?.toLowerCase() ?? ''
        const results = SEARCH_ITEMS.filter((item) =>
          item.label.toLowerCase().includes(query)
        )
        res.setHeader('Content-Type', 'application/json')
        res.end(JSON.stringify(results))
      })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), searchApiPlugin()],
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
