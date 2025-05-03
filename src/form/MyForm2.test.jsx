import { render, screen, fireEvent } from '@testing-library/react'
import { act } from 'react-dom/test-utils'
import { vi } from 'vitest'
import MyForm2 from './MyForm2'

describe('MyForm2', () => {
  test('renders form with inputs and checkboxes', () => {
    render(<MyForm2 />)
    
    expect(screen.getByPlaceholderText('Foo')).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Cat' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Dog' })).toBeInTheDocument()
    expect(screen.getByRole('checkbox', { name: 'Fish' })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Submit' })).toBeInTheDocument()
  })

  test('handles form submission with text input', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm2 />)
    
    const fooInput = screen.getByPlaceholderText('Foo')
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await act(async () => {
      fireEvent.change(fooInput, { target: { value: 'test value' } })
      fireEvent.click(submitButton)
    })

    expect(consoleSpy).toHaveBeenCalledWith('test value')
    expect(consoleSpy).toHaveBeenCalledWith([])
    expect(consoleSpy).toHaveBeenCalledWith('Submitting via API...')
    
    // Verify items list is updated
    expect(screen.getByText('test value')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })

  test('handles form submission with checkboxes', async () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm2 />)
    
    const catCheckbox = screen.getByRole('checkbox', { name: 'Cat' })
    const dogCheckbox = screen.getByRole('checkbox', { name: 'Dog' })
    const submitButton = screen.getByRole('button', { name: 'Submit' })

    await act(async () => {
      fireEvent.click(catCheckbox)
      fireEvent.click(dogCheckbox)
      fireEvent.click(submitButton)
    })

    expect(consoleSpy).toHaveBeenCalledWith('')
    expect(consoleSpy).toHaveBeenCalledWith(['cat', 'dog'])
    expect(consoleSpy).toHaveBeenCalledWith('Submitting via API...')
    
    // Verify animals list is updated
    expect(screen.getByText('cat')).toBeInTheDocument()
    expect(screen.getByText('dog')).toBeInTheDocument()
    
    consoleSpy.mockRestore()
  })
}) 