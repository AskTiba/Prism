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

export function getCurrencyConfig() {
  return { ...CURRENCY_CONFIG };
}
