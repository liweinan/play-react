import {useState, useEffect} from 'react';

export function UseEffectProblem() {
    const [userId, setUserId] = useState('user-001');
    const [clickCount, setClickCount] = useState(0);
    const [logs, setLogs] = useState([]);

    // 问题代码：useEffect 只依赖 clickCount 但使用了 userId
    useEffect(() => {
        const problemMessage = `用户 ${userId} 点击了 ${clickCount} 次`;
        console.log(problemMessage);
        setLogs(prev => [...prev, {
            id: Date.now(),
            message: problemMessage,
            timestamp: new Date().toLocaleTimeString()
        }]);
        // 重要发现：ESLint 的 set-state-in-effect 规则会分析整个 useEffect 的执行模式，
        // 如果发现违反了其他 Hook 规则（如 exhaustive-deps），就会认为 setState 调用也是危险的。
        // 这就是为什么同样的 setLogs 调用，在不同的上下文中会有不同的 ESLint 警告。
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [clickCount]); // 只依赖 clickCount，但使用了 userId - 这是故意的问题代码

    const handleClick = () => {
        setClickCount(prev => prev + 1);
    };

    const handleUserIdChange = () => {
        const newUserId = `user-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`;
        setUserId(newUserId);
    };

    const clearLogs = () => {
        setLogs([]);
    };

    return (
        <div className="bg-red-50 p-6 rounded-lg border-2 border-red-200">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-red-800">❌ 传统 useEffect 问题演示</h2>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm">问题</span>
            </div>

            <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">当前状态</h3>
                <p className="text-gray-700">当前用户ID: <span
                    className="font-mono bg-blue-100 text-blue-800 px-2 py-1 rounded">{userId}</span></p>
                <p className="text-gray-700">点击次数: <span
                    className="font-mono bg-gray-100 px-2 py-1 rounded">{clickCount}</span></p>
                <div className="mt-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                    <p className="text-sm text-yellow-800">
                        <strong>观察要点：</strong>这个代码违反了React Hook规则，ESLint会警告
                    </p>
                </div>
            </div>

            <div className="space-y-3 mb-4">
                <div className="flex gap-3 flex-wrap">
                    <button
                        onClick={handleClick}
                        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        点击按钮 (触发日志)
                    </button>

                    <button
                        onClick={handleUserIdChange}
                        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        更换用户ID (不触发日志)
                    </button>

                    <button
                        onClick={clearLogs}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition-colors"
                    >
                        清空日志
                    </button>
                </div>
            </div>

            <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">操作日志</h3>
                <div className="space-y-2 max-h-60 overflow-y-auto">
                    {logs.length === 0 ? (
                        <p className="text-gray-500 italic">暂无日志记录</p>
                    ) : (
                        logs.map(log => (
                            <div key={log.id} className="bg-red-50 p-3 rounded border-l-4 border-red-400">
                                <p className="text-sm text-gray-700">{log.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="bg-red-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-red-800 mb-2">⚠️ 问题分析</h3>
                <ul className="text-red-700 space-y-1 text-sm">
                    <li>• 点击按钮会增加点击次数并记录日志</li>
                    <li>• 更换用户ID不会触发日志记录（因为useEffect只依赖clickCount）</li>
                    <li>• 这违反了React Hook规则：使用了userId但没有在依赖数组中声明</li>
                    <li>• ESLint会警告：React Hook useEffect has a missing dependency: 'userId'</li>
                    <li>• 如果加入userId到依赖数组，又会造成不必要的重复执行</li>
                    <li>• 这就是为什么需要useEffectEvent的原因</li>
                </ul>
                <div className="mt-3 p-2 bg-red-200 rounded">
                    <p className="text-red-800 text-sm">
                        <strong>关键问题：</strong>代码违反了React Hook规则，ESLint会警告。虽然在这个简单例子中可能不会出现明显问题，但在复杂场景中会有风险。
                    </p>
                </div>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 问题代码</h3>
                <pre className="bg-gray-800 text-red-400 p-3 rounded text-xs overflow-x-auto">
{`useEffect(() => {
  const problemMessage = \`用户 \${userId} 点击了 \${clickCount} 次\`;
  console.log(problemMessage);
  setLogs(prev => [...prev, { 
    id: Date.now(), 
    message: problemMessage, 
    timestamp: new Date().toLocaleTimeString() 
  }]);
}, [clickCount]); // ❌ 只依赖 clickCount，但使用了 userId

// ESLint 警告：
// React Hook useEffect has a missing dependency: 'userId'. 
// Either include it or remove the dependency array.`}
                </pre>
            </div>
        </div>
    );
}
