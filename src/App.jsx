import {useState} from 'react'
import {Routes, Route, Link} from 'react-router-dom'
import './App.css'
import PriceCalculator from './testdome/MegaStoreApp.jsx'
import CharacterAttributes from './testdome/CharacterAttributes'
import ItemListManager from "./hackerrank/ItemListManager.jsx";
import TodoList from './testdome/TodoList'
import FocusableInput from './testdome/FocusableInput'
import LogoutWrapper from "./testdome/LogoutWrapper.jsx";
import GroceryApp from "./testdome/GroceryApp.jsx";
import Contact from './pages/Contact'
import Contact2 from './pages/Contact2'
import Patient from './hackerrank/patient/App.jsx'
import ChangeUsername from "./testdome/ChangeUsername.jsx";
import ToggleMessage from "./testdome/ToggleMessage.jsx";

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
                    <li><Link to="/calculator">Mega Store App</Link></li>
                    <li><Link to="/character">Character Attributes</Link></li>
                    <li><Link to="/todolist">Todo List</Link></li>
                    <li><Link to="/focusableinput">Focusable Input</Link></li>
                    <li><Link to="/itemListManager">Item List Manager</Link></li>
                    <li><Link to="/logoutwrapper">Logout Wrapper</Link></li>
                    <li><Link to="/groceryapp">Grocery App</Link></li>
                    <li><Link to='/patient'>Patient</Link></li>
                    <li><Link to='/changeusername'>Change Username</Link></li>
                    <li><Link to='/togglemessage'>Toggle Message</Link></li>
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
                        onListClick={() => console.log('List clicked!')}
                        onItemClick={(item, event) => {
                            console.log(item, event);
                        }}
                    />}/>
                    <Route path="/focusableinput" element={<FocusableInput shouldFocus={true}/>}/>
                    <Route path="/logoutwrapper" element={<LogoutWrapper username="James"/>}/>
                    <Route path="/groceryapp" element={<GroceryApp products={[
                        {name: "Oranges", votes: 0},
                        {name: "Bananas", votes: 0}
                    ]}/>}/>
                    <Route path="/contact" element={<Contact/>}/>
                    <Route path="/contact2" element={<Contact2/>}/>
                    <Route path="/patient" element={<Patient/>}/>
                    <Route path="/changeusername" element={<ChangeUsername/>}></Route>
                    <Route path="/togglemessage" element={<ToggleMessage/>}/>
                </Routes>
            </main>
        </div>
    )
}

export default App
