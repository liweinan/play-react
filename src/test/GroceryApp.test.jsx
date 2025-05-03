import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import GroceryApp from '../testdome/GroceryApp.jsx'

describe('GroceryApp Component', () => {
  const mockProducts = [
    { name: 'Oranges', votes: 0 },
    { name: 'Bananas', votes: 0 }
  ]

  const findProductElement = (name) => {
    const items = screen.getAllByRole('listitem')
    return items.find(item => within(item).queryByText(name))
  }

  it('renders initial products with correct votes', () => {
    render(<GroceryApp products={mockProducts} />)
    
    // Check if products are rendered with correct votes
    const orangesItem = findProductElement('Oranges')
    const bananasItem = findProductElement('Bananas')
    
    expect(within(orangesItem).getByText('votes: 0')).toBeInTheDocument()
    expect(within(bananasItem).getByText('votes: 0')).toBeInTheDocument()
  })

  it('increments vote count when upvote button is clicked', async () => {
    const user = userEvent.setup()
    render(<GroceryApp products={mockProducts} />)
    
    // Find and click the upvote button for Oranges
    const orangesItem = findProductElement('Oranges')
    const buttons = within(orangesItem).getAllByRole('button')
    const upvoteButton = buttons.find(button => button.textContent === '+')
    await user.click(upvoteButton)
    
    // Check if vote count increased for Oranges
    expect(within(orangesItem).getByText('votes: 1')).toBeInTheDocument()
  })

  it('decrements vote count when downvote button is clicked', async () => {
    const user = userEvent.setup()
    render(<GroceryApp products={mockProducts} />)
    
    // Find and click the downvote button for Bananas
    const bananasItem = findProductElement('Bananas')
    const buttons = within(bananasItem).getAllByRole('button')
    const downvoteButton = buttons.find(button => button.textContent === '-')
    await user.click(downvoteButton)
    
    // Check if vote count decreased for Bananas
    expect(within(bananasItem).getByText('votes: -1')).toBeInTheDocument()
  })

  it('handles multiple votes on the same product', async () => {
    const user = userEvent.setup()
    render(<GroceryApp products={mockProducts} />)
    
    // Find buttons for Oranges
    const orangesItem = findProductElement('Oranges')
    const buttons = within(orangesItem).getAllByRole('button')
    const upvoteButton = buttons.find(button => button.textContent === '+')
    const downvoteButton = buttons.find(button => button.textContent === '-')
    
    // Upvote twice
    await user.click(upvoteButton)
    await user.click(upvoteButton)
    
    // Check if vote count is 2
    expect(within(orangesItem).getByText('votes: 2')).toBeInTheDocument()
    
    // Downvote once
    await user.click(downvoteButton)
    
    // Check if vote count is 1
    expect(within(orangesItem).getByText('votes: 1')).toBeInTheDocument()
  })
}) 