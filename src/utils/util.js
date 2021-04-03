export function formatNumber(n, minimumFractionDigits = 2, maximumFractionDigits = 2) {
  if (n === undefined || isNaN(n)) {
    return '';
  }
  return new Number(n).toLocaleString('en-US', { minimumFractionDigits, maximumFractionDigits })
}
