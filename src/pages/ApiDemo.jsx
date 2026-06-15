import { useState } from 'react';

export default function ApiDemo() {
    const [hello, setHello] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    // 点击按钮时才发请求，而不是页面加载时自动请求
    //
    // 请求链路：
    //   fetch('/api/hello')
    //     → 发给 Vite 开发服务器（同源，如 localhost:5173）
    //     → Vite proxy 转发到 Node 后端 localhost:3001
    //     → server/index.js 处理并返回 JSON
    //     → 前端 res.json() 解析，写入 state，触发重新渲染
    async function loadData() {
        setLoading(true);
        setError('');
        setHello('');
        setTime('');

        try {
            const [helloRes, timeRes] = await Promise.all([
                fetch('/api/hello'),
                fetch('/api/time'),
            ]);

            if (!helloRes.ok || !timeRes.ok) {
                throw new Error('请求失败');
            }

            const helloData = await helloRes.json();
            const timeData = await timeRes.json();

            setHello(helloData.message);
            setTime(timeData.time);
        } catch (e) {
            setError('无法连接后端，请先运行: pnpm run server');
            console.error(e);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div>
            <h1>前端调用 Node 后端</h1>
            <p>先开一个终端跑 <code>pnpm run server</code>，再点按钮请求。</p>

            <button type="button" onClick={loadData} disabled={loading}>
                {loading ? '请求中…' : '请求后端数据'}
            </button>

            {error && <p style={{ color: 'crimson' }}>{error}</p>}

            {hello && <p>GET /api/hello → {hello}</p>}
            {time && <p>GET /api/time → {time}</p>}
        </div>
    );
}
