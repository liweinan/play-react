export default function MyForm(props) {

    function handleSubmit(event) {
        event.preventDefault()
        const formEl = event.currentTarget
        const formData = new FormData(formEl)
        const firstName = formData.get("firstName")
        const lastName = formData.get("lastName")
        submitViaAPI({
            firstName,
            lastName,
        })
        formEl.reset()
    }

    function submitViaAPI({firstName, lastName}) {
        console.log(firstName, lastName)
        console.log("Submitting via API...")
    }

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
