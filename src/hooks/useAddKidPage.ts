import { useMachine } from '@xstate/react'
import { addKidPageMachine } from 'src/machines'
import { useToast } from 'src/hooks'

export function useAddKidPage() {
  const { showToast } = useToast()
  const machine = addKidPageMachine(showToast)

  return useMachine(machine)
}
