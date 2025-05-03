import contacts from './contacts'

describe('contacts data', () => {
  test('should export an array of contacts', () => {
    expect(Array.isArray(contacts)).toBe(true)
    expect(contacts.length).toBe(3)
  })

  test('each contact should have required properties', () => {
    contacts.forEach(contact => {
      expect(contact).toHaveProperty('id')
      expect(contact).toHaveProperty('name')
      expect(contact).toHaveProperty('email')
      expect(contact).toHaveProperty('phone')
    })
  })

  test('contacts should have unique ids', () => {
    const ids = contacts.map(contact => contact.id)
    const uniqueIds = new Set(ids)
    expect(ids.length).toBe(uniqueIds.size)
  })
}) 