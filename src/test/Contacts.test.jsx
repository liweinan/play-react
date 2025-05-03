import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import Contacts from '../pages/Contacts'

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

// Mock the contacts data
vi.mock('../data/contacts.js', () => ({
  default: [
    {
      id: 1,
      name: "Tom",
      email: "tom@gmail.com",
      phone: "0123456789",
    },
    {
      id: 2,
      name: "John Doe",
      email: "john@gmail.com",
      phone: "0123456789",
    },
    {
      id: 3,
      name: "Lucy",
      email: "lucy@gmail.com",
      phone: "0123456789",
    }
  ]
}))

describe('Contacts Component', () => {
  it('renders contacts heading', () => {
    render(<Contacts />)
    const heading = screen.getByRole('heading', { name: 'Contacts' })
    expect(heading).toBeInTheDocument()
  })

  it('renders all contacts', () => {
    render(<Contacts />)
    expect(screen.getByText(/Tom/)).toBeInTheDocument()
    expect(screen.getByText(/John Doe/)).toBeInTheDocument()
    expect(screen.getByText(/Lucy/)).toBeInTheDocument()
    expect(screen.getByText(/Johnson/)).toBeInTheDocument()
    expect(screen.getByText(/Lily/)).toBeInTheDocument()
  })
}) 