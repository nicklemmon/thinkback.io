import { FormEvent, ReactNode } from 'react'

type FormProps = {
  children: ReactNode
  onSubmit: (e: FormEvent<HTMLFormElement>) => void
}
export function Form({ children, onSubmit }: FormProps) {
  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()

    return onSubmit(e)
  }

  return <form onSubmit={handleSubmit}>{children}</form>
}
