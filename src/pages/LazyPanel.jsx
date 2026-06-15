// 被 lazy(() => import('./LazyPanel.jsx')) 引用的组件。
//
// 和普通 import 的区别：
// - 普通 import：构建时打进主包 index-xxx.js
// - 这个文件：构建时单独打成 LazyPanel-xxx.js，只有需要时才下载
//
// 你可以把它想象成「按需取货」：仓库里先不搬过来，点了按钮再去拿。
export default function LazyPanel() {
    return <p>懒加载：点按钮后才开始下载并渲染这个组件。</p>;
}
