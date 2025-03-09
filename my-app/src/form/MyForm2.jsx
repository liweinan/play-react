export default function MyForm2(props) {
    return (
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
    )
}


function handleAction(formData) {
    const foo = formData.get("foo")
    const bar = formData.get("bar")
    console.log(foo)
    console.log(bar)
    submitViaAPI({
        foo,
        bar,
    })
}

function submitViaAPI({firstName, lastName}) {
    console.log(firstName, lastName)
    console.log("Submitting via API...")
}