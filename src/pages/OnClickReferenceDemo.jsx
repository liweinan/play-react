import { useState, useEffect, useCallback, useRef, useReducer } from 'react';

function appendLog(setLogs, message, type = 'info') {
  setLogs((prev) => [
    ...prev,
    { id: Date.now() + Math.random(), message, type, time: new Date().toLocaleTimeString() },
  ]);
}

function LogPanel({ logs, onClear }) {
  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-semibold text-gray-800">运行日志</h4>
        <button
          type="button"
          onClick={onClear}
          className="text-sm text-gray-500 hover:text-gray-800"
        >
          清空
        </button>
      </div>
      <div className="space-y-1 max-h-48 overflow-y-auto font-mono text-xs">
        {logs.length === 0 ? (
          <p className="text-gray-400 italic">操作组件后日志会出现在这里（同时输出到控制台）</p>
        ) : (
          logs.map((log) => (
            <div
              key={log.id}
              className={
                log.type === 'effect'
                  ? 'text-red-600'
                  : log.type === 'cleanup'
                    ? 'text-green-600'
                    : log.type === 'success'
                      ? 'text-blue-600'
                      : 'text-gray-700'
              }
            >
              [{log.time}] {log.message}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

function ExpensiveChildProblem({ onClick, label }) {
  const renderCount = useRef(0);
  const [effectRuns, setEffectRuns] = useState(0);
  const [cleanups, setCleanups] = useState(0);
  renderCount.current += 1;

  useEffect(() => {
    const msg = '🔴 useEffect 执行了！onClick 函数引用变化了';
    console.log(msg);
    setEffectRuns((n) => n + 1);
    return () => {
      const cleanupMsg = '🟢 清理旧的 onClick effect';
      console.log(cleanupMsg);
      setCleanups((n) => n + 1);
    };
  }, [onClick]);

  return (
    <div className="border-2 border-red-300 rounded-lg p-4 bg-red-50">
      <h4 className="font-semibold text-red-800">{label}</h4>
      <p className="text-sm text-gray-600">渲染次数: {renderCount.current}</p>
      <p className="text-sm text-red-700">useEffect 执行: {effectRuns} 次 · 清理: {cleanups} 次</p>
      <button
        type="button"
        onClick={() => onClick(1)}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm"
      >
        子组件按钮
      </button>
    </div>
  );
}

function ExpensiveChildSolution({ onClick, label }) {
  const renderCount = useRef(0);
  const [effectRuns, setEffectRuns] = useState(0);
  renderCount.current += 1;

  useEffect(() => {
    const msg = '✅ useEffect 执行（onClick 引用稳定时仅首次）';
    console.log(msg);
    setEffectRuns((n) => n + 1);
  }, [onClick]);

  return (
    <div className="border-2 border-green-300 rounded-lg p-4 bg-green-50">
      <h4 className="font-semibold text-green-800">{label}</h4>
      <p className="text-sm text-gray-600">渲染次数: {renderCount.current}</p>
      <p className="text-sm text-green-700">useEffect 执行: {effectRuns} 次（应停留在 1）</p>
      <button
        type="button"
        onClick={() => onClick(1)}
        className="mt-2 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded text-sm"
      >
        子组件按钮
      </button>
    </div>
  );
}

function ProblemDemo() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleClick = (id) => {
    console.log('点击了:', id);
    appendLog(setLogs, `子组件 onClick 被调用，id=${id}`, 'info');
  };

  const bumpParent = () => {
    setCount((c) => c + 1);
    appendLog(setLogs, `Parent 重渲染，handleClick 是新函数（count → ${count + 1}）`, 'info');
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        每次父组件重渲染都会重新创建 <code className="bg-gray-100 px-1 rounded">handleClick</code>，
        子组件 <code className="bg-gray-100 px-1 rounded">useEffect([onClick])</code> 会反复执行。
      </p>
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50 space-y-3">
        <h4 className="font-semibold text-blue-800">Parent（无 useCallback）</h4>
        <button
          type="button"
          onClick={bumpParent}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          父组件重渲染（count: {count}）
        </button>
        <ExpensiveChildProblem onClick={handleClick} label="ExpensiveChild" />
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  );
}

function SolutionDemo() {
  const [count, setCount] = useState(0);
  const [logs, setLogs] = useState([]);

  const handleClick = useCallback((id) => {
    console.log('点击了:', id);
    appendLog(setLogs, `子组件 onClick 被调用，id=${id}`, 'info');
  }, []);

  const bumpParent = () => {
    setCount((c) => c + 1);
    appendLog(setLogs, `Parent 重渲染，handleClick 引用不变（count → ${count + 1}）`, 'info');
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        <code className="bg-gray-100 px-1 rounded">useCallback(..., [])</code> 缓存函数引用，
        父组件重渲染不会触发子组件 effect 重新执行。
      </p>
      <div className="border-2 border-blue-300 rounded-lg p-4 bg-blue-50 space-y-3">
        <h4 className="font-semibold text-blue-800">Parent（useCallback）</h4>
        <button
          type="button"
          onClick={bumpParent}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          父组件重渲染（count: {count}）
        </button>
        <ExpensiveChildSolution onClick={handleClick} label="ExpensiveChild" />
      </div>
      <LogPanel logs={logs} onClear={() => setLogs([])} />
    </div>
  );
}

function RerenderTriggerDemo() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState('');
  const parentRenderCount = useRef(0);
  parentRenderCount.current += 1;

  const handleClick = (id) => {
    console.log('点击:', id, '当前 count:', count);
  };

  return (
    <div className="space-y-4">
      <p className="text-gray-600 text-sm">
        父组件重渲染的三大常见原因：State 变化、Props 变化、强制更新。下面演示 State 变化引发的连锁反应。
      </p>
      <div className="border-2 border-blue-400 rounded-lg p-4 bg-blue-50">
        <h4 className="font-semibold text-blue-800">
          Parent（渲染次数: {parentRenderCount.current}）
        </h4>
        <div className="flex flex-wrap gap-2 mt-3">
          <button
            type="button"
            onClick={() => setCount((c) => c + 1)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm"
          >
            改变 count（{count}）
          </button>
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="输入文字也会触发 Parent 重渲染"
            className="border border-gray-300 rounded px-2 py-1.5 text-sm flex-1 min-w-[200px]"
          />
        </div>
        <RerenderChild onClick={handleClick} count={count} />
      </div>
      <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`用户点击 → setCount → Parent 重渲染
  → 新建 handleClick → onClick prop 引用变化
  → ExpensiveChild 重渲染 → useEffect([onClick]) 重新执行`}
      </pre>
    </div>
  );
}

function RerenderChild({ onClick, count }) {
  const renderCount = useRef(0);
  renderCount.current += 1;

  useEffect(() => {
    console.log('🔴 ExpensiveChild 的 useEffect 执行了 - onClick 函数变化了');
  }, [onClick]);

  return (
    <div className="border-2 border-red-400 rounded-lg p-4 bg-red-50 mt-3">
      <h4 className="font-semibold text-red-800">
        ExpensiveChild（渲染次数: {renderCount.current}）
      </h4>
      <p className="text-sm text-gray-600">接收到的 count: {count}</p>
      <p className="text-xs text-red-600 mt-1">打开控制台可看到 effect 日志</p>
      <button
        type="button"
        onClick={() => onClick(1)}
        className="mt-2 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded text-sm"
      >
        子组件按钮
      </button>
    </div>
  );
}

function FunctionEqualityDemo() {
  const [result, setResult] = useState(null);

  const runCompare = () => {
    const fn1 = () => {};
    const fn2 = () => {};
    const a = function create() {
      return function hello() {};
    };
    const b1 = a();
    const b2 = a();
    setResult({
      arrowSameRef: fn1 === fn2,
      arrowSameCode: fn1.toString() === fn2.toString(),
      factorySameRef: b1 === b2,
      factorySameCode: b1.toString() === b2.toString(),
    });
  };

  return (
    <div className="space-y-3">
      <p className="text-gray-600 text-sm">
        函数体相同 ≠ 引用相同。JavaScript 用 <code className="bg-gray-100 px-1 rounded">===</code> 比较的是对象引用。
      </p>
      <button
        type="button"
        onClick={runCompare}
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
      >
        运行函数比较实验
      </button>
      {result && (
        <ul className="text-sm space-y-1 font-mono bg-gray-50 p-3 rounded border">
          <li>两个箭头函数 fn1 === fn2: <strong>{String(result.arrowSameRef)}</strong></li>
          <li>toString() 相同: <strong>{String(result.arrowSameCode)}</strong></li>
          <li>工厂函数两次返回 fn === fn: <strong>{String(result.factorySameRef)}</strong></li>
          <li>工厂函数 toString() 相同: <strong>{String(result.factorySameCode)}</strong></li>
        </ul>
      )}
    </div>
  );
}

function ForceUpdateDemo() {
  const [, forceUpdate] = useReducer((x) => x + 1, 0);
  const renderCount = useRef(0);
  renderCount.current += 1;

  return (
    <div className="border border-gray-300 rounded-lg p-4 bg-gray-50">
      <p className="text-sm text-gray-600 mb-2">
        使用 <code className="bg-gray-100 px-1 rounded">useReducer</code> 可在 state 不变时强制重渲染。
      </p>
      <p className="text-sm mb-2">渲染次数: {renderCount.current}</p>
      <button
        type="button"
        onClick={() => forceUpdate()}
        className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1.5 rounded text-sm"
      >
        强制刷新
      </button>
    </div>
  );
}

const TABS = [
  { id: 'problem', label: '❌ 无 useCallback' },
  { id: 'solution', label: '✅ useCallback' },
  { id: 'rerender', label: '🔄 重渲染连锁' },
  { id: 'equality', label: '⚖️ 函数引用' },
];

export default function OnClickReferenceDemo() {
  const [activeTab, setActiveTab] = useState('problem');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">为什么 onClick 会「变」？</h1>
        <p className="text-lg text-gray-600">
          函数是引用类型 — 理解 props 比较、useEffect 依赖与父组件重渲染
        </p>
      </header>

      <section className="bg-amber-50 border-2 border-amber-200 rounded-lg p-6">
        <h2 className="text-xl font-bold text-amber-900 mb-3">核心原因</h2>
        <ol className="list-decimal list-inside space-y-2 text-amber-900 text-sm">
          <li>每次父组件重新渲染，内联或组件体内的函数都会被<strong>重新创建</strong></li>
          <li>新函数在内存中是<strong>全新的对象</strong>（引用不同）</li>
          <li>React 用 <code className="bg-amber-100 px-1 rounded">Object.is()</code> 比较 props</li>
          <li>引用不同 → 认为 props 变了 → <code className="bg-amber-100 px-1 rounded">useEffect([onClick])</code> 重新执行</li>
        </ol>
        <pre className="mt-4 bg-gray-800 text-amber-200 p-3 rounded text-xs overflow-x-auto">
{`第一次渲染: Parent ──创建──> [函数 A] ──传递──> Child
第二次渲染: Parent ──创建──> [函数 B] (新引用！) ──传递──> Child
                              ↑ 与 A 不同 → 触发 useEffect`}
        </pre>
      </section>

      <div className="flex flex-wrap justify-center gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm transition-colors ${
              activeTab === tab.id
                ? 'bg-indigo-500 text-white shadow'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="min-h-[320px]">
        {activeTab === 'problem' && <ProblemDemo />}
        {activeTab === 'solution' && <SolutionDemo />}
        {activeTab === 'rerender' && <RerenderTriggerDemo />}
        {activeTab === 'equality' && <FunctionEqualityDemo />}
      </div>

      <section className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-5">
          <h2 className="text-lg font-bold text-blue-800 mb-3">触发父组件重渲染</h2>
          <ul className="text-sm text-blue-900 space-y-2">
            <li><strong>State 变化</strong> — 调用 setState / setCount 等</li>
            <li><strong>Props 变化</strong> — 上层传入的新 props</li>
            <li><strong>Context 变化</strong> — useContext 的 value 更新</li>
            <li><strong>强制更新</strong> — forceUpdate 类 API（少见）</li>
          </ul>
        </div>
        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-5">
          <h2 className="text-lg font-bold text-green-800 mb-3">避免不必要重渲染</h2>
          <ul className="text-sm text-green-900 space-y-2">
            <li>用 <code className="bg-green-100 px-1 rounded">useCallback</code> 稳定函数引用</li>
            <li>用 <code className="bg-green-100 px-1 rounded">React.memo</code> 包裹纯展示子组件</li>
            <li>审慎设置 effect 依赖，避免把每次新建的函数放进依赖数组</li>
          </ul>
        </div>
      </section>

      <ForceUpdateDemo />

      <section className="bg-gray-100 rounded-lg p-5">
        <h2 className="text-lg font-bold text-gray-800 mb-3">总结</h2>
        <p className="text-sm text-gray-700 leading-relaxed">
          在你的例子中：父组件 <code className="bg-white px-1 rounded">count</code> 变化 → Parent 重渲染 →
          重新创建 <code className="bg-white px-1 rounded">handleClick</code> → onClick 引用变化 →
          子组件 <code className="bg-white px-1 rounded">useEffect</code> 再次执行。这就是整条连锁反应的根源。
          用 <code className="bg-white px-1 rounded">useCallback</code> 缓存引用，或调整 effect 依赖策略即可打破循环。
        </p>
      </section>
    </div>
  );
}
