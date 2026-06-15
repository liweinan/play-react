import { useState, lazy, Suspense } from 'react';

// 【普通 import】
// 打包工具（Vite）在构建时就把 EagerPanel 的代码合并进主 JS 文件。
// 用户打开页面时，不管有没有用到，这段代码都会一起下载。
import EagerPanel from './EagerPanel.jsx';

// 【React.lazy + 动态 import】
// lazy() 不会立刻加载 LazyPanel.jsx，而是返回一个「占位组件」。
// 只有将来真正渲染 <LazyPanel /> 时，才会执行 import('./LazyPanel.jsx') 去下载对应 chunk。
const LazyPanel = lazy(() => import('./LazyPanel.jsx'));

export default function LazyLoadDemo() {
    // 控制懒加载组件是否显示。
    // false = 还没点按钮，LazyPanel 的代码不会被请求
    // true  = 点了按钮，开始下载并渲染 LazyPanel
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
                    // 第一步：只显示按钮，LazyPanel 还没被挂载，所以不会去下载 chunk
                    <button type="button" onClick={() => setShowLazy(true)}>
                        点击加载 LazyPanel
                    </button>
                ) : (
                    // 第二步：showLazy 变为 true 后，React 尝试渲染 LazyPanel
                    //
                    // Suspense 的作用：LazyPanel 还在下载/解析时，先显示 fallback（加载中…）
                    // 下载完成后，自动换成真正的 <LazyPanel /> 内容
                    //
                    // 注意：使用 lazy() 的组件外面必须包一层 Suspense，否则会报错
                    <Suspense fallback={<p>加载中…</p>}>
                        <LazyPanel />
                    </Suspense>
                )}
            </section>
        </div>
    );
}
