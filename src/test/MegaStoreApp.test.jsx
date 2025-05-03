import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import PriceCalculator from '../testdome/MegaStoreApp.jsx'

describe('PriceCalculator Component', () => {
  it('renders calculator form', () => {
    render(<PriceCalculator />)
    
    // Check for form elements
    expect(screen.getByLabelText('Select Type:')).toBeInTheDocument()
    expect(screen.getByLabelText('Weight (kg):')).toBeInTheDocument()
    expect(screen.getByLabelText('Total Price ($):')).toBeInTheDocument()
    expect(screen.getByText('Discounted price:')).toBeInTheDocument()
  })

  it('calculates total price', async () => {
    const user = userEvent.setup()
    render(<PriceCalculator />)
    
    // Get inputs by their labels
    const priceInput = screen.getByLabelText('Total Price ($):')
    const weightInput = screen.getByLabelText('Weight (kg):')
    const typeSelect = screen.getByLabelText('Select Type:')
    
    // Set values
    await user.clear(priceInput)
    await user.type(priceInput, '100')
    await user.clear(weightInput)
    await user.type(weightInput, '5')
    await user.selectOptions(typeSelect, 'standard')
    
    // Check discounted price (6% discount for standard type)
    const discountedPrice = screen.getByText('94')
    expect(discountedPrice).toBeInTheDocument()
  })
}) 