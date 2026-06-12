import {useEffect, useMemo, useRef, useState} from "react";

const MyForm = ({onFormSubmit}) => { // or props.onFormSubmit
    const [formData, setFormData] = useState({
        username: '',
        email: ''
    });

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        let form = e.target;

        // console.log("username: ", form.username.value);
        // console.log("email: ", form.email.value);

        if (onFormSubmit) {
            onFormSubmit(form.username.value, form.email.value);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>用户名：</label>
                <input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="请输入用户名"
                />
            </div>
            <div>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="请输入邮箱"
                />
            </div>
            <button type="submit">提交</button>
        </form>
    );

}

const Foo = ({name, fn}) => {
    let [key, setKey] = useState(0);

    const updateKey = () => {
        setKey(key + 1);
        console.log("key: " + key);
    }

    useEffect(() => {
        console.log("Key updated!");
    }, [key]);


    const secret = useMemo(() => {
        console.log("refresh secret");
        return `S${key}`;
    }, [key]);

    const foobar = useRef(0);

    const showRef = () => {
        console.log(foobar.current.name);
        foobar.current.focus();
    }

    return (
        <div>
            Hello, {name}! / {`The ${name}`} <p/>
            <button onClick={() => fn()}>Oh Yeah!</button>
            <p/>
            <button onClick={() => updateKey()}>Update Key</button>
            <p/>
            {secret}
            <p/>
            <MyForm onFormSubmit={(name, email) => {
                console.log("got form from child: ", name, " ", email);
            }}/>

            <input name="refbar" ref={foobar}/><p/>
            <button onClick={showRef}>useRef</button>
        </div>
    );
}

export default Foo;