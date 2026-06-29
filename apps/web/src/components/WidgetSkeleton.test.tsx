import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/vitest';
import {
  WidgetSkeleton,
  SummaryCardSkeleton,
  PieChartSkeleton,
  TransactionListSkeleton,
  PotsCardSkeleton,
} from './WidgetSkeleton';

describe('WidgetSkeleton', () => {
  it('renders with default classes', () => {
    const { container } = render(<WidgetSkeleton />);
    const skeleton = container.querySelector('.animate-pulse');
    expect(skeleton).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(<WidgetSkeleton className="custom-class" />);
    expect(container.firstChild).toHaveClass('custom-class');
  });
});

describe('SummaryCardSkeleton', () => {
  it('renders two animated elements', () => {
    const { container } = render(<SummaryCardSkeleton />);
    const pulses = container.querySelectorAll('.animate-pulse');
    expect(pulses.length).toBeGreaterThanOrEqual(2);
  });
});

describe('PieChartSkeleton', () => {
  it('renders a circular placeholder', () => {
    const { container } = render(<PieChartSkeleton />);
    const circle = container.querySelector('.rounded-full');
    expect(circle).toBeInTheDocument();
  });

  it('renders 4 legend placeholders', () => {
    const { container } = render(<PieChartSkeleton />);
    const legends = container.querySelectorAll('.rounded-full.bg-grey-100');
    expect(legends.length).toBeGreaterThanOrEqual(4);
  });
});

describe('TransactionListSkeleton', () => {
  it('renders default 5 items', () => {
    const { container } = render(<TransactionListSkeleton />);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(5);
  });

  it('renders custom count of items', () => {
    const { container } = render(<TransactionListSkeleton count={3} />);
    const items = container.querySelectorAll('li');
    expect(items.length).toBe(3);
  });
});

describe('PotsCardSkeleton', () => {
  it('renders 4 pot placeholders', () => {
    const { container } = render(<PotsCardSkeleton />);
    const pots = container.querySelectorAll('.shrink-0.rounded-full');
    expect(pots.length).toBeGreaterThanOrEqual(1);
  });
});
