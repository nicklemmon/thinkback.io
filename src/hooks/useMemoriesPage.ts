import { useMachine } from '@xstate/react'
import { useHistory } from 'react-router-dom'
import { memoriesPageMachine } from 'src/machines'

export function useMemoriesPage() {
  const history = useHistory()
  const machine = memoriesPageMachine(history)

  return useMachine(machine)
}
