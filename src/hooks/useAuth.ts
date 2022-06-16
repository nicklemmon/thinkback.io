import { useHistory } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { authMachine } from 'src/machines/authMachine'
import { useToast } from 'src/hooks'

export function useAuth() {
  const history = useHistory()
  const { showToast } = useToast()
  const machine = authMachine(history, showToast)

  return useMachine(machine)
}
