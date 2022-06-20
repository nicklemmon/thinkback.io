import { useNavigate } from 'react-router-dom'
import { useMachine } from '@xstate/react'
import { authMachine } from 'src/machines/authMachine'
import { useToast } from 'src/hooks'

export function useAuth() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const machine = authMachine(navigate, showToast)

  return useMachine(machine)
}
