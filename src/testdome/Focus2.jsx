import React, { useRef, useEffect, useState } from 'react';
// import { createRoot } from 'react-dom/client';
// https://www.testdome.com/library?page=1&skillArea=48&questionId=104185

const Focus2 = ({ focused: initialFocused = false }) => {
    const inputRef = useRef(null);
    const [focused, setFocused] = useState(initialFocused);

    useEffect(() => {
        if (focused && document.activeElement !== inputRef.current) {
            inputRef.current.focus();
        }
    }, [focused]);

    const toggleFocus = () => {
        setFocused(prevFocused => !prevFocused);
    };

    return (
        <div>
            <input ref={inputRef} />
            <button onClick={toggleFocus}>
                {focused ? 'Unfocus' : 'Focus'} Input2
            </button>
        </div>
    );
};

export default Focus2;

// const App = ({ focused }) => <Focus2 focused={focused} />;

// document.body.innerHTML = "<div id='root'></div>";
// const root = createRoot(document.getElementById('root'));
// root.render(<App />);
