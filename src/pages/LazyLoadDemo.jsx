import { useState, lazy, Suspense } from 'react';

// 【普通 import】
// 打包工具（Vite）在构建时就把 EagerPanel 的代码合并进主 JS 文件。
// 用户打开页面时，不管有没有用到，这段代码都会一起下载。
import EagerPanel from './EagerPanel.jsx';

// 【React.lazy + 动态 import】
// lazy() 不会立刻加载 LazyPanel.jsx，而是返回一个「占位组件」。
// import() 只是传给 lazy 的一个函数，页面加载时不会执行。
// 只有 React 第一次尝试渲染 <LazyPanel /> 时，lazy 内部才会调用 import() 去下载 chunk。
const LazyPanel = lazy(() => import('./LazyPanel.jsx'));

export default function LazyLoadDemo() {
    // showLazy 是按钮和懒加载之间的「联系点」：
    //
    //   点按钮 → setShowLazy(true) → 组件重新 render
    //        → 条件分支从「按钮」切换到「<LazyPanel />」
    //        → React 开始渲染 LazyPanel → lazy 内部执行 import()
    //        → 下载完成 → Suspense 把「加载中…」换成真正内容
    //
    // 按钮本身不直接调用 import()，它只控制「要不要把 LazyPanel 放进 JSX」。
    //
    // showLazy = false → JSX 里只有按钮，<LazyPanel /> 不存在 → 不会下载
    // showLazy = true  → JSX 里出现 <LazyPanel />           → 触发下载
    const [showLazy, setShowLazy] = useState(false);

    return (
        <div>
            <h1>Lazy Load 示例</h1>
            <p>
                懒加载 = 需要用到时再加载代码，减少首屏体积。
                React 里常用 <code>React.lazy</code> + <code>Suspense</code>。
            </p>

            {/* ---------- 对比 1：普通加载 ---------- */}
            <section>
                <h2>普通加载（import）</h2>
                <p>写 <code>import EagerPanel from './EagerPanel'</code>，打包时和主文件在一起。</p>
                {/* 这里直接写组件名，React 立刻渲染，代码早就在主包里了 */}
                <EagerPanel />
            </section>

            {/* ---------- 对比 2：懒加载 ---------- */}
            <section>
                <h2>懒加载（lazy + Suspense）</h2>
                <p>
                    写 <code>{`lazy(() => import('./LazyPanel'))`}</code>，会拆成单独 chunk。
                    打开 DevTools → Network，点按钮能看到多一个 js 请求。
                </p>

                {!showLazy ? (
                    // 分支 A：showLazy 为 false
                    // JSX 里没有 <LazyPanel />，lazy 的 import() 不会被触发
                    <button type="button" onClick={() => setShowLazy(true)}>
                        点击加载 LazyPanel
                    </button>
                ) : (
                    // 分支 B：showLazy 为 true（点了按钮后）
                    // JSX 里第一次出现 <LazyPanel />，React 渲染它 → lazy 内部才去下载 chunk
                    //
                    // Suspense：下载期间先显示 fallback（加载中…），完成后换成 LazyPanel 内容
                    // 注意：lazy() 组件外面必须包 Suspense，否则报错
                    <Suspense fallback={<p>加载中…</p>}>
                        <LazyPanel />
                    </Suspense>
                )}
            </section>
        </div>
    );
}
