import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contacts from '../pages/Contacts'
import contacts, { getContact } from '../data/contacts'

// Mock the Contact components
vi.mock('../Contact', () => ({
  default: ({ name, email, phone }) => (
    <div role="listitem">{name} / {phone} / {email}</div>
  )
}))

vi.mock('../Contact2', () => ({
  default: ({ name, email, phone }) => (
    <div role="listitem">{name} / {phone} / {email}</div>
  )
}))

describe('Contacts Data Layer', () => {
  it('contacts array contains all contacts', () => {
    expect(contacts).toHaveLength(3)
    expect(contacts[0].name).toBe('John Doe')
    expect(contacts[1].name).toBe('Jane Smith')
    expect(contacts[2].name).toBe('Bob Johnson')
  })

  it('getContact returns a specific contact', () => {
    const contact = getContact(1)
    expect(contact.name).toBe('John Doe')
    expect(contact.email).toBe('john@example.com')
  })

  it('getContact returns undefined for non-existent id', () => {
    const contact = getContact(999)
    expect(contact).toBeUndefined()
  })
})

describe('Contacts Component', () => {
  it('renders contacts heading', () => {
    render(<Contacts />)
    const heading = screen.getByRole('heading', { name: 'Contacts' })
    expect(heading).toBeInTheDocument()
  })

  it('renders all contacts from data', () => {
    render(<Contacts />)
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/Jane Smith/)).toBeInTheDocument()
    expect(screen.getByText(/Bob Johnson/)).toBeInTheDocument()
  })

  it('renders hardcoded contacts', () => {
    render(<Contacts />)
    // Use more specific text to avoid conflicts with "Bob Johnson"
    expect(screen.getByText(/Johnson.*9999/)).toBeInTheDocument()
    expect(screen.getByText(/Lily/)).toBeInTheDocument()
  })

  it('renders all contact information correctly', () => {
    render(<Contacts />)
    
    // Check that contact information is displayed
    expect(screen.getByText(/john@example.com/)).toBeInTheDocument()
    expect(screen.getByText(/jane@example.com/)).toBeInTheDocument()
    expect(screen.getByText(/bob@example.com/)).toBeInTheDocument()
    expect(screen.getByText(/lily@gmail.com/)).toBeInTheDocument()
  })
}) 