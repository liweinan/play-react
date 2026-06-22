import { useEffect, useRef, forwardRef, useState } from 'react';

const Input = ({ forwardedRef, ...otherProps }) => {
    return <input {...otherProps} ref={forwardedRef} />;
};

const TextInput = forwardRef((props, ref) => {
    console.log("forwardedRef: ", {...props})
    return <Input {...props} forwardedRef={ref} />;
});

function FocusableInput({ focused }) {
    const ref = useRef(null);

    useEffect(() => {
        if (focused === true) {
            ref.current?.focus();
        }
    }, [focused]);

    return <TextInput ref={ref} />;
}

export default function NewFocus() {
    const [focused, setFocused] = useState(false);

    return (
        <div>
            <h1>New Focus</h1>
            <FocusableInput focused={focused} />
            <button type="button" onClick={() => setFocused((f) => !f)}>
                {focused ? 'Unfocus' : 'Focus'} Input
            </button>
        </div>
    );
}
