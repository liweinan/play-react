import { useState, useRef } from 'react';

export default function AsyncDemo() {
  const [logs, setLogs] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [taskCount, setTaskCount] = useState(0);
  
  // 使用 ref 来存储调度器状态
  const schedulerRef = useRef({
    taskQueue: [],
    isRunning: false,
    currentTime: 0,
    taskId: 0,
    totalTasks: 0,
    completedTasks: 0
  });

  // 执行下一个任务
  const executeNextTask = () => {
    const scheduler = schedulerRef.current;
    console.log('执行任务检查 - 队列长度:', scheduler.taskQueue.length, '已完成:', scheduler.completedTasks, '总任务:', scheduler.totalTasks);
    
    // 检查是否所有任务都完成了
    if (scheduler.completedTasks >= scheduler.totalTasks) {
      console.log('所有任务完成');
      scheduler.isRunning = false;
      setIsRunning(false);
      return;
    }

    // 如果队列为空，等待一段时间再检查
    if (scheduler.taskQueue.length === 0) {
      console.log('队列为空，等待新任务...');
      setTimeout(() => {
        executeNextTask();
      }, 100);
      return;
    }

    // 选择下一个要执行的任务（模拟调度算法）
    let selectedTaskIndex = 0;
    
    // 模拟时间切片和优先级调度
    for (let i = 0; i < scheduler.taskQueue.length; i++) {
      const task = scheduler.taskQueue[i];
      
      // 高优先级任务优先
      if (task.priority === 'high') {
        selectedTaskIndex = i;
        break;
      }
      
      // 随机选择中低优先级任务（模拟调度的不确定性）
      if (Math.random() < 0.3) {
        selectedTaskIndex = i;
        break;
      }
    }

    const task = scheduler.taskQueue.splice(selectedTaskIndex, 1)[0];
    console.log('执行任务:', task.name);
    
    // 执行任务
    const timestamp = new Date().toLocaleTimeString() + '.' + Date.now().toString().slice(-3);
    setLogs(prev => [...prev, {
      id: task.id,
      name: task.name,
      priority: task.priority,
      timestamp,
      duration: task.duration,
      actualDuration: scheduler.currentTime - task.startTime
    }]);

    // 更新时间
    scheduler.currentTime += task.duration;
    scheduler.completedTasks++;
    
    // 继续执行下一个任务
    setTimeout(() => {
      executeNextTask();
    }, 50); // 模拟任务切换的时间
  };

  // 添加任务到队列
  const scheduleTask = (task) => {
    const scheduler = schedulerRef.current;
    task.id = ++scheduler.taskId;
    task.startTime = scheduler.currentTime;
    task.expirationTime = task.startTime + task.duration;
    
    // 根据优先级插入到合适位置（模拟优先级调度）
    let insertIndex = scheduler.taskQueue.length;
    for (let i = 0; i < scheduler.taskQueue.length; i++) {
      if (task.priority === 'high' && scheduler.taskQueue[i].priority !== 'high') {
        insertIndex = i;
        break;
      } else if (task.priority === 'medium' && scheduler.taskQueue[i].priority === 'low') {
        insertIndex = i;
        break;
      }
    }
    
    scheduler.taskQueue.splice(insertIndex, 0, task);
    console.log('任务已添加:', task.name, '队列长度:', scheduler.taskQueue.length);
  };

  // 启动调度器
  const startScheduler = () => {
    const scheduler = schedulerRef.current;
    console.log('尝试启动调度器，当前状态:', scheduler.isRunning);
    if (!scheduler.isRunning) {
      console.log('启动调度器成功');
      scheduler.isRunning = true;
      executeNextTask();
    } else {
      console.log('调度器已在运行，跳过启动');
    }
  };

  // 启动演示
  const startDemo = () => {
    console.log('=== 开始演示 ===');
    setIsRunning(true);
    setLogs([]);
    setTaskCount(0);
    
    const schedulerState = schedulerRef.current;
    schedulerState.taskQueue = [];
    schedulerState.currentTime = 0;
    schedulerState.taskId = 0;
    schedulerState.completedTasks = 0;

    // 创建任务（不预先打乱顺序）
    const tasks = [
      { name: '高优先级任务A', priority: 'high', duration: 100 },
      { name: '中优先级任务A', priority: 'medium', duration: 200 },
      { name: '低优先级任务A', priority: 'low', duration: 300 },
      { name: '高优先级任务B', priority: 'high', duration: 150 },
      { name: '中优先级任务B', priority: 'medium', duration: 250 },
      { name: '低优先级任务C', priority: 'low', duration: 350 },
    ];

    schedulerState.totalTasks = tasks.length;
    setTaskCount(tasks.length);

    console.log('开始演示，总任务数:', tasks.length);
    console.log('调度器初始状态:', schedulerState);

    // 简化版本：立即添加所有任务，然后启动调度器
    console.log('立即添加所有任务到调度器');
    tasks.forEach((task, index) => {
      console.log(`添加任务 ${index + 1}:`, task.name);
      scheduleTask({ ...task });
    });

    console.log('所有任务已添加，队列长度:', schedulerState.taskQueue.length);
    console.log('启动调度器');
    startScheduler();
  };

  // 清空日志
  const clearLogs = () => {
    setLogs([]);
    setTaskCount(0);
  };

  // 获取优先级颜色
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          单线程异步调度演示
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          展示异步任务的随机执行顺序
        </p>
      </div>

      {/* 控制按钮 */}
      <div className="flex justify-center gap-4">
        <button
          onClick={startDemo}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {isRunning ? '运行中...' : '开始演示'}
        </button>
        
        <button
          onClick={clearLogs}
          disabled={isRunning}
          className={`px-6 py-3 rounded-lg font-semibold transition-colors ${
            isRunning
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-gray-500 hover:bg-gray-600 text-white'
          }`}
        >
          清空日志
        </button>
      </div>

      {/* 任务统计 */}
      <div className="bg-blue-50 p-4 rounded-lg">
        <h2 className="text-lg font-semibold text-blue-800 mb-2">任务统计</h2>
        <p className="text-blue-700">
          总任务数: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{taskCount}</span>
        </p>
        <p className="text-blue-700">
          已完成: <span className="font-mono bg-blue-100 px-2 py-1 rounded">{logs.length}</span>
        </p>
        {isRunning && (
          <p className="text-blue-700 mt-2">
            <span className="animate-pulse">⏳ 任务执行中...</span>
          </p>
        )}
      </div>

      {/* 执行日志 */}
      <div className="bg-white p-4 rounded-lg border-2 border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-3">执行日志</h2>
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {logs.length === 0 ? (
            <p className="text-gray-500 italic text-center py-8">
              点击"开始演示"查看异步任务的随机执行顺序
            </p>
          ) : (
            logs.map((log, index) => (
              <div key={log.id} className="flex items-center gap-3 p-3 rounded border">
                <span className="text-sm text-gray-500 font-mono w-12">
                  #{index + 1}
                </span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getPriorityColor(log.priority)}`}>
                  {log.priority.toUpperCase()}
                </span>
                <span className="flex-1 text-gray-700">{log.name}</span>
                <span className="text-sm text-gray-500 font-mono">
                  {log.timestamp}
                </span>
                <span className="text-xs text-gray-400">
                  ({log.duration}ms)
                </span>
              </div>
            ))
          )}
        </div>
      </div>

      {/* 说明 */}
      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
        <h3 className="text-lg font-semibold text-yellow-800 mb-2">💡 演示说明</h3>
        <ul className="text-yellow-700 space-y-1 text-sm">
          <li>• 模拟单线程调度器，使用 if...else 逻辑</li>
          <li>• 任务按随机时间到达调度器</li>
          <li>• 调度算法实时决定下一个执行的任务</li>
          <li>• 高优先级任务优先，但中低优先级任务随机选择</li>
          <li>• 每次运行都会产生不同的执行顺序</li>
          <li>• 这展示了真正的单线程异步调度随机性</li>
        </ul>
      </div>

      {/* 技术细节 */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">🔍 技术实现</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">单线程调度器：</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 使用 if...else 逻辑选择任务</li>
              <li>• 任务队列管理</li>
              <li>• 优先级调度算法</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-gray-700 mb-1">实时随机性：</h4>
            <ul className="text-gray-600 space-y-1">
              <li>• 任务随机时间到达</li>
              <li>• 调度算法中的随机选择</li>
              <li>• 不使用预先打乱顺序</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 调度算法 */}
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
        <h3 className="text-lg font-semibold text-blue-800 mb-2">⚙️ 调度算法</h3>
        <pre className="bg-gray-800 text-green-400 p-3 rounded text-xs overflow-x-auto">
{`// 单线程调度算法
for (let i = 0; i < taskQueue.length; i++) {
  const task = taskQueue[i];
  
  // 高优先级任务优先
  if (task.priority === 'high') {
    selectedTaskIndex = i;
    break;
  }
  
  // 随机选择中低优先级任务
  if (Math.random() < 0.3) {
    selectedTaskIndex = i;
    break;
  }
}`}
        </pre>
      </div>
    </div>
  );
}
