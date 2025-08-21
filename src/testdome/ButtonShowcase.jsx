import React from 'react';
import FancyButton from './FancyButton';

const ButtonShowcase = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-8">
          Tailwind CSS 按钮展示
        </h1>
        
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">基础按钮</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <FancyButton>默认按钮</FancyButton>
            <FancyButton large={false}>小按钮</FancyButton>
            <FancyButton large={true}>大按钮</FancyButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">不同样式变体</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <FancyButton variant="primary">主要按钮</FancyButton>
            <FancyButton variant="secondary">次要按钮</FancyButton>
            <FancyButton variant="success">成功按钮</FancyButton>
            <FancyButton variant="danger">危险按钮</FancyButton>
            <FancyButton variant="outline">轮廓按钮</FancyButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">大尺寸按钮</h2>
          <div className="flex flex-wrap gap-4 mb-8">
            <FancyButton large={true} variant="primary">大主要按钮</FancyButton>
            <FancyButton large={true} variant="success">大成功按钮</FancyButton>
            <FancyButton large={true} variant="outline">大轮廓按钮</FancyButton>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">交互效果</h2>
          <p className="text-gray-600 mb-4">
            所有按钮都包含悬停效果、焦点状态和过渡动画
          </p>
          <div className="flex flex-wrap gap-4">
            <FancyButton variant="primary">悬停我</FancyButton>
            <FancyButton variant="outline">点击我</FancyButton>
            <FancyButton variant="success" large={true}>大按钮效果</FancyButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ButtonShowcase;
