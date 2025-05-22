import { vi } from 'vitest'
import { getContacts, getContact } from '../data/contacts'

describe('contacts', () => {
  test('getContacts returns all contacts', () => {
    const contacts = getContacts()
    expect(contacts).toHaveLength(3)
    expect(contacts[0].name).toBe('John Doe')
    expect(contacts[1].name).toBe('Jane Smith')
    expect(contacts[2].name).toBe('Bob Johnson')
  })

  test('getContact returns a specific contact', () => {
    const contact = getContact(1)
    expect(contact.name).toBe('John Doe')
    expect(contact.email).toBe('john@example.com')
  })

  test('getContact returns undefined for non-existent id', () => {
    const contact = getContact(999)
    expect(contact).toBeUndefined()
  })
}) 