import {useEffect, useRef} from "react";
// https://www.testdome.com/library?page=1&skillArea=48&questionId=111114
export default function FocusableInput({shouldFocus}) {
    const inputRef = useRef(null);

    useEffect(() => {
        console.log("shouldFocus: ", shouldFocus);
        if (shouldFocus && inputRef.current) {
            console.log(inputRef.current, ": set focus");
            inputRef.current.focus();
        }
    }, [shouldFocus]);

    return <input ref={inputRef}/>;
}