/**
 * Converts JS date to SQLite date.
 * @param date Date.
 */
export function convertJsDateToSqLiteDate(date: Date): string {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1)
    .toString()
    .padStart(2, '0');
  const day = date.getDate()
    .toString()
    .padStart(2, '0');
  const hours = date.getHours()
    .toString()
    .padStart(2, '0');
  const minutes = date.getMinutes()
    .toString()
    .padStart(2, '0');

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}

/**
 * Converts SQLite date to JS date.
 * @param dateString Date.
 */
export function convertSqLiteDateToJsDate(dateString: string): Date {
  return new Date(dateString);
}
