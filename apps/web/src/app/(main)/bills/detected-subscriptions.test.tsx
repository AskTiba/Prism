import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { DetectedSubscriptions } from './detected-subscriptions';
import '@testing-library/jest-dom/vitest';

vi.mock('@/lib/trpc', () => ({
  trpc: {
    data: {
      detectedSubscriptions: {
        useQuery: () => ({
          data: [
            { name: 'Netflix', amount: 15.99, interval: 'monthly', nextDate: '2024-09-15' },
            { name: 'Spotify', amount: 9.99, interval: 'monthly', nextDate: '2024-09-10' },
          ],
        }),
      },
    },
  },
}));

describe('DetectedSubscriptions', () => {
  it('renders the heading', () => {
    render(<DetectedSubscriptions />);
    expect(screen.getByText(/detected subscriptions/i)).toBeInTheDocument();
  });

  it('renders detected subscription names and amounts', () => {
    render(<DetectedSubscriptions />);
    expect(screen.getByText('Netflix')).toBeInTheDocument();
    expect(screen.getByText('Spotify')).toBeInTheDocument();
    expect(screen.getByText(/UGX\s*16/)).toBeInTheDocument();
    expect(screen.getByText(/UGX\s*10/)).toBeInTheDocument();
  });

  it('renders next dates', () => {
    render(<DetectedSubscriptions />);
    expect(screen.getByText(/sep 15/i)).toBeInTheDocument();
    expect(screen.getByText(/sep 10/i)).toBeInTheDocument();
  });
});
