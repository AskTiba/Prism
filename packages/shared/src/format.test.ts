import { describe, it, expect } from 'vitest';
import { formatCurrency } from './format';

describe('formatCurrency', () => {
  it('formats whole number in UGX', () => {
    expect(formatCurrency(1500)).toBe('UGX\u00a01,500');
  });

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('UGX\u00a00');
  });

  it('formats negative amount', () => {
    expect(formatCurrency(-50000)).toBe('-UGX\u00a050,000');
  });

  it('formats large number with commas', () => {
    expect(formatCurrency(1_000_000)).toBe('UGX\u00a01,000,000');
  });

  it('rounds to zero decimal places', () => {
    expect(formatCurrency(1234.56)).toBe('UGX\u00a01,235');
  });

  it('rounds down', () => {
    expect(formatCurrency(1234.3)).toBe('UGX\u00a01,234');
  });

  it('formats negative with rounding', () => {
    expect(formatCurrency(-999.5)).toBe('-UGX\u00a01,000');
  });
});
