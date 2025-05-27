import { render, screen, fireEvent } from '@testing-library/react'
import ToggleMessage from '../testdome/ToggleMessage'

describe('ToggleMessage Component', () => {
  test('renders the toggle link', () => {
    render(<ToggleMessage />)
    expect(screen.getByText('Want to buy a new car?')).toBeInTheDocument()
  })

  test('toggles message visibility on click', () => {
    render(<ToggleMessage />)
    const toggleLink = screen.getByText('Want to buy a new car?')
    expect(screen.queryByText('Call +11 22 33 44 now!')).not.toBeInTheDocument()
    fireEvent.click(toggleLink)
    expect(screen.getByText('Call +11 22 33 44 now!')).toBeInTheDocument()
    fireEvent.click(toggleLink)
    expect(screen.queryByText('Call +11 22 33 44 now!')).not.toBeInTheDocument()
  })
}) 