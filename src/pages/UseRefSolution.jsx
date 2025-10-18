import {useState, useEffect, useRef, useCallback} from 'react';

export default function UseRefSolution() {
    const [userId, setUserId] = useState('user-001');
    const [clickCount, setClickCount] = useState(0);
    const [logs, setLogs] = useState([]);

    // 使用 useRef 来存储最新的 userId
    const userIdRef = useRef(userId);

    // 手动同步 userId 到 ref
    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);


    /* 最简单写法，直接useRef封装 */
    // 手动同步 userId 到 ref
    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);

    // useEffect 只在 clickCount 变化时触发
    useEffect(() => {
        if (clickCount > 0) {
            const logMessage = `用户 ${userIdRef.current} 点击了 ${clickCount} 次`;
            console.log(logMessage);
            setLogs(prev => [...prev, {
                id: Date.now(),
                message: logMessage,
                timestamp: new Date().toLocaleTimeString()
            }]);
        }
    }, [clickCount]);

    // ---------------------------------------------
    /*
            callBack封装：
    */
    // 使用 useCallback 包装事件处理逻辑，避免ESLint警告
    // const logUserAction = useCallback(() => {
    //   const logMessage = `用户 ${userIdRef.current} 点击了 ${clickCount} 次`;
    //   console.log(logMessage);
    //   setLogs(prev => [...prev, {
    //     id: Date.now(),
    //     message: logMessage,
    //     timestamp: new Date().toLocaleTimeString()
    //   }]);
    // }, [clickCount]);
    //

    // ---------------------------------------------
    /*
        触发无限循环：
        ESLint: The 'logUserAction' function makes the dependencies of useEffect Hook (at line 45) change on every render. Move it inside the useEffect callback. Alternatively, wrap the definition of 'logUserAction' in its own useCallback() Hook. (react-hooks/exhaustive-deps)
     */
    // const logUserAction = () => {
    //     const logMessage = `用户 ${userIdRef.current} 点击了 ${clickCount} 次`;
    //     console.log(logMessage);
    //     setLogs(prev => [...prev, {
    //         id: Date.now(),
    //         message: logMessage,
    //         timestamp: new Date().toLocaleTimeString()
    //     }]);
    // };
    // useEffect 只在 clickCount 变化时触发
    // useEffect(() => {
    //     if (clickCount > 0) {
    //         logUserAction(); // 手动调用事件逻辑
    //     }
    // }, [clickCount, logUserAction]);




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
        <div className="bg-purple-50 p-6 rounded-lg border-2 border-purple-200">
            <div className="flex items-center gap-2 mb-4">
                <h2 className="text-2xl font-bold text-purple-800">🔧 useRef + useCallback 方案</h2>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded text-sm">可行方案</span>
            </div>

            <div className="bg-white p-4 rounded-lg mb-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">当前状态</h3>
                <p className="text-gray-700">用户ID: <span
                    className="font-mono bg-gray-100 px-2 py-1 rounded">{userId}</span></p>
                <p className="text-gray-700">点击次数: <span
                    className="font-mono bg-gray-100 px-2 py-1 rounded">{clickCount}</span></p>
                <p className="text-gray-700">Ref中的ID: <span
                    className="font-mono bg-purple-100 text-purple-800 px-2 py-1 rounded">{userIdRef.current}</span></p>
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
                            <div key={log.id} className="bg-purple-50 p-3 rounded border-l-4 border-purple-400">
                                <p className="text-sm text-gray-700">{log.message}</p>
                                <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            <div className="bg-purple-100 p-4 rounded-lg">
                <h3 className="text-lg font-semibold text-purple-800 mb-2">💡 useRef + useCallback 方案特点</h3>
                <ul className="text-purple-700 space-y-1 text-sm">
                    <li>• 点击按钮会增加点击次数并记录日志</li>
                    <li>• 更换用户ID不会触发日志记录（因为useEffect只依赖clickCount）</li>
                    <li>• useRef确保日志中始终使用最新的userId值</li>
                    <li>• useCallback避免ESLint警告</li>
                    <li>• 需要手动同步userId到ref中</li>
                    <li>• 代码相对复杂，但功能完整</li>
                </ul>
            </div>

            <div className="bg-gray-100 p-4 rounded-lg mt-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 代码实现</h3>
                <pre className="bg-gray-800 text-purple-400 p-3 rounded text-xs overflow-x-auto">
{`// 使用 useRef 存储最新值
const userIdRef = useRef(userId);

// 手动同步 userId 到 ref
useEffect(() => {
  userIdRef.current = userId;
}, [userId]);

// 使用 useCallback 包装事件处理逻辑
const logUserAction = useCallback(() => {
  console.log(\`用户 \${userIdRef.current} 点击了 \${clickCount} 次\`);
}, [clickCount]);

useEffect(() => {
  if (clickCount > 0) {
    logUserAction();
  }
}, [clickCount, logUserAction]); // 依赖 clickCount 和 logUserAction`}
        </pre>
            </div>

            <div className="bg-blue-50 p-4 rounded-lg mt-4 border border-blue-200">
                <h3 className="text-lg font-semibold text-blue-800 mb-2">🔍
                    探索过程：为什么必须使用useRef+useCallback</h3>
                <div className="text-blue-700 text-sm space-y-2">
                    <p><strong>问题1：</strong>纯useCallback方案 - 只依赖clickCount，userId被闭包捕获，可能不是最新值</p>
                    <p><strong>问题2：</strong>useCallback依赖userId - 会导致userId变化时重新创建函数，触发useEffect</p>
                    <p><strong>问题3：</strong>纯useRef方案 - 会产生ESLint警告，因为函数每次渲染都重新创建</p>
                    <p><strong>解决方案：</strong>useRef存储最新值 + useCallback避免警告 = 功能完整且无警告</p>
                </div>
            </div>

            <div className="bg-yellow-50 p-4 rounded-lg mt-4 border border-yellow-200">
                <h3 className="text-lg font-semibold text-yellow-800 mb-2">⚖️ useRef+useCallback vs useEffectEvent</h3>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                    <div>
                        <h4 className="font-semibold text-purple-700 mb-1">useRef+useCallback 方案：</h4>
                        <ul className="text-yellow-700 space-y-1">
                            <li>✅ 稳定API，所有React版本支持</li>
                            <li>✅ 功能完整，无闭包捕获问题</li>
                            <li>✅ 无ESLint警告</li>
                            <li>❌ 需要手动同步</li>
                            <li>❌ 代码相对复杂</li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="font-semibold text-green-700 mb-1">useEffectEvent 方案：</h4>
                        <ul className="text-yellow-700 space-y-1">
                            <li>✅ 自动同步最新值</li>
                            <li>✅ 代码更简洁</li>
                            <li>✅ 语义更清晰</li>
                            <li>✅ 无ESLint警告</li>
                            <li>❌ 需要React 19.2+</li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="bg-green-50 p-4 rounded-lg mt-4 border border-green-200">
                <h3 className="text-lg font-semibold text-green-800 mb-2">💡 最终结论</h3>
                <div className="text-green-700 text-sm space-y-2">
                    <p><strong>在React 19.2之前：</strong>useRef + useCallback 是解决此类问题的最佳方案</p>
                    <p><strong>在React 19.2之后：</strong>useEffectEvent 是更优雅的解决方案</p>
                    <p><strong>关键洞察：</strong>单独使用useRef或useCallback都有局限性，必须组合使用才能完美解决</p>
                </div>
            </div>
        </div>
    );
}
