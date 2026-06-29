import { describe, it, expect } from 'vitest';
import { formatCurrency, formatCurrencyCompact } from './format';

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

describe('formatCurrencyCompact', () => {
  it('formats small amounts without abbreviation', () => {
    expect(formatCurrencyCompact(500)).toBe('UGX\u00a0500');
  });

  it('formats zero', () => {
    expect(formatCurrencyCompact(0)).toBe('UGX\u00a00');
  });

  it('formats thousands with K', () => {
    expect(formatCurrencyCompact(50000)).toBe('UGX\u00a050K');
  });

  it('formats millions with M', () => {
    expect(formatCurrencyCompact(5000000)).toBe('UGX\u00a05M');
  });

  it('formats billions with B', () => {
    expect(formatCurrencyCompact(3000000000)).toBe('UGX\u00a03B');
  });

  it('formats negative thousands', () => {
    expect(formatCurrencyCompact(-50000)).toBe('-UGX\u00a050K');
  });

  it('formats negative millions', () => {
    expect(formatCurrencyCompact(-5000000)).toBe('-UGX\u00a05M');
  });

  it('rounds to two decimals for non-round millions', () => {
    expect(formatCurrencyCompact(1500)).toBe('UGX\u00a01.5K');
    expect(formatCurrencyCompact(1234567)).toBe('UGX\u00a01.23M');
  });

  it('rounds to two decimals for non-round millions', () => {
    expect(formatCurrencyCompact(2750000)).toBe('UGX\u00a02.75M');
  });

  it('formats round millions without decimals', () => {
    expect(formatCurrencyCompact(5000000)).toBe('UGX\u00a05M');
  });

  it('formats round billions without decimals', () => {
    expect(formatCurrencyCompact(3000000000)).toBe('UGX\u00a03B');
  });
});
