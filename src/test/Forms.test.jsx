import { render, screen } from '@testing-library/react'
import Forms from '../pages/Forms'

describe('Forms', () => {
  test('renders MyForm and MyForm2 components', () => {
    render(<Forms />)
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Foo')).toBeInTheDocument()
  })
}) 