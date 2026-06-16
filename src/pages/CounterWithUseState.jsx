import { useState } from 'react';

// 与 CounterWithReducer 行为完全等价：+1 / -1 / 重置
// 简单场景优先 useState；复杂、多字段状态更新时再考虑 useReducer
export default function CounterWithUseState() {
    const [count, setCount] = useState(0);

    return (
        <section>
            <h2>useState 写法（等价）</h2>
            <p>count: {count}</p>
            {/* 函数式更新 setCount(c => c + 1) 确保拿到最新 count */}
            <button type="button" onClick={() => setCount((c) => c + 1)}>
                +1
            </button>
            <button type="button" onClick={() => setCount((c) => c - 1)}>
                -1
            </button>
            <button type="button" onClick={() => setCount(0)}>
                重置
            </button>
        </section>
    );
}
