import { useMachine } from '@xstate/react'
import { useParams, useHistory } from 'react-router-dom'
import { memoryDetailsPageMachine } from 'src/machines'
import { useToast } from 'src/hooks'

type MemoryDetailsPageParams = {
  id?: string
}

export function useMemoryDetailsPageMachine() {
  const params = useParams<MemoryDetailsPageParams>()
  console.log('params', params)
  const history = useHistory()
  const { showToast } = useToast()
  const machine = memoryDetailsPageMachine(params, history, showToast)

  return useMachine(machine)
}
