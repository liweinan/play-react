import { useEffect, useState } from 'react';

export default function ApiDemo() {
    const [hello, setHello] = useState('');
    const [time, setTime] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // 页面挂载后请求后端数据（只执行一次，依赖数组为 []）
        //
        // 请求链路：
        //   fetch('/api/hello')
        //     → 发给 Vite 开发服务器（同源，如 localhost:5173）
        //     → Vite proxy 转发到 Node 后端 localhost:3001
        //     → server/index.js 处理并返回 JSON
        //     → 前端 res.json() 解析，写入 state，触发重新渲染
        async function load() {
            try {
                // 两个请求并行发出，比串行更快
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
                // 常见原因：忘了开 pnpm run server，或后端端口不是 3001
                setError('无法连接后端，请先运行: pnpm run server');
                console.error(e);
            }
        }

        load();
    }, []);

    return (
        <div>
            <h1>前端调用 Node 后端</h1>
            <p>先开一个终端跑 <code>pnpm run server</code>，再访问此页。</p>

            {error && <p style={{ color: 'crimson' }}>{error}</p>}

            {!error && (
                <>
                    <p>GET /api/hello → {hello}</p>
                    <p>GET /api/time → {time}</p>
                </>
            )}
        </div>
    );
}
