// https://www.testdome.com/library?page=1&skillArea=48&questionId=106622

import React, { useRef } from 'react';
// import { createRoot } from 'react-dom/client';

class Username extends React.Component {
    state = { value: "" };

    changeValue(value) {
        this.setState({ value });
    }

    render() {
        const { value } = this.state;
        return <h1>{value}</h1>;
    }
}

export default function ChangeUsername() {
    const inputRef = useRef(null);
    const usernameRef = useRef(null);

    function clickHandler() {
        if (inputRef.current && usernameRef.current) {
            usernameRef.current.changeValue(inputRef.current.value);
        }
    }

    return (
        <div>
            <button onClick={clickHandler}>Change Username</button>
            <input type="text" ref={inputRef} />
            <Username ref={usernameRef} />
        </div>
    );
}

// document.body.innerHTML = "<div id='root'></div>";
// const root = createRoot(document.getElementById("root"));
// root.render(<App />);
//
// setTimeout(() => {
//     document.querySelector("input").value = "John Doe";
//     document.querySelector("button").click();
//
//     setTimeout(() => {
//         console.log(document.getElementById("root").innerHTML);
//     }, 300);
// }, 300);