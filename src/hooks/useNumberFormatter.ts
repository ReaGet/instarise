export const useNumberFormatter = (options: Intl.NumberFormatOptions = {}) => {
  const baseOptions: Intl.NumberFormatOptions = {
    ...options
  }

  return (value: string | number) => {
    return new Intl.NumberFormat('ru-RU', baseOptions).format(Number(value));
  }
}