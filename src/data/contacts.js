export const getContacts = () => [
    { id: 1, name: 'John Doe', email: 'john@example.com', phone: '123-456-7890' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', phone: '098-765-4321' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', phone: '555-555-5555' }
]

export const getContact = (id) => getContacts().find(contact => contact.id === id)