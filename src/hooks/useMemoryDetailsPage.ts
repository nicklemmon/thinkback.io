import { useMachine } from '@xstate/react'
import { useParams, useNavigate } from 'react-router-dom'
import { memoryDetailsPageMachine } from 'src/machines'
import { useToast } from 'src/hooks'

type MemoryDetailsPageParams = {
  id?: string
}

export function useMemoryDetailsPage() {
  const params = useParams<MemoryDetailsPageParams>()
  const navigate = useNavigate()
  const { showToast } = useToast()
  const machine = memoryDetailsPageMachine(params, navigate, showToast)

  return useMachine(machine)
}
