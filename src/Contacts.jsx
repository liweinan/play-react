export default function Contact(props) {
    return (
        <article>
            <h3>{props.name}</h3>
            <p>{props.phone}</p>
            <p>{props.email}</p>
        </article>
    )
}

