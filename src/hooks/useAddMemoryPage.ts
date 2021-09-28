import { useMachine } from '@xstate/react'
import { addMemoryPageMachine } from 'src/machines'
import { useToast } from 'src/hooks'

export function useAddMemoryPage() {
  const { showToast } = useToast()
  const machine = addMemoryPageMachine(showToast)

  return useMachine(machine)
}
