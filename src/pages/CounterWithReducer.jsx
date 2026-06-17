import {useReducer} from 'react';

const initialState = {
    count: 0,
    message: 'INIT'
};

// ACTIONS.INCREMENT === 'increment'，dispatch 与 switch 用同一常量避免拼写错误
const ACTIONS = {
    INCREMENT: 'increment',
    DECREMENT: 'decrement',
    RESET: 'reset',
};

// 为什么是 (state, action) 而不是 { action }？
// React 固定用两个参数调用：counterReducer(currentState, actionObject)
// dispatch({ type: ACTIONS.INCREMENT }) 的对象原样作为第二个参数 action 传入
function counterReducer(state, action) {

    switch (action.type) {
        case ACTIONS.INCREMENT:
            return {count: state.count + 1};
        case ACTIONS.DECREMENT:
            return {count: state.count - 1};
        case ACTIONS.RESET:
            return {...initialState, message: "RESET"};
        default:
            return state;
    }
}

export default function CounterWithReducer() {
    // dispatch 更新 state → 组件重新渲染（与 useState 的 setState 相同）
    const [state, dispatch] = useReducer(counterReducer, initialState);

    return (
        <section>
            <h2>useReducer 写法</h2>
            <p>count: {state.count}</p>
            <p>msg: {state.message}</p>
            <button type="button" onClick={() => dispatch({type: ACTIONS.INCREMENT})}>
                +1
            </button>
            <button type="button" onClick={() => dispatch({type: ACTIONS.DECREMENT})}>
                -1
            </button>
            <button type="button" onClick={() => dispatch({type: ACTIONS.RESET})}>
                重置
            </button>
        </section>
    );
}
