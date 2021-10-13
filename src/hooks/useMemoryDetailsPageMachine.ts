import { useMachine } from '@xstate/react'
import { useParams, useHistory } from 'react-router-dom'
import { memoryDetailsPageMachine } from 'src/machines/memoryDetailsPageMachine'

type MemoryDetailsPageParams = {
  id?: string
}

export function useMemoryDetailsPageMachine() {
  const params = useParams<MemoryDetailsPageParams>()
  const history = useHistory()
  const machine = memoryDetailsPageMachine(params, history)

  return useMachine(machine)
}
