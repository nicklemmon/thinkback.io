import { useMachine } from '@xstate/react'
import { useParams, useNavigate } from 'react-router-dom'
import { kidDetailsPageMachine } from 'src/machines/kidDetailsPageMachine'

type KidDetailsPageParams = {
  id?: string
}

export function useKidDetailsPage() {
  const params = useParams<KidDetailsPageParams>()
  const navigate = useNavigate()
  const machine = kidDetailsPageMachine(params, navigate)

  return useMachine(machine)
}
