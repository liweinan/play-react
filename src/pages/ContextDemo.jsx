import { createContext, useContext, useState } from 'react';

// ---------------------------------------------------------------------------
// 第一步：createContext 创建一个「上下文对象」
//
// 可以把它想象成 React 提供的一个广播频道：
// - Provider 负责往频道里放数据
// - 任意深度的子组件可以用 useContext 收听这个频道
//
// 默认值 null：如果组件不在 Provider 里面就读取，会得到 null（后面会校验）
// ---------------------------------------------------------------------------
const ThemeContext = createContext(null);

// ---------------------------------------------------------------------------
// 第二步：Provider 组件 —— 数据的「提供者」
//
// 把 state 和修改方法打包成 value，传给 ThemeContext.Provider。
// Provider 包裹住的所有子孙组件，都有权读取这个 value。
// ---------------------------------------------------------------------------
function ThemeProvider({ children }) {
    const [theme, setTheme] = useState('light');

    // 放进 Context 的值：可以是任意类型，这里用一个对象
    const value = { theme, setTheme };

    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    );
}

// ---------------------------------------------------------------------------
// 第三步（可选但推荐）：封装自定义 hook
//
// 子组件不用每次都写 useContext(ThemeContext)，也不用手动判空。
// ---------------------------------------------------------------------------
function useTheme() {
    const context = useContext(ThemeContext);

    if (!context) {
        throw new Error('useTheme 必须在 ThemeProvider 内部使用');
    }

    return context;
}

// ---------------------------------------------------------------------------
// 中间层组件：故意不接收、不传递任何 theme 相关的 props
//
// 如果没有 Context，深层组件要拿到 theme，就得一层层 props 往下传（prop drilling）。
// 有了 Context，中间层可以完全不知道 theme 的存在。
// ---------------------------------------------------------------------------
function MiddleLayer() {
    return (
        <div style={{ border: '1px solid #ddd', padding: '1rem', marginTop: '1rem' }}>
            <p>我是中间组件 MiddleLayer，没有 theme 相关的 props。</p>
            <ThemePanel />
        </div>
    );
}

// ---------------------------------------------------------------------------
// 深层子组件：直接用 useTheme() 读取 Context，无需 props
// ---------------------------------------------------------------------------
function ThemePanel() {
    const { theme, setTheme } = useTheme();

    const toggleTheme = () => {
        setTheme((current) => (current === 'light' ? 'dark' : 'light'));
    };

    const boxStyle = {
        marginTop: '0.5rem',
        padding: '1rem',
        border: '1px solid #ccc',
        background: theme === 'light' ? '#fff' : '#333',
        color: theme === 'light' ? '#222' : '#fff',
    };

    return (
        <div style={boxStyle}>
            <p>当前主题：{theme}</p>
            <button type="button" onClick={toggleTheme}>
                切换主题
            </button>
        </div>
    );
}

// ---------------------------------------------------------------------------
// 页面入口：用 ThemeProvider 包住需要共享数据的子树
// ---------------------------------------------------------------------------
export default function ContextDemo() {
    return (
        <div>
            <h1>Context 示例</h1>
            <p>
                Context 用来在组件树中<strong>跨层传递数据</strong>，
                避免每一层都手动传 props（prop drilling）。
            </p>
            <p>流程：createContext → Provider 提供值 → 子组件 useContext 读取。</p>

            {/* 只有被 Provider 包住的组件才能读到 theme */}
            <ThemeProvider>
                <MiddleLayer />
            </ThemeProvider>
        </div>
    );
}
