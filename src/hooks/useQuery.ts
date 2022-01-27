import { useMemo } from 'react'
import { useLocation } from 'react-router-dom'

/** Retrieves (and returns) the current URL query string params */
export function useQuery() {
  const { search } = useLocation()

  return useMemo(() => new URLSearchParams(search), [search])
}
