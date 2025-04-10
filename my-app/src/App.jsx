import {useState} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Contact from "./Contact.jsx";
import Contact2 from "./Contact2.jsx";
import data from "./data/contacts.js"
import MyForm from "./form/MyForm.jsx";
import MyForm2 from "./form/MyForm2.jsx";
import PriceCalculator from './PriceCalculator.jsx'
import CharacterAttributes from './CharacterAttributes.jsx';

function App() {
    const [count, setCount] = useState(0)
    // can't destruct like this: const {count, setCount} = useState(0)

    const contacts = data.map((item) => {
        return (
            <Contact key={item.id} name={item.name} email={item.email} phone={item.phone}/>
        )
    })

    const lily = {
        name: "Lily",
        email: "lily@gmail.com",
        phone: "12345678",
    }

    console.log(contacts);

    return (
        <>
            <div>
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo" alt="Vite logo"/>
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo react" alt="React logo"/>
                </a>
            </div>
            <h1>Vite + React</h1>
            <div className="card">
                <button onClick={() => setCount((cnt) => cnt + 1)}>
                    count is {count}
                </button>
                <CharacterAttributes totalPoints={15}/>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
                <Contact key="0" name="Johnson" email="johnson@gmail.com" phone="9999"/>
                {contacts}
                <Contact2 {...lily}/>
            </div>
            <p className="read-the-docs">
                Click on the Vite and React logos to learn more
            </p>
            <MyForm/>
            <MyForm2/>
            <PriceCalculator/>
        </>
    )
}

export default App
