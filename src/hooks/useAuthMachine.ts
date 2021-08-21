import { useHistory } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { authMachine } from 'src/machines/authMachine'

export function useAuthMachine() {
  const history = useHistory()
  const machine = authMachine(history)

  return useMachine(machine)
}
