import {useState} from "react";

export default function MyForm2(props) {
    const [items, setItems] = useState([])

    const itemList = items.map(item => (
        <li key={item}>{item}</li>
    ))

    const [animals, setAnimals] = useState([])

    const animalList = animals.map(animal => (
        <li key={animal}>{animal}</li>
    ))

    function handleSubmit(event) {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const foo = formData.get("foo")
        const animals = formData.getAll("animals")
        submitViaAPI({
            foo,
            animals,
        })
    }

    function submitViaAPI({foo, animals}) {
        console.log(foo)
        console.log(animals)
        console.log("Submitting via API...")
        setItems(prev => [foo])
        setAnimals(prev => animals)
    }

    return (
        <>
            <form id="my-form2" onSubmit={handleSubmit}>
                <p>
                    <input key="foo" name="foo" type="text" placeholder="Foo"/>
                </p>
                <p>
                    {itemList}
                </p>
                <fieldset>
                    <legend>Animal</legend>
                    <label>
                        <input name="animals" type="checkbox" value="cat" />
                        Cat
                    </label>
                    <label>
                        <input name="animals" type="checkbox" value="dog" />
                        Dog
                    </label>
                    <label>
                        <input name="animals" type="checkbox" value="fish" />
                        Fish
                    </label>
                </fieldset>
                <p>
                    <button type="submit">Submit</button>
                </p>
            </form>
            <p>
                {animalList}
            </p>
        </>
    )
}

