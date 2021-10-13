/** Formats date expected by `input[type="date"]` */
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
