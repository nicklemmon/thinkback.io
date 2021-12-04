/** Formats dates legibly */
export function formatDate(date: Date): string {
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
}

/** Formats date expected by `input[type="date"]` */
export function formatInputDate(date: Date): string {
  return date.toISOString().split('T')[0]
}
