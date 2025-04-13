import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('App Component', () => {
  it('renders navigation links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    const navLinks = screen.getAllByRole('link')
    expect(navLinks).toHaveLength(5) // Home, Contacts, Forms, Calculator, Character
    
    expect(screen.getByRole('link', { name: 'Home' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Contacts' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Forms' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Price Calculator' })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: 'Character Attributes' })).toBeInTheDocument()
  })
}) 