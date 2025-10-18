import { useState, useEffect, useEffectEvent } from 'react';

export default function UseEffectEventSolution() {
  const [userId, setUserId] = useState('user-001');
  const [clickCount, setClickCount] = useState(0);
  const [logs, setLogs] = useState([]);

  // 使用 useEffectEvent 定义事件处理逻辑
  const logUserAction = useEffectEvent(() => {
    const logMessage = `用户 ${userId} 点击了 ${clickCount} 次`;
    console.log(logMessage);
    setLogs(prev => [...prev, { 
      id: Date.now(), 
      message: logMessage, 
      timestamp: new Date().toLocaleTimeString() 
    }]);
  });

  // useEffect 只在 clickCount 变化时触发
  useEffect(() => {
    if (clickCount > 0) {
      logUserAction(); // 手动调用事件逻辑
    }
  }, [clickCount, logUserAction]);

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
    <div className="bg-green-50 p-6 rounded-lg border-2 border-green-200">
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-2xl font-bold text-green-800">✅ useEffectEvent 解决方案</h2>
        <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">推荐</span>
      </div>
      
      <div className="bg-white p-4 rounded-lg mb-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">当前状态</h3>
        <p className="text-gray-700">用户ID: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{userId}</span></p>
        <p className="text-gray-700">点击次数: <span className="font-mono bg-gray-100 px-2 py-1 rounded">{clickCount}</span></p>
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
              <div key={log.id} className="bg-green-50 p-3 rounded border-l-4 border-green-400">
                <p className="text-sm text-gray-700">{log.message}</p>
                <p className="text-xs text-gray-500 mt-1">{log.timestamp}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="bg-green-100 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">💡 解决方案特点</h3>
        <ul className="text-green-700 space-y-1 text-sm">
          <li>• 点击按钮会增加点击次数并记录日志</li>
          <li>• 更换用户ID不会触发日志记录（因为useEffect只依赖clickCount）</li>
          <li>• useEffectEvent确保日志中始终使用最新的userId值</li>
          <li>• 避免了传统useEffect中userId变化导致的不必要日志记录</li>
        </ul>
      </div>

      <div className="bg-gray-100 p-4 rounded-lg mt-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 代码实现</h3>
        <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`const logUserAction = useEffectEvent(() => {
  console.log(\`用户 \${userId} 点击了 \${clickCount} 次\`);
});

useEffect(() => {
  if (clickCount > 0) {
    logUserAction();
  }
}, [clickCount]); // 仅依赖 clickCount`}
        </pre>
      </div>
    </div>
  );
}
