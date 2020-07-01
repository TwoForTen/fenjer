export const format = (input, return_currency = true) => {
  if (typeof input === 'number') input = (input / 100).toFixed(fixed(2));
  let negative = input.indexOf('-') >= 0 ? '-' : '';
  let numbers = onlyNumbers(input);
  let currency = numbersToCurrency(numbers, 2);
  let parts = toStr(currency).split('.');
  let integer = parts[0];
  let decimal = parts[1];
  integer = addThousandSeparator(integer, '.');
  return (
    negative +
    joinIntegerAndDecimal(integer, decimal, ',') +
    (return_currency ? ' HRK' : '')
  );
};
const unFormat = (input, precision) => {
  let negative = input.indexOf('-') >= 0 ? -1 : 1;
  let numbers = onlyNumbers(input);
  let currency = numbersToCurrency(numbers, precision);
  return parseFloat(currency) * negative;
};
const onlyNumbers = (input) => {
  return toStr(input).replace(/\D+/g, '') || '0';
};
const numbersToCurrency = (numbers, precision) => {
  let exp = Math.pow(10, precision);
  let float = parseFloat(numbers) / exp;
  return float.toFixed(fixed(precision));
};
const fixed = (precision) => {
  return between(0, precision, 20);
};
const toStr = (value) => {
  return value ? value.toString() : '';
};
const between = (min, n, max) => {
  return Math.max(min, Math.min(n, max));
};
const addThousandSeparator = (integer, separator) => {
  return integer.replace(/(\d)(?=(?:\d{3})+\b)/gm, `$1${separator}`);
};
const joinIntegerAndDecimal = (integer, decimal, separator) => {
  return decimal ? integer + separator + decimal : integer;
};
