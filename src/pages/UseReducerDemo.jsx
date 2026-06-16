import { useReducer } from 'react';

// 初始 state：第一次渲染时，React 用这个值作为 state
const initialState = { count: 0 };

// action 类型常量：ACTIONS.INCREMENT 的值就是字符串 'increment'
// dispatch({ type: ACTIONS.INCREMENT }) 等价于 dispatch({ type: 'increment' })
// 按钮和 reducer 的 switch 都用同一个常量，保证两边字符串一致、不易拼错
const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET: 'reset',
};

// reducer 函数：你定义它，但通常不手动调用，而是交给 useReducer / React 来调
//
// 为什么是 (state, action)，而不是 { action }？
//   React 内部固定用两个参数调用：counterReducer(currentState, actionObject)
//   不是传一个 { action: ... } 包裹对象，所以参数必须是两个独立形参。
//   也可写成 (state, { type }) —— 直接解构第二个参数 action 里的 type 字段。
//
// 参数 1 — state（当前状态）
//   React 内部保存着最新的 state，每次 dispatch 时自动传进来，不用你在 dispatch 里传。
//   第一次调用时 state = initialState，即 { count: 0 }
//   点过 +1 后再 dispatch，state 就是上一步 return 的结果，如 { count: 1 }
//
// 参数 2 — action（你通过 dispatch 传入的对象）
//   dispatch({ type: ACTIONS.INCREMENT }) 传入的对象会原样作为第二个参数
//   即 action = { type: 'increment' }，不是 { action: { type: '...' } }
//
// action.type 和 switch case 为什么对得上？
//   dispatch 传 type: ACTIONS.INCREMENT → 实际是 type: 'increment'
//   switch (action.type) 得到 'increment'
//   case ACTIONS.INCREMENT 也是 'increment' → 匹配成功
//
// 返回值 — 新的 state
//   React 用返回值替换内部 state，然后重新渲染组件
//
// 完整链路（点 +1 按钮，当前 count 为 0）：
//   dispatch({ type: ACTIONS.INCREMENT })
//     → React 内部调用 counterReducer(state, action)
//     → 即 counterReducer({ count: 0 }, { type: 'increment' })
//     → switch 命中 INCREMENT，return { count: 1 }
//     → React 把 state 更新为 { count: 1 }，组件重新渲染
function counterReducer(state, action) {
    switch (action.type) {
        case ACTIONS.INCREMENT:
            return { count: state.count + 1 };
        case ACTIONS.DECREMENT:
            return { count: state.count - 1 };
        case ACTIONS.RESET:
            return initialState;
        default:
            return state;
    }
}

export default function UseReducerDemo() {
    // useReducer( reducer函数, 初始state ) 返回 [当前state, dispatch函数]
    //
    // state：和 useState 的 state 一样，用来渲染 UI
    // dispatch：发「动作」的函数，参数对象会作为 reducer 的第二个参数 action 传入
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <div>
            <h1>useReducer 示例</h1>
            <p>count: {state.count}</p>

            {/* 只传 action；state 由 React 在调用 reducer 时自动注入 */}
            {/* { type: ACTIONS.INCREMENT } 就是 { type: 'increment' } */}
            <button type="button" onClick={() => dispatch({ type: ACTIONS.INCREMENT })}>
                +1
            </button>
            <button type="button" onClick={() => dispatch({ type: ACTIONS.DECREMENT })}>
                -1
            </button>
            <button type="button" onClick={() => dispatch({ type: ACTIONS.RESET })}>
                重置
            </button>
        </div>
    );
}
