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
  server: {
    // 开发时把部分 /api 请求转发到 Node 后端（server/index.js，端口 3001）
    // 前端只需写 fetch('/api/hello')，不用关心后端实际地址和跨域
    // 注意：/api/search 仍由上面的 searchApiPlugin 处理，不走这里
    proxy: {
      '/api/hello': 'http://localhost:3001',
      '/api/time': 'http://localhost:3001',
    },
  },
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
