# FancyButton 组件使用指南

## 概述
FancyButton 是一个基于 Tailwind CSS 的现代化按钮组件，支持多种样式变体和尺寸。

## 基本用法

```jsx
import FancyButton from './FancyButton';

// 基础按钮
<FancyButton>点击我</FancyButton>

// 大尺寸按钮
<FancyButton large={true}>大按钮</FancyButton>

// 不同样式变体
<FancyButton variant="primary">主要按钮</FancyButton>
<FancyButton variant="success">成功按钮</FancyButton>
<FancyButton variant="danger">危险按钮</FancyButton>
<FancyButton variant="outline">轮廓按钮</FancyButton>
```

## 高级用法：组件和文本混合

```jsx
import FancyButton from './FancyButton';
import Icon from './Icon';

// 图标 + 文本
<FancyButton variant="primary">
  <Icon name="download" />
  下载文件
</FancyButton>

// 多个组件 + 文本
<FancyButton variant="success">
  <Icon name="save" />
  <span>保存</span>
  设置
</FancyButton>

// 纯组件
<FancyButton variant="outline">
  <Icon name="edit" />
</FancyButton>

// 纯文本
<FancyButton variant="danger">删除</FancyButton>
```

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | ReactNode | - | 按钮内容 |
| `large` | boolean | false | 是否使用大尺寸 |
| `variant` | string | 'primary' | 按钮样式变体 |

## children 详解

`children` 是 React 组件的特殊 prop，代表组件的子元素内容。它让组件变得更加灵活和可重用。

### children 的含义
- 当你使用组件时，放在组件标签之间的所有内容都会作为 `children` 传递
- 它可以是文本、React 元素、组件或它们的组合

### 使用示例

```jsx
// 1. 简单文本内容
<FancyButton>点击我</FancyButton>
// children = "点击我"

// 2. 复杂内容组合
<FancyButton>
  <span>保存</span>
  <i className="icon-save"></i>
</FancyButton>
// children = [<span>保存</span>, <i className="icon-save"></i>]

// 3. 组件作为内容
<FancyButton>
  <Icon name="download" />
  下载文件
</FancyButton>
// children = [<Icon name="download" />, "下载文件"]
```

### children 支持的类型
- **字符串**: `"按钮文字"`
- **数字**: `123`
- **React 元素**: `<span>内容</span>`
- **组件**: `<Icon />`
- **数组**: `[<span>1</span>, <span>2</span>]`
- **null/undefined**: 空内容
- **布尔值**: `true/false`

### 为什么使用 children？
1. **灵活性**: 可以传递任何类型的内容
2. **可读性**: 组件使用更直观
3. **可组合性**: 支持复杂的嵌套结构
4. **复用性**: 同一个组件可以显示不同的内容

### 处理组件和文本混合内容

FancyButton 组件能够智能识别和处理 children 中的组件和文本：

```jsx
// 组件会自动处理 children 中的组件和文本
<FancyButton variant="primary">
  <Icon name="download" />
  下载文件
</FancyButton>
```

**处理逻辑**：
- **React 元素**（如 `<Icon />`）会被识别为组件，单独渲染
- **文本内容**（如 "下载文件"）会被识别为文本，单独渲染
- 组件和文本会自动添加适当的间距和样式

**支持的混合内容**：
- 多个组件 + 文本
- 组件 + 多个文本片段
- 纯文本
- 纯组件

### 技术实现：如何分别获取组件和文本

#### 核心方法：使用 React.Children API

```jsx
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
```

#### 关键 API 说明：

1. **`React.Children.forEach(children, callback)`**
   - 安全地遍历 children 中的每个子元素
   - 处理 children 可能为 null、undefined 或数组的情况

2. **`React.isValidElement(child)`**
   - 检查子元素是否为有效的 React 元素（组件）
   - 返回 `true` 表示是组件，`false` 表示是文本或其他类型

3. **`typeof child`**
   - 检查子元素的类型
   - `'string'` 或 `'number'` 表示文本内容

#### 实际处理示例：

```jsx
// 输入
<FancyButton variant="primary">
  <Icon name="download" />
  下载文件
</FancyButton>

// 处理结果
components = [<Icon name="download" />]
text = "下载文件"

// 渲染结果
<button className="...">
  <span className="inline-flex items-center mr-2">
    <Icon name="download" />
  </span>
  <span>下载文件</span>
</button>
```

#### 渲染逻辑：

```jsx
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
```

## 可用的样式变体

- `primary`: 蓝色主要按钮
- `secondary`: 灰色次要按钮  
- `success`: 绿色成功按钮
- `danger`: 红色危险按钮
- `outline`: 蓝色轮廓按钮

## 特性

- ✅ 响应式设计
- ✅ 悬停效果
- ✅ 焦点状态
- ✅ 过渡动画
- ✅ 可访问性支持
- ✅ TypeScript 支持

## Tailwind CSS 类说明

组件使用了以下 Tailwind CSS 类：

- **基础样式**: `px-6 py-3 rounded-lg font-semibold`
- **过渡效果**: `transition-all duration-200`
- **悬停效果**: `hover:scale-105`
- **焦点状态**: `focus:outline-none focus:ring-2 focus:ring-offset-2`
- **尺寸控制**: `text-base` (小) / `text-3xl` (大)

## 注意事项

### children 处理限制
- 组件会自动识别 React 元素和文本内容
- 不支持嵌套的复杂对象或函数
- 布尔值 `true/false` 会被忽略
- `null/undefined` 会被安全处理

### 样式说明
- 组件会自动为子组件添加 `inline-flex items-center mr-2` 样式
- 文本内容会被包装在 `<span>` 中
- 组件和文本之间有适当的间距

### 性能考虑
- `React.Children.forEach` 在每次渲染时都会执行
- 对于大量按钮，建议使用 `useMemo` 优化处理逻辑
- 组件会自动为每个子组件添加唯一的 `key` 属性
