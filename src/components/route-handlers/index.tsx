import React from 'react'
import { Navigate } from 'react-router-dom'

type RequireAuthenticatedProps = {
  authenticated: boolean
  children: React.ReactNode
  redirectTo?: string
}

type RequireUnauthenticatedProps = {
  authenticated: boolean
  children: React.ReactNode
}

/** Handles routes which should only be reachable when the user is authenticated */
export function RequireAuthenticated({
  authenticated,
  children,
  redirectTo = '/auth',
}: RequireAuthenticatedProps) {
  return authenticated ? <>{children}</> : <Navigate to={redirectTo} />
}

/** Handles routes which should only be reachable when the user is *not* authenticated */
export function RequireUnauthenticated({ authenticated, children }: RequireUnauthenticatedProps) {
  return !authenticated ? <>{children}</> : <Navigate to="/" />
}
