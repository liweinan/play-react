import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import MyForm from '../form/MyForm'

describe('MyForm', () => {
  test('renders input fields with correct placeholders', () => {
    render(<MyForm />)
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
  })

  test('logs values when form is submitted', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm />)
    const firstNameInput = screen.getByPlaceholderText('First Name')
    const lastNameInput = screen.getByPlaceholderText('Last Name')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    
    fireEvent.change(firstNameInput, { target: { value: 'John' } })
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
    fireEvent.click(submitButton)
    
    // Check that the log contains the submitted values
    const logCalls = consoleSpy.mock.calls.flat()
    expect(logCalls.join(' ')).toContain('John')
    expect(logCalls.join(' ')).toContain('Doe')
    expect(logCalls.join(' ')).toContain('Submitting')
    consoleSpy.mockRestore()
  })
}) 