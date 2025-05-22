import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import ChangeUsername from './ChangeUsername'

describe('ChangeUsername', () => {
  test('renders button, input field and username display', () => {
    render(<ChangeUsername />)
    expect(screen.getByRole('button', { name: 'Change Username' })).toBeInTheDocument()
    expect(screen.getByRole('textbox')).toBeInTheDocument()
    expect(screen.getByRole('heading')).toBeInTheDocument()
  })

  test('updates username when button is clicked', () => {
    render(<ChangeUsername />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    const heading = screen.getByRole('heading')
    
    fireEvent.change(input, { target: { value: 'newUsername' } })
    fireEvent.click(button)
    
    expect(heading).toHaveTextContent('newUsername')
  })

  test('handles empty input', () => {
    render(<ChangeUsername />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    const heading = screen.getByRole('heading')
    
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(button)
    
    expect(heading).toHaveTextContent('')
  })

  test('handles multiple changes', () => {
    render(<ChangeUsername />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    const heading = screen.getByRole('heading')
    
    fireEvent.change(input, { target: { value: 'first' } })
    fireEvent.click(button)
    expect(heading).toHaveTextContent('first')
    
    fireEvent.change(input, { target: { value: 'second' } })
    fireEvent.click(button)
    expect(heading).toHaveTextContent('second')
    
    fireEvent.change(input, { target: { value: 'third' } })
    fireEvent.click(button)
    expect(heading).toHaveTextContent('third')
  })

  test('trims whitespace from input', () => {
    render(<ChangeUsername />)
    const input = screen.getByRole('textbox')
    const button = screen.getByRole('button')
    const heading = screen.getByRole('heading')
    
    fireEvent.change(input, { target: { value: '  username  ' } })
    fireEvent.click(button)
    
    expect(heading).toHaveTextContent('username')
  })
}) 