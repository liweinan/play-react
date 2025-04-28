import {useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import PriceCalculator from './PriceCalculator'
import CharacterAttributes from './CharacterAttributes'
import ItemListManager from "./ItemListManager";
import TodoList from './TodoList'
import FocusableInput from './FocusableInput'

// Create simple placeholder components for now
const Home = () => {
    const [count, setCount] = useState(0)
    return (
        <div>
            <h1>Home</h1>
            <div className="card">
                <button onClick={() => setCount((count) => count + 1)}>
                    count is {count}
                </button>
            </div>
        </div>
    )
}

const Contacts = () => {
    return (
        <div>
            <h2>Contacts</h2>
            <p>Contact list will go here</p>
        </div>
    )
}

const Forms = () => {
    return (
        <div>
            <h2>Forms</h2>
            <p>Forms will go here</p>
        </div>
    )
}

function App() {
    return (
        <div>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/contacts">Contacts</Link></li>
                    <li><Link to="/forms">Forms</Link></li>
                    <li><Link to="/calculator">Price Calculator</Link></li>
                    <li><Link to="/character">Character Attributes</Link></li>
                    <li><Link to="/todolist">Todo List</Link></li>
                    <li><Link to="/focusableinput">Focusable Input</Link></li>
                    <li><Link to="/itemListManager">Item List Manager</Link></li>
                </ul>
            </nav>

            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/contacts" element={<Contacts/>}/>
                    <Route path="/forms" element={<Forms/>}/>
                    <Route path="/calculator" element={<PriceCalculator/>}/>
                    <Route path="/character" element={<CharacterAttributes totalPoints={15}/>}/>
                    <Route path="/itemListManager" element={<ItemListManager/>}/>
                    <Route path="/todolist" element={<TodoList
                        onListClick={(event) => console.log('List clicked!')}
                        onItemClick={(item, event) => {
                            console.log(item, event);
                        }}
                    />}/>
                    <Route path="/focusableinput" element={<FocusableInput shouldFocus={true}/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App
