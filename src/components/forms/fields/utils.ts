export const handleNumberValue = (value: number | string) => {
  value = Number(value);
  if (Number.isNaN(value) || value < 1) return 1;
  return value;
}