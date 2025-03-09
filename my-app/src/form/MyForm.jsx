export default function MyForm(props) {
    return (
        <form id="my-form" onSubmit={handleSubmit}>
            <p>
                <input name="firstName" type="text" placeholder="First Name"/>
            </p>
            <p>
                <input name="lastName" type="text" placeholder="Last Name"/>
            </p>
            <p>
                <button type="submit">Submit</button>
            </p>
        </form>
    )
}

function handleSubmit(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const firstName = formData.get("firstName")
    const lastName = formData.get("lastName")
    submitViaAPI({
        firstName,
        lastName,
    })
}

function submitViaAPI({firstName, lastName}) {
    console.log(firstName, lastName)
    console.log("Submitting via API...")
}