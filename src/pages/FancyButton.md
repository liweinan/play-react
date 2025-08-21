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

## Props

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `children` | ReactNode | - | 按钮内容 |
| `large` | boolean | false | 是否使用大尺寸 |
| `variant` | string | 'primary' | 按钮样式变体 |

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
