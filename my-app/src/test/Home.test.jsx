import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Home from '../pages/Home'

describe('Home Component', () => {
  it('renders headline', () => {
    render(<Home />)
    const heading = screen.getByRole('heading', { name: 'Vite + React' })
    expect(heading).toBeInTheDocument()
  })

  it('counter increments on click', async () => {
    const user = userEvent.setup()
    render(<Home />)
    const button = screen.getByRole('button', { name: /count is 0/i })
    
    await user.click(button)
    expect(button).toHaveTextContent('count is 1')
  })

  it('renders read the docs text', () => {
    render(<Home />)
    const text = screen.getByText(/Click on the Vite and React logos to learn more/i)
    expect(text).toBeInTheDocument()
  })
}) 