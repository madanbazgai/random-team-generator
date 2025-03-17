import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/generated-team')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/generated-team"!</div>
}
