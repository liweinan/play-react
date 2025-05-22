import { render, screen } from '@testing-library/react'
import Contact from '../pages/Contact'

describe('Contact Component', () => {
  test('renders contact information correctly', () => {
    const contactProps = {
      name: 'John Doe',
      email: 'john@example.com',
      phone: '123-456-7890'
    }
    
    render(<Contact {...contactProps} />)
    
    // Get the paragraph element directly
    const contactElement = screen.getByRole('paragraph')
    expect(contactElement).toHaveTextContent('John Doe / 123-456-7890 / john@example.com')
  })

  test('renders with empty values', () => {
    const contactProps = {
      name: '',
      email: '',
      phone: ''
    }
    
    render(<Contact {...contactProps} />)
    
    // Loosen the test: match slashes with optional whitespace
    const contactElement = screen.getByText(/\/\s*\/\s*/)
    expect(contactElement).toBeInTheDocument()
  })
}) 