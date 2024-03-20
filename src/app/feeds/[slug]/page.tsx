'use client'

import AppLayout from '@/layout/AppLayout'
import {
  Avatar,
  Modal,
  Pill,
  Text,
  Title,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import classes from '@/styles/General.module.css'
import {
  IconBook,
  IconBookmarkFilled,
  IconHeartFilled,
} from '@tabler/icons-react'
import ChButton from '@/components/Buttons/ChButton'
import { IconHeart } from '@tabler/icons-react'
import formatStats from '@/services/formatStats'
import { IconBookmark } from '@tabler/icons-react'
import { IconEye } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { isAuthenticated } from '@/utils/Auth'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useParams, useRouter } from 'next/navigation'
import Comment from '@/components/Feed/Comment'
import {
  BookmarkPost,
  DeleteBookmark,
  GetPosts,
  GetSinglePost,
  LikePost,
  UnLikePost,
  UpdateViewsCount,
} from '@/services/apis'
import { useQuery } from '@tanstack/react-query'
import FormatDate from '@/components/FormatDate'
import SingleFeedSkeleton from '@/components/Skeletons/SingleFeedSkeleton'
import { useUser } from '@/context/useUser'

const FeedDetail = () => {
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
  const notificationProps = {
    icon: checkIcon,
    withCloseButton: false,
    color: 'teal',
    className: 'mt-10 w-fit mx-auto',
  }
  const [isLiked, setIsLiked] = useState(false)
  let [likesCount, setLikesCount] = useState(0)
  const [isBookmarked, setIsBookmarked] = useState(false)
  let [bookmarksCount, setBookmarksCount] = useState(0)
  const [userBookmarkId, setUserBookmarkId] = useState(null)
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()
  const { slug } = useParams<{ slug: string; item: string }>()
  const [postId, setPostId] = useState('')
  const currentUser = useUser()
  const currentUserId = currentUser?.userInfo?.id

  // Get post ID from slug
  const GetPostIdFromSlug = async (slug: string) => {
    try {
      const posts = await GetPosts()
      const post = posts.data.find((post: any) => post.slug === slug) // Find post with matching slug
      if (post) {
        setPostId(post.id)
        return post.id // Return post ID if found
      } else {
        throw new Error(`Post with slug ${slug} not found`)
      }
    } catch (err) {
      throw err
    }
  }

  GetPostIdFromSlug(slug)

  // Update views count
  useEffect(() => {
    // Check if postId is not empty
    if (postId) {
      // Call UpdateViews to update the views count
      UpdateViewsCount(postId)
        .then(() => {
          console.log('Views count updated successfully')
        })
        .catch((error) => {
          console.error('Error updating views count:', error)
        })
    }
  }, [postId])

  const { data: postDetail, isFetching } = useQuery({
    queryKey: ['postDetail', postId],
    queryFn: () => GetSinglePost(postId),
  })
  const postDetailData = postDetail?.data

  //Check likes status
  const getLikesCount =
    postDetailData && postDetailData.likes && postDetailData.likes.length
  useEffect(() => {
    if (
      postDetailData &&
      postDetailData.likes &&
      postDetailData.likes.length > 0
    ) {
      // Check if any like has the current user's ID
      const hasUserLiked = postDetailData.likes.some(
        (like: any) => like.userId === currentUserId
      )
      setIsLiked(hasUserLiked)
      setLikesCount(getLikesCount)
    }
  }, [postDetailData, currentUserId])

  //Check bookmark status
  const getBookmarksCount =
    postDetailData && postDetailData.likes && postDetailData.bookmarks.length
  useEffect(() => {
    if (
      postDetailData &&
      postDetailData.bookmarks &&
      postDetailData.bookmarks.length > 0
    ) {
      // Check if any bookmark has the current user's ID
      const hasUserBookmarked = postDetailData.bookmarks.some(
        (bookmark: any) => bookmark.userId === currentUserId
      )
      setIsBookmarked(hasUserBookmarked)
      setBookmarksCount(getBookmarksCount)

      // Find the bookmark ID of the current user if they have bookmarked
      if (hasUserBookmarked) {
        const userBookmark = postDetailData.bookmarks.find(
          (bookmark: any) => bookmark.userId === currentUserId
        )
        setUserBookmarkId(userBookmark.id)
      } else {
        setUserBookmarkId(null)
      }
    }
  }, [postDetailData, currentUserId])

  const likeAction = async () => {
    if (isAuthenticated()) {
      try {
        if (isLiked) {
          setIsLiked(false)
          setLikesCount(likesCount - 1)
          await UnLikePost(postId)
        } else {
          setIsLiked(true)
          setLikesCount(likesCount + 1)
          await LikePost(postId)
        }
      } catch (error) {
        console.error('Error toggling like:', error) // If there's an error, revert the changes in the UI
        if (isLiked) {
          setLikesCount(likesCount + 1)
        } else {
          setLikesCount(likesCount - 1)
        }
        setIsLiked(!isLiked)
      }
    } else {
      open()
    }
  }

  const bookmarkAction = async () => {
    if (isAuthenticated()) {
      try {
        if (isBookmarked && userBookmarkId) {
          setIsBookmarked(false)
          setBookmarksCount(bookmarksCount - 1)
          notifications.show({
            ...notificationProps,
            message: 'Bookmark removed',
          })
          const res = await DeleteBookmark(userBookmarkId)
          console.log(res)
        } else {
          setIsBookmarked(true)
          setBookmarksCount(bookmarksCount + 1)
          notifications.show({
            ...notificationProps,
            message: 'Saved to bookmarks',
          })
          const res = await BookmarkPost({ postId: postId })
          console.log(res)
        }
      } catch (error) {
        console.error('Error toggling bookmark:', error)
        if (isBookmarked) {
          setBookmarksCount(bookmarksCount + 1)
        } else {
          setBookmarksCount(bookmarksCount - 1)
        }
        setIsBookmarked(!isBookmarked)
      }
    } else {
      open()
    }
  }

  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  return (
    <AppLayout>
      <div className='md:mx-40'>
        {isFetching ? (
          <SingleFeedSkeleton />
        ) : (
          <>
            <h2 className='text-2xl lg:text-4xl font-bold'>
              {postDetailData?.title}
            </h2>

            <div className={`${classes.meta} flex flex-col gap-2 my-5`}>
              <div className='flex gap-1'>
                <span className='text-xs'>
                  <FormatDate
                    data={postDetailData?.created_at}
                    formatType='fullDate'
                  />
                </span>
              </div>
              <div className='flex gap-1'>
                <IconBook size={14} />
                <span className='text-xs'>
                  {postDetailData?.duration} mins read
                </span>
              </div>
            </div>

            <div className='flex items-center gap-2'>
              <Avatar
                src={postDetailData?.author?.imageUrl}
                size={40}
                radius={80}
              />
              <p className='text-sm'>
                by {postDetailData?.author?.first_name}{' '}
                {postDetailData?.author?.last_name}
              </p>
            </div>

            <div className='my-10'>
              <img
                src={postDetailData?.imageUrl}
                className='rounded-lg w-full'
                alt='image'
              />
            </div>

            <div
              className='content'
              dangerouslySetInnerHTML={{ __html: postDetailData?.content }}
            />

            <div className='tags-area flex flex-wrap gap-3 mt-10'>
              {postDetailData?.tags?.map((tag: any) => (
                <Pill key={tag} bg='gray' className={classes.tags} size='lg'>
                  #{...tag}
                </Pill>
              ))}
            </div>

            <div className='reactions mt-10'>
              <div className='icons flex items-center gap-5 md:gap-7'>
                <div
                  className='flex items-center gap-1 hover:cursor-pointer'
                  onClick={likeAction}
                >
                  {isLiked ? (
                    <IconHeartFilled size={18} className='text-red-600' />
                  ) : (
                    <IconHeart size={18} stroke={1} />
                  )}
                  <p className='flex gap-1'>
                    {formatStats(likesCount)}{' '}
                    <span className='hidden md:block'>likes</span>
                  </p>
                </div>

                <div
                  className='flex items-center hover:cursor-pointer gap-1'
                  onClick={bookmarkAction}
                >
                  {isBookmarked ? (
                    <IconBookmarkFilled size={18} />
                  ) : (
                    <IconBookmark size={18} stroke={1} />
                  )}
                  <p className='flex gap-1'>
                    {formatStats(bookmarksCount)}{' '}
                    <span className='hidden md:block'>bookmarks</span>
                  </p>
                </div>

                <div className='flex items-center gap-1'>
                  <IconEye size={18} stroke={1} />
                  <p className='flex gap-1'>
                    {formatStats(postDetailData?.views)}{' '}
                    <span className='hidden md:block'>views</span>
                  </p>
                </div>
              </div>
            </div>
          </>
        )}

        {isAuthenticated() && (
          <div className='comment-section mt-16'>
            <Comment postId={postId} />
          </div>
        )}
      </div>

      <Modal
        c={color}
        opened={opened}
        onClose={close}
        radius={'lg'}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className='flex flex-col items-center'>
          <Title c={color} my={5} order={3}>
            Ooops!
          </Title>

          <Text size='sm' className='text-center' mb={40} c='dimmed'>
            You cannot perform this action. Login or create an account in order
            to interact with posts on Chatter.
          </Text>

          <ChButton
            className='w-full'
            onClick={() => router.push('/sign-in')}
            color={'#544ee0'}
          >
            Login
          </ChButton>
        </div>
      </Modal>
    </AppLayout>
  )
}

export default FeedDetail
