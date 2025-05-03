import Contact from "./Contact"
import Contact2 from "./Contact2"
import data from "../data/contacts.js"

export default function Contacts() {
  const contacts = data.map((item) => (
    <Contact 
      key={item.id} 
      name={item.name} 
      email={item.email} 
      phone={item.phone}
    />
  ))
  
  const lily = {
    name: "Lily",
    email: "lily@gmail.com",
    phone: "12345678",
  }

  return (
    <div>
      <h2>Contacts</h2>
      <div className="contacts-container">
        <Contact 
          key="0" 
          name="Johnson" 
          email="johnson@gmail.com" 
          phone="9999"
        />
        {contacts}
        <Contact2 {...lily}/>
      </div>
    </div>
  )
} 