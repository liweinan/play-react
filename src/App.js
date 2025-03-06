import React from 'react';
import Contact from "./Contacts";

const App = () => {
    return (
        <div>
            <h1>React Project</h1>
            <p><Contact name="Johnson" email="johnson@gmail.com" phone="9999"/></p>
        </div>
    );
}

const john = {
    name: "John",
    phone: "0123456789",
    email: "john@gmail.com",
}


export default App;