import { useRef, useState } from 'react';

interface UsernameProps {
    value: string;
}
const Username = ({ value }: UsernameProps) => {
    return <h1>{value}</h1>;
};

export default function NewChangeUsername() {
    // const nameRef = useRef<HTMLInputElement>(null);
    const [username, setUsername] = useState('');

    // function clickHandler() {
    //     setUsername(nameRef.current?.value ?? '');
    // }

    return (
        <div>
            <h1>New Change Username</h1>
            {/*<button type="button" onClick={clickHandler}>*/}
            {/*    Change Username*/}
            {/*</button>*/}
            <input type="text" value={username} onChange={(e) => {
                setUsername(e.target.value)
            }}/>
            <Username value={username} />
        </div>
    );
}
