// @vitest-environment jsdom
import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import GlassButton from './GlassButton';

describe('GlassButton', () => {
  it('renders children', () => {
    render(<GlassButton>Click Me</GlassButton>);
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument();
  });

  it('uses subtle hover styling (hover:bg-grey-800, shadow-md)', () => {
    render(<GlassButton variant="primary">Save</GlassButton>);
    const button = screen.getByRole('button', { name: /save/i });
    expect(button.className).toContain('hover:bg-grey-800');
    expect(button.className).toContain('shadow-md');
    expect(button.className).not.toContain('hover:bg-grey-700');
    expect(button.className).not.toContain('shadow-lg');
  });

  it('renders default (glass) variant', () => {
    render(<GlassButton>Glass</GlassButton>);
    const button = screen.getByRole('button', { name: /glass/i });
    expect(button.className).toContain('bg-white/60');
    expect(button.className).toContain('hover:shadow-md');
  });

  it('renders danger variant', () => {
    render(<GlassButton variant="danger">Delete</GlassButton>);
    const button = screen.getByRole('button', { name: /delete/i });
    expect(button.className).toContain('bg-red');
  });

  it('applies disabled state', () => {
    render(<GlassButton disabled>Disabled</GlassButton>);
    const button = screen.getByRole('button', { name: /disabled/i });
    expect(button).toBeDisabled();
  });
});
