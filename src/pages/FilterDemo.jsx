import { useState } from 'react';

const FRUITS = [
    'Apple',
    'Banana',
    'Cherry',
    'Date',
    'Elderberry',
    'Fig',
    'Grape',
];

export default function FilterDemo() {
    const [keyword, setKeyword] = useState('');

    // 输入 keyword 变化 → 重新 render → filter 重新计算 → 列表更新
    const filtered = FRUITS.filter((item) =>
        item.toLowerCase().includes(keyword.toLowerCase())
    );

    return (
        <div>
            <h1>Filter 过滤示例</h1>
            <p>在输入框里打字，列表会根据关键词实时过滤。</p>

            <input
                type="text"
                placeholder="输入关键词过滤"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
            />

            <ul>
                {filtered.map((item) => (
                    <li key={item}>{item}</li>
                ))}
            </ul>

            {filtered.length === 0 && <p>没有匹配项</p>}
        </div>
    );
}
