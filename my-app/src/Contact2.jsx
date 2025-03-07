export default function Contact2(props) {
    return (
        <>
            <p>
                {props.entry.name} / {props.entry.phone} / {props.entry.email}
            </p>
        </>
    )
}