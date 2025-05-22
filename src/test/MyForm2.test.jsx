import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import MyForm2 from '../form/MyForm2'

describe('MyForm2', () => {
  test('renders input field with correct placeholder', () => {
    render(<MyForm2 />)
    expect(screen.getByPlaceholderText('Foo')).toBeInTheDocument()
  })

  test('logs value when form is submitted', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm2 />)
    const input = screen.getByPlaceholderText('Foo')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.change(input, { target: { value: 'newFoo' } })
    fireEvent.click(submitButton)
    const logCalls = consoleSpy.mock.calls.flat()
    expect(logCalls.join(' ')).toContain('newFoo')
    expect(logCalls.join(' ')).toContain('Submitting')
    consoleSpy.mockRestore()
  })

  test('logs empty value when form is submitted with empty input', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm2 />)
    const input = screen.getByPlaceholderText('Foo')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.change(input, { target: { value: '' } })
    fireEvent.click(submitButton)
    const logCalls = consoleSpy.mock.calls.flat()
    expect(logCalls.join(' ')).toContain('Submitting')
    consoleSpy.mockRestore()
  })

  test('handles multiple form submissions', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm2 />)
    const input = screen.getByPlaceholderText('Foo')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.change(input, { target: { value: 'first' } })
    fireEvent.click(submitButton)
    fireEvent.change(input, { target: { value: 'second' } })
    fireEvent.click(submitButton)
    fireEvent.change(input, { target: { value: 'third' } })
    fireEvent.click(submitButton)
    const logCalls = consoleSpy.mock.calls.flat()
    expect(logCalls.join(' ')).toContain('first')
    expect(logCalls.join(' ')).toContain('second')
    expect(logCalls.join(' ')).toContain('third')
    consoleSpy.mockRestore()
  })

  test('trims whitespace from input on form submission', () => {
    const consoleSpy = vi.spyOn(console, 'log')
    render(<MyForm2 />)
    const input = screen.getByPlaceholderText('Foo')
    const submitButton = screen.getByRole('button', { name: 'Submit' })
    fireEvent.change(input, { target: { value: '  foo  ' } })
    fireEvent.click(submitButton)
    const logCalls = consoleSpy.mock.calls.flat()
    expect(logCalls.join(' ')).toContain('foo')
    consoleSpy.mockRestore()
  })
}) 