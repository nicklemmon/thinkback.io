import { useEffect } from 'react'

export function ThrowErrorPage() {
  useEffect(() => {
    throw new Error('This page intentionally throws an error.')
  }, [])

  return <h1>This component will throw an error</h1>
}
