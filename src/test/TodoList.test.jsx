import { render, screen, fireEvent } from '@testing-library/react'
import { vi } from 'vitest'
import TodoList from '../testdome/TodoList'

describe('TodoList', () => {
  test('renders all todo items', () => {
    render(<TodoList onListClick={() => {}} onItemClick={() => {}} />)
    expect(screen.getByText('Buy grocery')).toBeInTheDocument()
    expect(screen.getByText('Play guitar')).toBeInTheDocument()
    expect(screen.getByText('Romantic dinner')).toBeInTheDocument()
  })

  test('calls onItemClick when clicking an undone item', () => {
    const onItemClick = vi.fn()
    render(<TodoList onListClick={() => {}} onItemClick={onItemClick} />)
    
    fireEvent.click(screen.getByText('Play guitar'))
    expect(onItemClick).toHaveBeenCalledTimes(1)
    expect(onItemClick.mock.calls[0][0]).toEqual({ text: 'Play guitar', done: false })
  })

  test('does not call onItemClick when clicking a done item', () => {
    const onItemClick = vi.fn()
    render(<TodoList onListClick={() => {}} onItemClick={onItemClick} />)
    
    fireEvent.click(screen.getByText('Buy grocery'))
    expect(onItemClick).not.toHaveBeenCalled()
  })

  test('calls onListClick when clicking the list', () => {
    const onListClick = vi.fn()
    render(<TodoList onListClick={onListClick} onItemClick={() => {}} />)
    
    fireEvent.click(screen.getByRole('list'))
    expect(onListClick).toHaveBeenCalledTimes(1)
  })
}) 