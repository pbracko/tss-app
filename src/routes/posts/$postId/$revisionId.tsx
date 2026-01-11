import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId/$revisionId')({
  component: PostRevisionComponent,
})

function PostRevisionComponent() {
  const { postId, revisionId } = Route.useParams()

  return (
    <div>
      Post {postId} revisionId: {revisionId}
    </div>
  )
}
