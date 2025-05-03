import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import App from '../App'

describe('App Component', () => {
  it('renders essential navigation links', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    )
    
    // Check for essential navigation links
    const essentialLinks = [
      'Home',
      'Contacts',
      'Forms',
      'Price Calculator',
      'Character Attributes',
      'Todo List',
      'Focusable Input',
      'Item List Manager'
    ]
    
    essentialLinks.forEach(linkText => {
      expect(screen.getByRole('link', { name: linkText })).toBeInTheDocument()
    })
    
    // Verify that there are navigation links present
    const navLinks = screen.getAllByRole('link')
    expect(navLinks.length).toBeGreaterThanOrEqual(essentialLinks.length)
  })
}) 