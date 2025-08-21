import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import FancyButton from '../pages/FancyButton.jsx';

describe('FancyButton', () => {
  it('renders with default props', () => {
    render(<FancyButton>Click me</FancyButton>);
    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('text-base');
  });

  it('renders large button when large prop is true', () => {
    render(<FancyButton large={true}>Large Button</FancyButton>);
    const button = screen.getByRole('button', { name: /large button/i });
    expect(button).toHaveClass('text-3xl');
  });

  it('renders with different variants', () => {
    const { rerender } = render(<FancyButton variant="primary">Primary</FancyButton>);
    let button = screen.getByRole('button', { name: /primary/i });
    expect(button).toHaveClass('bg-blue-600');

    rerender(<FancyButton variant="success">Success</FancyButton>);
    button = screen.getByRole('button', { name: /success/i });
    expect(button).toHaveClass('bg-green-600');

    rerender(<FancyButton variant="outline">Outline</FancyButton>);
    button = screen.getByRole('button', { name: /outline/i });
    expect(button).toHaveClass('bg-transparent');
  });

  it('applies hover and focus styles', () => {
    render(<FancyButton>Test Button</FancyButton>);
    const button = screen.getByRole('button', { name: /test button/i });
    expect(button).toHaveClass('hover:scale-105');
    expect(button).toHaveClass('focus:outline-none');
    expect(button).toHaveClass('focus:ring-2');
  });
});
