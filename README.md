# play-react

React 学习/demo 项目，用 Vite 搭建，包含多个带注释的示例页面。

## 快速开始

```bash
pnpm install
pnpm dev          # 前端，默认 http://localhost:5173
pnpm run server   # Node 后端（API Demo 需要），http://localhost:3001
```

## 常用命令

| 命令 | 说明 |
|------|------|
| `pnpm dev` | 启动 Vite 开发服务器 |
| `pnpm run server` | 启动 Node.js 后端 API |
| `pnpm build` | 生产构建 |
| `pnpm preview` | 预览构建结果 |
| `pnpm test` | Vitest 监听模式 |
| `pnpm test:run` | 运行测试一次 |
| `pnpm lint` | ESLint 检查 |

## 学习示例页面

导航栏可进入各 demo，代码在 `src/pages/`：

| 路由 | 说明 |
|------|------|
| `/search` | 搜索框：防抖、AbortController |
| `/fiber` | Fiber 并发：`useDeferredValue` 对比 |
| `/lazyload` | 懒加载：`React.lazy` + `Suspense` |
| `/context` | Context 跨层传值 |
| `/filter` | 列表过滤 |
| `/hello-ts` | TypeScript 函数组件与 props |
| `/api-demo` | 前端 `fetch` 调用 Node 后端 |

## 前端调用 Node 后端

### 架构

```
浏览器  fetch('/api/hello')
   ↓
Vite 开发服务器 :5173
   ↓  proxy（vite.config.js）
Node 后端 server/index.js :3001
   ↓
返回 JSON
```

### 后端接口

| 方法 | 路径 | 响应示例 |
|------|------|----------|
| GET | `/api/hello` | `{ "message": "Hello from Node.js backend" }` |
| GET | `/api/time` | `{ "time": "2026-06-15T13:32:44.340Z" }` |

### 相关文件

- `server/index.js` — Node HTTP 服务（无 Express）
- `src/pages/ApiDemo.jsx` — 前端请求示例
- `vite.config.js` — `/api/hello`、`/api/time` 代理配置

### 使用步骤

1. 终端 1：`pnpm run server`
2. 终端 2：`pnpm dev`
3. 打开 `/api-demo` 页面

若后端未启动，页面会提示「请先运行: pnpm run server」。

> `/api/search`（Search 页面）由 Vite 插件 mock，不经过 Node 后端。

## 技术栈

- React 19 + React Router 7
- Vite 6
- TypeScript（部分示例）
- Vitest + Testing Library
- Tailwind CSS
- Node.js 内置 `http` 模块

## 项目结构

```
server/
  index.js          # Node 后端 API
src/
  pages/            # 学习示例页面
  test/             # 测试
  testdome/         # TestDome 题目组件
  hackerrank/       # HackerRank 题目组件
  App.jsx           # 路由与导航
  main.jsx          # 入口
```

## 测试

```bash
pnpm test        # 开发时监听
pnpm test:run    # CI / 单次运行
pnpm coverage    # 覆盖率报告
```
