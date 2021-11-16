import { FormEvent, ReactNode, RefObject, useEffect, useRef } from 'react'

type FormProps = {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
  shouldReset?: boolean
}
export function Form({ children, onSubmit, shouldReset = false }: FormProps) {
  const formRef: RefObject<HTMLFormElement> | null = useRef(null)

  // Reset the form using native DOM APIs if `shouldReset` is true
  useEffect(() => {
    if (shouldReset) {
      return formRef.current?.reset()
    }
  }, [shouldReset])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    return onSubmit(e)
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      {children}
    </form>
  )
}
