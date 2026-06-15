import http from 'http';

// Node.js 内置 http 模块，无需安装 Express
const PORT = 3001;

// 每个请求的流程：
//   浏览器 fetch('/api/hello')
//     → Vite 开发服务器（5173）收到请求
//     → vite.config.js 的 proxy 转发到本服务（3001）
//     → 本文件处理请求，返回 JSON
const server = http.createServer((req, res) => {
    // req.url 可能是 "/api/hello" 或 "/api/hello?foo=1"
    // 用 URL 解析出 pathname，方便做路由匹配
    const url = new URL(req.url, `http://localhost:${PORT}`);

    // 告诉浏览器：响应体是 JSON
    res.setHeader('Content-Type', 'application/json; charset=utf-8');

    // 路由 1：问候接口
    if (req.method === 'GET' && url.pathname === '/api/hello') {
        res.end(JSON.stringify({ message: 'Hello from Node.js backend' }));
        return;
    }

    // 路由 2：返回服务器当前时间
    if (req.method === 'GET' && url.pathname === '/api/time') {
        res.end(JSON.stringify({ time: new Date().toISOString() }));
        return;
    }

    // 没匹配到的路径返回 404
    res.writeHead(404);
    res.end(JSON.stringify({ error: 'Not Found' }));
});

server.listen(PORT, () => {
    console.log(`API server: http://localhost:${PORT}`);
});
