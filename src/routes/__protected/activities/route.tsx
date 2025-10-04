import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/__protected/activities')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/__protected/activities"!</div>
}
