import { useState } from 'react';

export default function EventPropagationDemo() {
    const [log, setLog] = useState('');

    const appendLog = (msg) => {
        console.log('[EventDemo]', msg);
        setLog((prev) => (prev ? `${prev}\n${msg}` : msg));
    };

    return (
        <div>
            <h1>preventDefault & stopPropagation</h1>
            <p>打开 DevTools Console，点击下面元素对照日志。</p>

            <section>
                <h2>1. e.preventDefault() — 只取消默认行为，不阻止冒泡</h2>
                <p>
                    你的理解是对的：<code>preventDefault</code> 和 <code>stopPropagation</code> 是两件事。
                    preventDefault 只管「浏览器默认动作」（链接跳转、表单提交等），事件仍会冒泡到父元素。
                </p>

                <div
                    style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '0.5rem' }}
                    onClick={() => {
                        console.log('[preventDefault] ③ 父 div 收到 click → 说明冒泡未被 preventDefault 阻断');
                        appendLog('③ 父 div 收到 click（冒泡上来）');
                    }}
                >
                    父 div（点了里面的链接，这里也会出现日志）
                    <div style={{ marginTop: '0.5rem' }}>
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer"
                            onClick={() => {
                                console.log('[preventDefault] ① 普通链接 click，未 preventDefault → 默认行为：新标签打开');
                                appendLog('① 普通链接 click（未 preventDefault，新标签会打开 example.com）');
                            }}
                        >
                            普通链接（新标签打开）
                        </a>
                        {' | '}
                        <a
                            href="https://example.com"
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => {
                                console.log('[preventDefault] ② 链接 click，调用 e.preventDefault()');
                                e.preventDefault();
                                console.log('[preventDefault] 默认打开新标签已取消，但事件继续冒泡');
                                appendLog('② 阻止跳转链接 click（已 preventDefault，不会打开新标签）');
                            }}
                        >
                            阻止跳转的链接
                        </a>
                    </div>
                </div>

                <p style={{ marginTop: '0.5rem' }}>
                    点「阻止跳转的链接」：不会开新标签，但日志里仍会出现 ③ 父 div —— 这就是 preventDefault 不阻止冒泡。
                </p>
            </section>

            <section>
                <h2>2. e.stopPropagation() — 阻止冒泡，不管默认行为</h2>
                <p>stopPropagation 只拦冒泡，不取消链接跳转、按钮 submit 等默认行为。</p>
                <div
                    style={{ border: '1px solid #ccc', padding: '1rem', marginTop: '0.5rem' }}
                    onClick={() => {
                        console.log('[stopPropagation] 父 div 收到 click（事件冒泡到达）');
                        appendLog('父 div 收到 click（冒泡上来）');
                    }}
                >
                    父 div
                    <button
                        type="button"
                        style={{ marginLeft: '0.5rem' }}
                        onClick={() => {
                            console.log('[stopPropagation] 普通按钮 click，未 stopPropagation → 会继续冒泡');
                            appendLog('子 button click（会冒泡到父 div）');
                        }}
                    >
                        普通按钮
                    </button>
                    <button
                        type="button"
                        style={{ marginLeft: '0.5rem' }}
                        onClick={(e) => {
                            console.log('[stopPropagation] 阻止冒泡按钮 click，调用 e.stopPropagation()');
                            e.stopPropagation();
                            console.log('[stopPropagation] 冒泡已停止，父 div 不会收到此事件');
                            appendLog('子 button click（stopPropagation，父 div 收不到）');
                        }}
                    >
                        阻止冒泡的按钮
                    </button>
                </div>
            </section>

            <pre style={{ marginTop: '1rem', whiteSpace: 'pre-wrap' }}>
                {log || '点击上面元素，看事件日志…'}
            </pre>
            <button
                type="button"
                onClick={() => {
                    console.log('[EventDemo] 清空页面日志');
                    setLog('');
                }}
            >
                清空日志
            </button>
        </div>
    );
}
