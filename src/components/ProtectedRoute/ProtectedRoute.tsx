import { Route, RouteProps } from 'react-router-dom'

type ProtectedRouteProps = {
  condition: boolean
} & RouteProps

export function ProtectedRoute({ condition, ...props }: ProtectedRouteProps) {
  if (!condition) return null

  return <Route {...props} />
}
