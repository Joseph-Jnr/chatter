import { GetSinglePost } from '@/services/apis'
import { Text, Avatar, Group, Card, ScrollArea } from '@mantine/core'
import CommentForm from './CommentForm'
import { useQuery } from '@tanstack/react-query'

interface CommentProps {
  id?: string
  postId: string
  userId?: string
  comment?: string
  created_at?: string
  updated_at?: string
}

const Comment = ({ postId }: CommentProps) => {
  const { data: postDetail, refetch } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => GetSinglePost(postId),
  })

  const comments = postDetail?.data?.comments

  return (
    <Card>
      <ScrollArea mah={500}>
        <div className='mb-10'>
          {comments?.map((comment: any) => (
            <div key={comment.id} className='mb-10'>
              <Group>
                <Avatar
                  src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png'
                  alt='Jacob Warnhalter'
                  radius='xl'
                />
                <div>
                  <Text size='sm'>Jacob Warnhalter</Text>
                  <Text size='xs' c='dimmed'>
                    10 minutes ago
                  </Text>
                </div>
              </Group>
              <Text pl={54} pt='sm' size='sm'>
                {comment.comment}
              </Text>
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Comment form */}
      <CommentForm postId={postId} refetch={refetch} />
    </Card>
  )
}

export default Comment
