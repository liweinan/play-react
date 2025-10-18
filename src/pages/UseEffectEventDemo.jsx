import { useState } from 'react';
import UseEffectEventSolution from './UseEffectEventSolution';
import {UseEffectProblem} from './UseEffectProblem';
import UseRefSolution from './UseRefSolution';

export default function UseEffectEventDemo() {
  const [activeTab, setActiveTab] = useState('solution');

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          useEffectEvent 演示
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          对比传统 useEffect 和 useEffectEvent 的差异
        </p>
      </div>

      {/* 标签页导航 */}
      <div className="flex justify-center mb-6">
        <div className="bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setActiveTab('solution')}
            className={`px-4 py-3 rounded-md transition-colors text-sm ${
              activeTab === 'solution'
                ? 'bg-green-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ✅ useEffectEvent
          </button>
          <button
            onClick={() => setActiveTab('useref')}
            className={`px-4 py-3 rounded-md transition-colors text-sm ${
              activeTab === 'useref'
                ? 'bg-purple-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            🔧 useRef 方案
          </button>
          <button
            onClick={() => setActiveTab('problem')}
            className={`px-4 py-3 rounded-md transition-colors text-sm ${
              activeTab === 'problem'
                ? 'bg-red-500 text-white shadow-md'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            ❌ 传统问题
          </button>
        </div>
      </div>

      {/* 内容区域 */}
      <div className="min-h-[600px]">
        {activeTab === 'solution' && <UseEffectEventSolution />}
        {activeTab === 'useref' && <UseRefSolution />}
        {activeTab === 'problem' && <UseEffectProblem />}
      </div>

      {/* 对比说明 */}
      <div className="bg-blue-50 p-6 rounded-lg border-2 border-blue-200">
        <h2 className="text-2xl font-bold text-blue-800 mb-4">📚 三种方案对比</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-green-700 mb-2">✅ useEffectEvent</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• 自动同步最新值</li>
              <li>• 代码简洁清晰</li>
              <li>• 语义明确</li>
              <li>• 需要React 19.2+</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-purple-700 mb-2">🔧 useRef 方案</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• 稳定API，兼容性好</li>
              <li>• 完全控制同步</li>
              <li>• 需要手动同步</li>
              <li>• 代码相对复杂</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-red-700 mb-2">❌ 传统 useEffect</h3>
            <ul className="text-blue-700 space-y-1 text-sm">
              <li>• 违反Hook规则</li>
              <li>• ESLint警告</li>
              <li>• 潜在闭包问题</li>
              <li>• 维护性差</li>
            </ul>
          </div>
        </div>
      </div>

      {/* 使用建议 */}
      <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-200">
        <h2 className="text-2xl font-bold text-yellow-800 mb-4">💡 使用建议</h2>
        <div className="space-y-3 text-yellow-700">
          <p><strong>选择 useEffectEvent：</strong></p>
          <ul className="ml-4 space-y-1 text-sm">
            <li>• React 19.2+ 项目</li>
            <li>• 追求代码简洁性和可维护性</li>
            <li>• 复杂的多变量场景</li>
          </ul>
          
          <p className="mt-4"><strong>选择 useRef 方案：</strong></p>
          <ul className="ml-4 space-y-1 text-sm">
            <li>• 需要支持旧版本React</li>
            <li>• 需要精确控制同步时机</li>
            <li>• 简单的单变量场景</li>
          </ul>
          
          <p className="mt-4"><strong>避免传统 useEffect：</strong></p>
          <ul className="ml-4 space-y-1 text-sm">
            <li>• 违反Hook规则的写法</li>
            <li>• 会导致ESLint警告</li>
            <li>• 潜在维护性问题</li>
          </ul>
        </div>
      </div>
    </div>
  );
}