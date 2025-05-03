import {useEffect, useRef} from "react";

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