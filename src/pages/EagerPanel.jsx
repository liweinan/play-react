// 被顶部普通 import 引用的组件。
//
// import EagerPanel from './EagerPanel.jsx'
// 这行代码在文件最上面，意味着：
// 1. 页面一加载，EagerPanel 的代码就已经在主 JS 包里了
// 2. 即使用户永远不看这个区块，代码也已经下载过了
export default function EagerPanel() {
    return <p>普通加载：页面打开时这个组件的代码已经在主包里了。</p>;
}
