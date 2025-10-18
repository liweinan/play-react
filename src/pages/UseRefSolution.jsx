import {useState, useEffect, useRef, useCallback} from 'react';

export default function UseRefSolution() {
    const [userId, setUserId] = useState('user-001');
    const [clickCount, setClickCount] = useState(0);
    const [logs, setLogs] = useState([]);

    // 使用 useRef 来存储最新的 userId
    const userIdRef = useRef(userId);

    // ---------------------------------------------
    // 手动同步 userId 到 ref
    // ---------------------------------------------
    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);


    useEffect(() => {
        userIdRef.current = userId;
    }, [userId]);

    // ---------------------------------------------
    // 当前使用的方案：函数内联到useEffect中
    // ---------------------------------------------
    // 这是最简单且安全的方案：
    // 1. 不需要useCallback，因为函数直接写在useEffect内部
    // 2. 不需要担心函数引用变化，因为useEffect只依赖clickCount
    // 3. 使用userIdRef.current获取最新的userId值
    // 4. 避免了所有潜在的无限循环问题
    //
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
    }, [clickCount]); // 只依赖clickCount，简单且安全

    // ---------------------------------------------
    //     触发无限循环的代码示例：
    //     ESLint: The 'logUserAction' function makes the dependencies of useEffect Hook (at line 45) change on every render.
    //     Move it inside the useEffect callback. Alternatively, wrap the definition of 'logUserAction' in its own useCallback() Hook. (react-hooks/exhaustive-deps)
    // ---------------------------------------------
    //
    // 无限循环的根本原因：
    // 1. 函数重新创建问题：
    //    - 每次组件重新渲染时，logUserAction都会重新创建为一个全新的函数对象
    //    - 即使函数内容完全相同，但JavaScript中函数是对象，每次创建都是不同的引用
    //
    // 2. useEffect依赖项变化：
    //    - useEffect的依赖数组 [clickCount, logUserAction] 中
    //    - clickCount 只在点击时变化
    //    - logUserAction 每次渲染都变化（因为是新函数）
    //
    // 3. 无限循环的完整流程：
    //    渲染1: logUserAction = function1 (引用A), useEffect依赖: [0, function1], useEffect执行: 不执行（clickCount=0）
    //    用户点击: setClickCount(1) 触发重新渲染
    //    渲染2: logUserAction = function2 (引用B) ← 新函数！, useEffect依赖: [1, function2] ← 依赖变化了！
    //          useEffect执行: 调用logUserAction(), logUserAction() 调用 setLogs() ← 触发状态更新
    //    状态更新触发渲染3: logUserAction = function3 (引用C) ← 又是新函数！
    //          useEffect依赖: [1, function3] ← 依赖又变化了！, useEffect执行: 再次调用logUserAction()
    //    无限循环开始...
    //
    // 4. 为什么setLogs会触发重新渲染？
    //    - setLogs会更新logs状态，状态更新会触发组件重新渲染
    //    - 重新渲染会创建新的logUserAction函数，新的函数引用会导致useEffect重新执行
    //    - 形成：setLogs → 重新渲染 → 新函数 → useEffect执行 → setLogs → ...
    //
    // 关键理解：React的依赖数组比较的是引用，不是值
    // - 即使两个函数内容完全相同，function1 !== function2
    // - useEffect看到依赖项引用变化，就会重新执行
    // - 这就是为什么需要useCallback来"稳定"函数引用
    //
    // const logUserAction = () => {
    //     const logMessage = `用户 ${userIdRef.current} 点击了 ${clickCount} 次`;
    //     console.log(logMessage);
    //     setLogs(prev => [...prev, {
    //         id: Date.now(),
    //         message: logMessage,
    //         timestamp: new Date().toLocaleTimeString()
    //     }]);
    // };
    //
    // useEffect(() => {
    //     if (clickCount > 0) {
    //         logUserAction(); // 手动调用事件逻辑
    //     }
    // }, [clickCount, logUserAction]); // ← 这里会导致无限循环！
    //

    // ---------------------------------------------
    // 解决方案：使用 useCallback 包装事件处理逻辑，避免ESLint警告
    // ---------------------------------------------
    //
    // useCallback的工作原理：
    // - useCallback会"记住"函数，只有当依赖数组中的值发生变化时才重新创建函数
    // - 这里依赖数组是[clickCount]，所以只有当clickCount变化时，logUserAction才会重新创建
    // - 这样就避免了每次渲染都创建新函数的问题
    //
    // 为什么这样不会无限循环：
    // 1. 初始渲染: logUserAction = function1, useEffect依赖: [0, function1], 不执行
    // 2. 用户点击: setClickCount(1) 触发重新渲染
    // 3. 重新渲染: 因为clickCount从0变为1，useCallback重新创建logUserAction = function2
    // 4. useEffect执行: 依赖[1, function2]，调用logUserAction()
    // 5. setLogs触发重新渲染: 但clickCount还是1，useCallback不会重新创建函数
    // 6. useEffect不执行: 因为依赖[1, function2]没有变化
    // 7. 循环结束！
    //
    // const logUserAction = useCallback(() => {
    //   const logMessage = `用户 ${userIdRef.current} 点击了 ${clickCount} 次`;
    //   console.log(logMessage);
    //   setLogs(prev => [...prev, {
    //     id: Date.now(),
    //     message: logMessage,
    //     timestamp: new Date().toLocaleTimeString()
    //   }]);
    // }, [clickCount]); // ← 关键：只有clickCount变化时才重新创建函数
    //
    // useEffect(() => {
    //     if (clickCount > 0) {
    //         logUserAction(); // 手动调用事件逻辑
    //     }
    // }, [clickCount, logUserAction]); // ← 现在不会无限循环了
    //


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
