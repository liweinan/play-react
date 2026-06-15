import { useState, useDeferredValue } from 'react';

// 故意做慢一点，方便感受输入是否卡顿
const LIST_SIZE = 20000;

function buildList(filter) {
    const items = [];
    for (let i = 0; i < LIST_SIZE; i++) {
        if (filter === '' || String(i).includes(filter)) {
            items.push(i);
        }
    }
    return items.slice(0, 30);
}

function SlowList({ filter }) {
    const items = buildList(filter);
    return (
        <ul>
            {items.map((n) => (
                <li key={n}>{n}</li>
            ))}
        </ul>
    );
}

// 不用 Fiber 并发能力：输入和内容用同一个 state，列表会同步重算，阻塞输入
function BlockingSearch() {
    const [text, setText] = useState('');

    return (
        <section>
            <h2>不用并发特性</h2>
            <p>每次按键都会立刻重算大列表，输入容易卡。</p>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="快速连续输入试试"
            />
            <p>输入：{text}</p>
            <SlowList filter={text} />
        </section>
    );
}

// 使用 Fiber 提供的并发能力：输入优先，列表用 deferred 值稍后更新
function DeferredSearch() {
    const [text, setText] = useState('');
    const deferredText = useDeferredValue(text);
    const isPending = text !== deferredText;

    return (
        <section>
            <h2>使用 useDeferredValue（Fiber 并发）</h2>
            <p>先更新输入框，列表可以稍后再渲染，输入更流畅。</p>
            <input
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="快速连续输入试试"
            />
            <p>
                输入：{text}
                {isPending && '（列表更新中…）'}
            </p>
            <div style={{ opacity: isPending ? 0.5 : 1 }}>
                <SlowList filter={deferredText} />
            </div>
        </section>
    );
}

export default function FiberDemo() {
    return (
        <div>
            <h1>Fiber 并发渲染对比</h1>
            <p>
                React Fiber 是 React 内部的调度架构，可以把渲染拆成小段、可中断。
                应用层常用 <code>useDeferredValue</code> / <code>startTransition</code> 来利用这个能力。
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <BlockingSearch />
                <DeferredSearch />
            </div>
        </div>
    );
}
