export const useDateFormatter = (options: Intl.DateTimeFormatOptions = {}) => {
  const baseOptions: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    ...options,
  };
  return (date: string) => {
    try {
      return new Intl.DateTimeFormat('ru-RU', baseOptions).format(
        new Date(date),
      );
    } catch (e) {
      return "";
    }
  }
}