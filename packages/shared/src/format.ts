import { CURRENCY_CONFIG } from './constants';

const currencyFormatter = new Intl.NumberFormat(CURRENCY_CONFIG.locale, {
  style: 'currency',
  currency: CURRENCY_CONFIG.currency,
  currencyDisplay: CURRENCY_CONFIG.currencyDisplay,
  minimumFractionDigits: CURRENCY_CONFIG.minimumFractionDigits,
  maximumFractionDigits: CURRENCY_CONFIG.maximumFractionDigits,
});

export function formatCurrency(amount: number): string {
  return currencyFormatter.format(amount);
}

export function formatCurrencyCompact(amount: number): string {
  const abs = Math.abs(amount);
  const sign = amount < 0 ? '-' : '';

  if (abs >= 1_000_000_000) {
    const val = abs / 1_000_000_000;
    const formatted = val % 1 === 0 ? val.toFixed(0) : val.toFixed(2);
    return `${sign}${CURRENCY_CONFIG.currency}\u00a0${formatted}B`;
  }

  if (abs >= 1_000_000) {
    const val = abs / 1_000_000;
    const formatted = val % 1 === 0 ? val.toFixed(0) : val.toFixed(2);
    return `${sign}${CURRENCY_CONFIG.currency}\u00a0${formatted}M`;
  }

  if (abs >= 1_000) {
    const val = abs / 1_000;
    const formatted = val % 1 === 0 ? val.toFixed(0) : val.toFixed(1);
    return `${sign}${CURRENCY_CONFIG.currency}\u00a0${formatted}K`;
  }

  return formatCurrency(amount);
}

export function getCurrencyConfig() {
  return { ...CURRENCY_CONFIG };
}
