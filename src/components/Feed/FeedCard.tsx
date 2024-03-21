'use client'

import formatStats from '@/services/formatStats'
import { Avatar, Card, Image, Text, Title, rem } from '@mantine/core'
import {
  IconBook,
  IconBookmark,
  IconBookmarkFilled,
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
} from '@tabler/icons-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import classes from '@/styles/General.module.css'
import { IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import FormatDate from '../FormatDate'
import {
  BookmarkPost,
  DeleteBookmark,
  LikePost,
  UnLikePost,
} from '@/services/apis'
import { useUser, useFetching } from '@/context/useUser'
import { isAuthenticated } from '@/utils/Auth'

export interface FeedCardProps {
  id: string
  title?: string
  excerpt?: string
  imageUrl: string
  created_at: string
  duration?: number
  slug?: string
  likes: Likes[]
  comments: Comments[]
  bookmarks: Bookmarks[]
  views: number | 0
  author: Author
  refetch?: () => void
}

interface Comments {
  id: string
  comment: string
}

interface Likes {
  postId: string
}

interface Bookmarks {
  id: any
  postId: string
}

interface Author {
  id: string
  first_name: string
  last_name: string
  user_name: string
  email: string
  role: string
  imageUrl: string
}

const FeedCard = ({
  id,
  title,
  author,
  created_at,
  duration,
  slug,
  likes,
  comments,
  bookmarks,
  views,
  excerpt,
  imageUrl,
  refetch,
}: FeedCardProps) => {
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
  const router = useRouter()
  const userData = useUser()
  const userId = String(userData?.userInfo?.id)

  //Check likes status
  const getLikesCount = likes && likes.length
  useEffect(() => {
    if (likes && likes.length > 0) {
      // Check if any like has the current user's ID
      const hasUserLiked = likes.some((like: any) => like.userId === userId)
      setIsLiked(hasUserLiked)
      setLikesCount(getLikesCount)
    }
  }, [likes, userId])

  //Check bookmark status
  const getBookmarksCount = bookmarks && bookmarks.length
  useEffect(() => {
    if (bookmarks && bookmarks.length > 0) {
      // Check if any bookmark has the current user's ID
      const hasUserBookmarked = bookmarks.some(
        (bookmark: any) => bookmark.userId === userId
      )
      setIsBookmarked(hasUserBookmarked)
      setBookmarksCount(getBookmarksCount)

      // Find the bookmark ID of the current user if they have bookmarked
      if (hasUserBookmarked) {
        const userBookmark = bookmarks.find(
          (bookmark: any) => bookmark.userId === userId
        )
        setUserBookmarkId(userBookmark?.id)
      } else {
        setUserBookmarkId(null)
      }
    }
  }, [bookmarks, userId])

  // Dynamic routing to author profile
  const isCurrentUser = userId === author?.id
  // Determine the href value based on the condition
  const hrefValue = isCurrentUser ? '/profile' : `/${author?.user_name}`

  // Like implementation

  const likeAction = async () => {
    if (isAuthenticated()) {
      try {
        if (isLiked) {
          setIsLiked(false)
          setLikesCount(likesCount - 1)
          await UnLikePost(id)
        } else {
          // If not liked, add a new like
          setIsLiked(true)
          setLikesCount(likesCount + 1)
          await LikePost(id)
        }
      } catch (error) {
        console.error('Error toggling like:', error)
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
          await DeleteBookmark(userBookmarkId)
        } else {
          // If not bookmarked, add a new bookmark
          setIsBookmarked(true)
          setBookmarksCount(bookmarksCount + 1)
          notifications.show({
            ...notificationProps,
            message: 'Saved to bookmarks',
          })
          await BookmarkPost({ postId: id })
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

  return (
    <>
      <Card withBorder padding='lg' className='w-full' radius={'lg'}>
        <div className='user-info flex gap-4'>
          <Link href={hrefValue}>
            <Avatar src={author?.imageUrl} size='lg' alt='author image' />
          </Link>
          <div className='flex flex-col'>
            <Link href={hrefValue}>
              <Title order={4}>
                {author?.first_name} {author?.last_name}
              </Title>
              <Text c={'dimmed'} className='text-sm'>
                @{author?.user_name}
              </Text>
            </Link>
            <div className={`${classes.meta} flex flex-col gap-2 mt-6`}>
              <div className='flex gap-1'>
                <span className='text-xs'>
                  <FormatDate data={created_at} formatType='fullDate' />
                </span>
              </div>
              <div className='flex gap-1'>
                <IconBook size={14} />
                <span className='text-xs'>{duration} mins read</span>
              </div>
            </div>
          </div>
        </div>

        <div className='mt-10 mb-5'>
          <Link href={`/feeds/${slug}`}>
            <h2 className='text-lg md:text-2xl font-bold'>{title}</h2>
          </Link>
          <Text fz='sm' className='w-full' lineClamp={2} mt={10} mb={30}>
            {excerpt}
          </Text>
          <Link href={`/feeds/${slug}`}>
            <Image
              src={imageUrl}
              className='rounded-xl h-auto lg:h-[400px]'
              alt='image'
            />
          </Link>
        </div>

        <div className='flex items-center justify-between text-xs '>
          <div className='icons flex items-center gap-5 md:gap-3'>
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
                {likes === null ? 0 : formatStats(likesCount)}
                <span className='hidden md:block'>likes</span>
              </p>
            </div>
            <div
              className='flex items-center gap-1 hover:cursor-pointer'
              onClick={() => router.push(`/feeds/${slug}`)}
            >
              <IconMessageCircle size={18} stroke={1} />
              <p className='flex gap-1'>
                {comments === null ? 0 : formatStats(comments?.length)}
                <span className='hidden md:block'>comments</span>
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <IconEye size={18} stroke={1} />
              <p className='flex gap-1'>
                {formatStats(views)}{' '}
                <span className='hidden md:block'>views</span>
              </p>
            </div>
          </div>

          <div
            className='flex items-center hover:cursor-pointer'
            onClick={bookmarkAction}
          >
            {isBookmarked ? (
              <IconBookmarkFilled size={18} />
            ) : (
              <IconBookmark size={18} stroke={1} />
            )}
            <p className='flex gap-1'>
              {bookmarks === null ? 0 : formatStats(bookmarksCount)}
              <span className='hidden md:block'>bookmarks</span>
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}

export default FeedCard
