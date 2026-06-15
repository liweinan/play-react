import { useState } from 'react';

// HelloTsProps 是 TypeScript 编译期的类型检查，运行时不存在。
// 它声明：这个组件的 props 必须有一个 name 字段，类型是 string。
//
//   <HelloTs name="React" />  ✅
//   <HelloTs name={123} />    ❌ 编译报错
//   <HelloTs />               ❌ 编译报错（缺少 name）
type HelloTsProps = {
    name: string;
};

// 调用方写 <HelloTs name="React" /> 时，React 实际传入的是 props 对象：
//
//   HelloTs({ name: "React" })
//
// 参数 { name } 是解构赋值，等价于：
//
//   function HelloTs(props: HelloTsProps) {
//       const name = props.name;
//   }
//
// 匹配靠的是属性名 name 一致，不是字符串 "React" 和参数名有特殊关系。
// "React" 只是 props.name 的值；换成 name="Vue" 同理，解构出的 name 就是 "Vue"。
export default function HelloTs({ name }: HelloTsProps) {
    const [count, setCount] = useState(0);

    return (
        <div>
            <h1>TypeScript 函数组件</h1>
            <p>Hello, {name}!</p>
            <button type="button" onClick={() => setCount((c) => c + 1)}>
                count: {count}
            </button>
        </div>
    );
}
