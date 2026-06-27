// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect, vi, afterEach } from 'vitest';
import { render, screen, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import SubmitButton from './SubmitButton';
import { useFormStatus } from 'react-dom';

vi.mock('react-dom', async () => {
  const actual = await vi.importActual<any>('react-dom');
  return {
    ...actual,
    useFormStatus: vi.fn(),
  };
});

describe('SubmitButton', () => {
  afterEach(cleanup);
  
  it('renders children and is not disabled when pending is false', () => {
    vi.mocked(useFormStatus).mockReturnValue({ pending: false } as any);
    render(<SubmitButton>Sign In</SubmitButton>);
    
    const button = screen.getByRole('button', { name: /sign in/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toBeDisabled();
    expect(screen.queryByTestId('loading-spinner')).not.toBeInTheDocument();
  });

  it('renders loading spinner, disables button, and hides children when pending is true', () => {
    vi.mocked(useFormStatus).mockReturnValue({ pending: true } as any);
    render(<SubmitButton>Sign In</SubmitButton>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    expect(screen.getByTestId('loading-spinner')).toBeInTheDocument();
    expect(screen.queryByText('Sign In')).not.toBeInTheDocument();
  });
});
