import { useState } from 'react';

const FRUITS = ['Apple', 'Orange', 'Grape', 'Banana', 'Cherry'];

function findFruit(keyword) {
    const q = keyword.trim().toLowerCase();
    if (!q) return '';

    // -----------------------------------------------------------------------
    // Array.find —— 只返回「第一个」匹配项
    // -----------------------------------------------------------------------
    // find 从数组下标 0 开始，逐个调用回调；第一个返回 true 的元素会被返回，然后立刻停止。
    //
    // 例 1：q = "app"
    //   Apple  → 'apple'.startsWith('app') ✅ → 返回 "Apple"，结束
    //   Orange / Grape / ... → 不再检查
    //
    // 例 2：q = "a"（startsWith 只看前缀，不是 includes）
    //   Apple  → 'apple'.startsWith('a') ✅ → 返回 "Apple"，结束
    //   Orange → 'orange'.startsWith('a') ❌（中间含 a，但开头是 o）
    //   Banana → 'banana'.startsWith('a') ❌（含 a，但开头是 b）
    //   find 遇到第一个 true 就停，后面不再检查
    //
    // 例 3：q = "xyz" → 没有任何 fruit 命中 → find 返回 undefined
    //
    // 为什么这里用 find 而不是改 select 的 options？
    //   需求是：输入关键字 → 自动选中对应水果；下拉列表始终展示全部 FRUITS。
    //   所以只更新 selected，不过滤 option 列表。
    //
    // 若要找「多条」匹配，用 Array.filter，返回所有命中的元素组成的新数组：
    //
    //   FRUITS.filter((fruit) => fruit.toLowerCase().startsWith('a'))
    //   // → ['Apple']（只有 Apple 以 a 开头）
    //
    //   FRUITS.filter((fruit) => fruit.toLowerCase().includes('a'))
    //   // → ['Apple', 'Orange', 'Grape', 'Banana']（名字里任意位置含 a）
    //
    // startsWith = 前缀匹配；includes = 包含匹配。条件不同，结果不同。
    //
    // find vs filter 对比：
    //   find   → 第一个匹配项 | undefined     → 适合单选（本例 select 只能有一个 value）
    //   filter → 所有匹配项组成的数组 []      → 适合展示候选列表、多选、搜索结果
    //   some   → 布尔值，是否存在匹配          → 适合「有没有」判断
    //   every  → 布尔值，是否全部匹配          → 适合校验
    //
    // -----------------------------------------------------------------------
    // ?? '' —— 把 undefined 变成空字符串
    // -----------------------------------------------------------------------
    // find 找不到时返回 undefined；<select value={selected}> 需要字符串。
    // undefined ?? ''  →  ''       （选中「请选择」）
    // 'Apple'   ?? ''  →  'Apple'   （保持原值）
    //
    // 本例写 || '' 结果相同，因为水果名都是非空 truthy 字符串。
    // 但 ?? 和 || 语义不同，通用规则：
    //
    //   值          ?? '默认'    || '默认'
    //   undefined   '默认'       '默认'
    //   null        '默认'       '默认'
    //   ''          ''           '默认'   ← 区别：空字符串是合法值时 ?? 更安全
    //   0           0            '默认'
    //   false       false        '默认'
    //
    // 习惯：「可能为 null/undefined 时给默认值」用 ??；「为空就用备用值」才考虑 ||。
    // -----------------------------------------------------------------------
    return FRUITS.find((fruit) => fruit.toLowerCase().startsWith(q)) ?? '';
}

export default function Selected() {
    const [keyword, setKeyword] = useState('');
    const [selected, setSelected] = useState('');

    const handleKeywordChange = (value) => {
        setKeyword(value);
        // 链路：输入框 onChange → findFruit 用 find 取第一个匹配 → setSelected
        // select 的 <option> 始终 map 全部 FRUITS，不随 keyword 变少
        setSelected(findFruit(value));
    };

    const handleSelectChange = (value) => {
        // 手动改下拉框时，同步回输入框
        setSelected(value);
        setKeyword(value);
    };

    return (
        <div>
            <h1>输入关键字自动选中</h1>
            <p>输入框打字，select 自动选中匹配的水果；下拉选项始终显示全部。</p>

            <input
                type="text"
                placeholder="输入水果名，如 App"
                value={keyword}
                onChange={(e) => handleKeywordChange(e.target.value)}
            />

            <select
                value={selected}
                onChange={(e) => handleSelectChange(e.target.value)}
            >
                <option value="">请选择</option>
                {FRUITS.map((fruit) => (
                    <option key={fruit} value={fruit}>
                        {fruit}
                    </option>
                ))}
            </select>

            {selected && <p>当前选中：{selected}</p>}
        </div>
    );
}
