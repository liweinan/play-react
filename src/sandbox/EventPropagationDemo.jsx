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
                <h2>1. e.preventDefault()</h2>
                <p>阻止浏览器默认行为（如链接跳转、表单提交）。</p>
                <a
                    href="https://example.com"
                    onClick={() => {
                        console.log('[preventDefault] 普通链接 click，未调用 preventDefault → 浏览器会跳转');
                        appendLog('链接被点了（未 preventDefault，会跳转）');
                    }}
                >
                    普通链接（会跳转）
                </a>
                {' | '}
                <a
                    href="https://example.com"
                    onClick={(e) => {
                        console.log('[preventDefault] 阻止跳转链接 click，调用 e.preventDefault()');
                        e.preventDefault();
                        console.log('[preventDefault] 默认跳转已取消');
                        appendLog('链接被点了（已 preventDefault，不会跳转）');
                    }}
                >
                    阻止跳转的链接
                </a>
            </section>

            <section>
                <h2>2. e.stopPropagation()</h2>
                <p>阻止事件继续冒泡到父元素。</p>
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
