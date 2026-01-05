// route.tsx defines shared layout component for /users route and all of its child routes

import { Outlet, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/users')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="p-3 space-y-3">
      <p>Users layout</p>
      <Outlet />
    </div>
  )
}
