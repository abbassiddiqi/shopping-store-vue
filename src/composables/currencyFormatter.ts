export const useCurrencyFormatter = (locale = 'en-US', currency = 'USD') => {
  return {
    format: (value: number, fractionDigits = 0) => {
      return value.toLocaleString(locale, {
        style: 'currency',
        minimumFractionDigits: fractionDigits,
        maximumFractionDigits: fractionDigits,
        currency: currency
      });
    }
  }
}