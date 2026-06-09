const Foo = ({name, fn}) => {return (
        <div>
            Hello, {name}! / {`The ${name}`} <p/>
            <button onClick={() => fn()}>Oh Yeah!</button>
        </div>
    );
}

export default Foo;