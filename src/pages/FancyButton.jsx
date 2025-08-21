import React from 'react';

const FancyButton = ({ children, large = false, variant = 'primary' }) => {
  const baseStyles = "px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 shadow-lg";
  
  const largeStyles = large ? "text-3xl px-8 py-4" : "text-base";
  
  const variantStyles = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500 border border-blue-700",
    secondary: "bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500 border border-gray-700",
    success: "bg-green-600 hover:bg-green-700 text-white focus:ring-green-500 border border-green-700",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500 border border-red-700",
    outline: "bg-transparent border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500"
  };

  const className = `${baseStyles} ${largeStyles} ${variantStyles[variant]}`;

  // 处理 children，分别获取组件和文本
  const processChildren = () => {
    if (!children) return { components: [], text: '' };

    const components = [];
    let text = '';

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child)) {
        // 这是一个 React 元素（组件）
        components.push(child);
      } else if (typeof child === 'string' || typeof child === 'number') {
        // 这是文本内容
        text += child;
      }
    });

    return { components, text };
  };

  const { components, text } = processChildren();

  return (
    <button className={className}>
      {/* 渲染组件 */}
      {components.map((component, index) => (
        <span key={index} className="inline-flex items-center mr-2">
          {component}
        </span>
      ))}
      {/* 渲染文本 */}
      {text && <span>{text}</span>}
    </button>
  );
};

export default FancyButton;
