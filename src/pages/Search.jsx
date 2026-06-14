import { useState, useEffect, useRef } from 'react';

const SearchBox = () => {
    const [query, setQuery] = useState('');
    const [options, setOptions] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeIndex, setActiveIndex] = useState(-1);

    // 保存当前进行中的 fetch 对应的 AbortController。
    // 用 useRef 而不是 state：需要在多次渲染间记住 controller，但更新它不应触发重渲染。
    const abortRef = useRef(null);

    useEffect(() => {
        if (!query.trim()) {
            setOptions([]);
            return;
        }

        // 防抖（debounce）：用户连续输入时，不要每敲一个键就发请求。
        // 每次 query 变化都重新计时；只有停手 300ms 后才会真正执行 fetch。
        // cleanup 里 clearTimeout 会取消「上一次还没触发的定时器」。
        const timer = setTimeout(async () => {
            // 取消上一次尚未完成的请求，避免竞态：
            // 若先搜 "ap" 再搜 "app"，"ap" 的响应若更晚返回，会覆盖正确结果。
            abortRef.current?.abort();

            const controller = new AbortController();
            abortRef.current = controller;

            setLoading(true);
            try {
                const res = await fetch(`/api/search?q=${query}`, {
                    // 把取消信号传给 fetch；调用 controller.abort() 时会中断这次请求
                    signal: controller.signal,
                });
                const data = await res.json();
                setOptions(data);
                setActiveIndex(-1);
            } catch (e) {
                // 主动 abort 会抛出 AbortError，属于正常流程，无需报错
                if (e.name !== 'AbortError') console.error(e);
            } finally {
                setLoading(false);
            }
        }, 300);

        return () => clearTimeout(timer);
    }, [query]);

    const onKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setActiveIndex(i => Math.min(i + 1, options.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setActiveIndex(i => Math.max(i - 1, 0));
        } else if (e.key === 'Enter' && activeIndex >= 0) {
            setQuery(options[activeIndex].label);
            setOptions([]);
        }
    };

    return (
        <div>
            <input
                value={query}
                onChange={e => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
            />
            {loading && <div>Loading...</div>}
            <ul>
                {options.map((opt, idx) => (
                    <li key={opt.id} style={{ background: idx === activeIndex ? '#eee' :
                            'white' }}>
                        {opt.label}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default SearchBox;
