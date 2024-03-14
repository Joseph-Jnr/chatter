import { GetSinglePost } from '@/services/apis'
import feeds from '@/services/feedsMock'
import { Text, Avatar, Group } from '@mantine/core'
import { useQuery } from '@tanstack/react-query'
import { useEffect, useState } from 'react'

interface CommentProps {
  id?: string
  postId: string
  userId?: string
  comment?: string
  created_at?: string
  updated_at?: string
}

const Comment = ({ postId }: CommentProps) => {
  const [comments, setComments] = useState<CommentProps[]>([])

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const res = await GetSinglePost(postId)
        if (res?.data?.comments) {
          setComments(res.data.comments)
          console.log(res.data.comments)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchPostAndComments()
  }, [postId])
  /* try {
    const res = await GetSinglePost(postId)
    console.log(res)
  } catch (error) {
    console.error('Error:', error)
  } */

  const postComments = feeds[0].comments

  return (
    <div className='mb-10'>
      {postComments.map((comment) => (
        <div className='mb-10'>
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
  )
}

export default Comment
