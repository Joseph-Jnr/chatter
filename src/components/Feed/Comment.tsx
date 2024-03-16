import { GetSinglePost } from '@/services/apis'
import { Text, Avatar, Group, Card, ScrollArea } from '@mantine/core'
import CommentForm from './CommentForm'
import { useQuery } from '@tanstack/react-query'
import FormatDate from '../FormatDate'

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

  console.log(comments)

  return (
    <Card>
      <ScrollArea className='max-h-[400px]' h={200}>
        <div className='mb-10'>
          {comments?.map((comment: any) => (
            <div key={comment.id} className='mb-10'>
              <div className='flex gap-5'>
                <Avatar
                  src={comment?.users?.imageUrl}
                  alt={comment?.users?.user_name}
                  radius='xl'
                />
                <div>
                  <Text size='sm'>
                    {comment?.users?.first_name} {comment?.users?.last_name}{' '}
                    <span className='mx-1'>•</span>
                    <span className='text-xs text-[#828282] italic'>
                      <FormatDate
                        data={comment?.created_at}
                        formatType='timeAgo'
                      />
                    </span>
                  </Text>
                  <Text size='xs' mb={'sm'}>
                    @{comment?.users?.user_name}
                  </Text>
                </div>
              </div>
              <Text pl={54} mt='md' size='sm'>
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
