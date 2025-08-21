import React from 'react';
import FancyButton from './FancyButton.jsx';
import Icon from './Icon.jsx';

const ButtonDemo = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-gray-800 mb-4">
            Tailwind CSS 按钮演示
          </h1>
          <p className="text-xl text-gray-600">
            展示 FancyButton 组件与普通按钮的样式区别
          </p>
        </div>

        {/* 样式对比区域 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            样式对比
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* 普通按钮 */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-700 text-center">
                普通 HTML 按钮
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <button className="px-6 py-3 bg-blue-500 text-white rounded hover:bg-blue-600">
                    普通蓝色按钮
                  </button>
                  <span className="text-sm text-gray-500">基础样式，简单悬停</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <button className="px-6 py-3 bg-gray-500 text-white rounded hover:bg-gray-600">
                    普通灰色按钮
                  </button>
                  <span className="text-sm text-gray-500">无阴影，无边框</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <button className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600">
                    普通绿色按钮
                  </button>
                  <span className="text-sm text-gray-500">无焦点状态</span>
                </div>
              </div>
            </div>

            {/* FancyButton */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-gray-700 text-center">
                FancyButton 组件
              </h3>
              <div className="space-y-4">
                <div className="flex flex-col items-center gap-2">
                  <FancyButton variant="primary">
                    Fancy 蓝色按钮
                  </FancyButton>
                  <span className="text-sm text-gray-500">阴影 + 边框 + 悬停缩放</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <FancyButton variant="secondary">
                    Fancy 灰色按钮
                  </FancyButton>
                  <span className="text-sm text-gray-500">焦点环 + 过渡动画</span>
                </div>
                
                <div className="flex flex-col items-center gap-2">
                  <FancyButton variant="success">
                    Fancy 绿色按钮
                  </FancyButton>
                  <span className="text-sm text-gray-500">完整的交互状态</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 所有变体展示 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            所有样式变体
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="primary">主要</FancyButton>
              <span className="text-sm font-medium text-gray-700">Primary</span>
              <span className="text-xs text-gray-500 text-center">蓝色主要按钮</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="secondary">次要</FancyButton>
              <span className="text-sm font-medium text-gray-700">Secondary</span>
              <span className="text-xs text-gray-500 text-center">灰色次要按钮</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="success">成功</FancyButton>
              <span className="text-sm font-medium text-gray-700">Success</span>
              <span className="text-xs text-gray-500 text-center">绿色成功按钮</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="danger">危险</FancyButton>
              <span className="text-sm font-medium text-gray-700">Danger</span>
              <span className="text-xs text-gray-500 text-center">红色危险按钮</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="outline">轮廓</FancyButton>
              <span className="text-sm font-medium text-gray-700">Outline</span>
              <span className="text-xs text-gray-500 text-center">蓝色轮廓按钮</span>
            </div>
          </div>
        </div>

        {/* 组件和文本混合展示 */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            组件和文本混合
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="primary">
                <Icon name="download" />
                下载文件
              </FancyButton>
              <span className="text-sm text-gray-500">图标 + 文本</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="success">
                <Icon name="save" />
                保存设置
              </FancyButton>
              <span className="text-sm text-gray-500">保存图标</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="danger">
                <Icon name="delete" />
                删除项目
              </FancyButton>
              <span className="text-sm text-gray-500">删除图标</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="outline">
                <Icon name="edit" />
                编辑内容
              </FancyButton>
              <span className="text-sm text-gray-500">编辑图标</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="success">
                <Icon name="check" />
                确认操作
              </FancyButton>
              <span className="text-sm text-gray-500">确认图标</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="secondary">
                <Icon name="close" />
                取消操作
              </FancyButton>
              <span className="text-sm text-gray-500">取消图标</span>
            </div>
          </div>
        </div>

        {/* 尺寸对比 */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            尺寸对比
          </h2>
          
          <div className="flex flex-col items-center space-y-6">
            <div className="flex flex-col items-center gap-3">
              <FancyButton large={true} variant="primary">
                <Icon name="download" />
                大尺寸按钮
              </FancyButton>
              <span className="text-sm text-gray-500">large={true}</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton variant="primary">
                <Icon name="save" />
                标准尺寸按钮
              </FancyButton>
              <span className="text-sm text-gray-500">默认尺寸</span>
            </div>
            
            <div className="flex flex-col items-center gap-3">
              <FancyButton large={false} variant="outline">
                <Icon name="edit" />
                小尺寸按钮
              </FancyButton>
              <span className="text-sm text-gray-500">large={false}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonDemo;
