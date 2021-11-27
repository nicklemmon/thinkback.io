import { Kid } from 'src/types'

/** Returns the matching kid by its ID */
export function getKidById(
  kids: Parse.Object<Kid>[] | [],
  id: string,
): Parse.Object<Kid> | undefined {
  return kids.find(kid => kid.id === id)
}
