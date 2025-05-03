import { render, screen } from '@testing-library/react'
import Forms from './Forms'

describe('Forms', () => {
  test('renders Forms page with both form components', () => {
    render(<Forms />)
    
    expect(screen.getByRole('heading', { name: 'Forms' })).toBeInTheDocument()
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Foo')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Cat' })).toBeInTheDocument()
  })
}) 