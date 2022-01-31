/** Formats dates legibly */
export function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US')
}

/**
 * Formats date expected by `input[type="date"]`
 * @returns {string} formatted date string in YYYY-MM-DD format
 */
export function toDateInput(date: Date): string {
  const month = date.getMonth() + 1
  const day = date.getDate()
  const mm = month < 10 ? `0${month}` : month
  const dd = day < 10 ? `0${day}` : day

  return `${date.getFullYear()}-${mm}-${dd}`
}

/**
 * Returns a date from a YYYY-MM-DD formatted date string as expected by `input[type="date"]`
 * @param dateStr YYYY-MM-DD formatted date
 */
export function fromDateInput(dateStr: string): Date {
  const parts = dateStr.split('-')
  const [year, month, day] = parts

  return new Date(parseInt(year), parseInt(month) - 1, parseInt(day))
}
