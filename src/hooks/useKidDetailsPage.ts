import { useMachine } from '@xstate/react'
import { useParams, useHistory } from 'react-router-dom'
import { kidDetailsPageMachine } from 'src/machines/kidDetailsPageMachine'

type KidDetailsPageParams = {
  id?: string
}

export function useKidDetailsPage() {
  const params = useParams<KidDetailsPageParams>()
  const history = useHistory()
  const machine = kidDetailsPageMachine(params, history)

  return useMachine(machine)
}
