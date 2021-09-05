/**
 * @description Returns unique identifier
 * @see {@link https://stackoverflow.com/a/2117523/3330688}
 */
export function uuid(): string {
  return (1e7 + -1e3 + -4e3 + -8e3 + -1e11)
    .toString()
    .replace(/[018]/g, c =>
      (
        Number(c) ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (Number(c) / 4)))
      ).toString(16),
    )
}
