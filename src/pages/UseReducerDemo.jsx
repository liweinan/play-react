import CounterWithReducer from './CounterWithReducer.jsx';
import CounterWithUseState from './CounterWithUseState.jsx';

export default function UseReducerDemo() {
    return (
        <div>
            <h1>useReducer vs useState</h1>

            {/*
              Q1: useReducer 会触发重新渲染吗？
              会。dispatch → reducer 返回新 state → 组件 re-render，和 setState 一样。

              Q2: 什么时候需要用 reducer？
              - 多个相关 state 字段一起更新
              - 更新逻辑复杂，想集中到 reducer 里
              - 多处触发相同的状态变更规则
              简单计数（本例）用 useState 就够了；这里用 useReducer 主要是学习。

              Q3: 能用 useMemo / useEffect 替代吗？
              - useState：可以，见 CounterWithUseState，本例更推荐
              - useMemo：不能，只缓存计算结果，不管理交互 state
              - useEffect：不能，副作用钩子，不适合「点按钮改计数」
            */}

            <CounterWithReducer />
            <CounterWithUseState />
        </div>
    );
}
