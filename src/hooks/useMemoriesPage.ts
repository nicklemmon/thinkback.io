import { useMachine } from '@xstate/react'
import { useNavigate, useLocation } from 'react-router-dom'
import { memoriesPageMachine } from 'src/machines'

export function useMemoriesPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const machine = memoriesPageMachine(navigate, location)

  return useMachine(machine)
}
