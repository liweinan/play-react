import {useState} from "react";



export default function MyForm2(props) {
    const [items, setItems] = useState([])

    const itemList = items.map(item => (
        <li key={item}>{item}</li>
    ))

    function handleAction(formData) {
        const foo = formData.get("foo")
        const bar = formData.get("bar")
        submitViaAPI({
            foo,
            bar,
        })
    }

    function submitViaAPI({foo, bar}) {
        console.log(foo, bar)
        console.log("Submitting via API...")
        setItems(prev => [...prev, foo, bar])
    }

    return (
        <>
            <form id="my-form2" action={handleAction}>
                <p>
                    <input name="foo" type="text" placeholder="Foo"/>
                </p>
                <p>
                    <input name="bar" type="text" placeholder="Bar"/>
                </p>
                <p>
                    <button type="submit">Submit</button>
                </p>
            </form>
            <p>
                {itemList}
            </p>
        </>
    )
}

