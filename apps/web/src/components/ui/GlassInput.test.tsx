// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import GlassInput from './GlassInput';
import '@testing-library/jest-dom/vitest';

describe('GlassInput', () => {
  it('renders correctly', () => {
    render(<GlassInput placeholder="Test Input" />);
    expect(screen.getByPlaceholderText('Test Input')).toBeInTheDocument();
  });

  it('toggles password visibility when type is password', async () => {
    const user = userEvent.setup();
    render(<GlassInput type="password" placeholder="Password" />);
    
    const input = screen.getByPlaceholderText('Password');
    expect(input).toHaveAttribute('type', 'password');

    const toggleButton = screen.getByRole('button', { name: /toggle password visibility/i });
    await user.click(toggleButton);
    
    expect(input).toHaveAttribute('type', 'text');

    await user.click(toggleButton);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('renders error state when error prop is provided', () => {
    render(<GlassInput placeholder="Error Input" error="Invalid field" />);
    
    const input = screen.getByPlaceholderText('Error Input');
    expect(input).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Invalid field')).toBeInTheDocument();
  });
});
