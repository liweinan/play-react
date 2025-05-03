import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import MyForm from './MyForm'

describe('MyForm', () => {
  test('renders form with inputs and submit button', () => {
    render(<MyForm />)
    
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  test('handles form submission', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm />)
    
    const firstNameInput = screen.getByPlaceholderText('First Name')
    const lastNameInput = screen.getByPlaceholderText('Last Name')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await act(async () => {
      fireEvent.change(firstNameInput, { target: { value: 'John' } })
      fireEvent.change(lastNameInput, { target: { value: 'Doe' } })
      fireEvent.click(submitButton)
    })

    expect(consoleSpy).toHaveBeenCalledWith('John', 'Doe')
    expect(consoleSpy).toHaveBeenCalledWith('Submitting via API...')
    
    // Verify form is reset
    expect(firstNameInput.value).toBe('')
    expect(lastNameInput.value).toBe('')
    
    consoleSpy.mockRestore()
  })
}) 