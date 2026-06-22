import { createContext, useContext } from 'react';

const SecurityContext = createContext({ username: '', permissions: [] });

function LogoutWrapper() {
    const context = useContext(SecurityContext);

    return (
        <div>
            <p>{context.username}</p>
            <button type="button" value="a_button" onClick={(e) => {
                e.preventDefault();
                console.log("e.target.value: ", e.target.value);
                console.log("logged out");
            }}>Click here to logout</button>
        </div>
    );
}

export default function UseContext() {
    return (
        <div>
            <h1>UseContext 示例</h1>
            <p>不同 Provider 包裹的子树，读到不同的 context 值。</p>

            <SecurityContext.Provider value={{ username: 'James', permissions: [] }}>
                <LogoutWrapper />
            </SecurityContext.Provider>

            <SecurityContext.Provider value={{ username: 'Tom', permissions: [] }}>
                <LogoutWrapper />
            </SecurityContext.Provider>
        </div>
    );
}
