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
import { useUser } from '@/context/useUser'

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
}

interface Comments {
  id: string
  comment: string
}

interface Likes {
  postId: string
}

interface Bookmarks {
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
}: FeedCardProps) => {
  const router = useRouter()
  const userData = useUser()
  const userId = String(userData?.userInfo?.id)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  useEffect(() => {
    // Check if the post is already bookmarked when the component mounts
    setIsBookmarked(bookmarks?.some((bookmark) => bookmark.postId === id))
  }, [bookmarks, id])

  useEffect(() => {
    // Check if the post is already liked when the component mounts
    setIsLiked(likes?.some((like) => like.postId === id))
  }, [likes, id])

  console.log('Bookmarked? ', isBookmarked)
  console.log('Liked? ', isLiked)
  console.log('Profile: ', userData)

  // Dynamic routing to author profile
  const isCurrentUser = userId === author?.id
  // Determine the href value based on the condition
  const hrefValue = isCurrentUser ? '/profile' : `/${author?.user_name}`

  // Like implementation

  const likeAction = async () => {
    try {
      if (isLiked) {
        // If already liked, unlike the post
        await UnLikePost(id)
        setIsLiked(false)
      } else {
        // If not liked, like the post
        await LikePost(id)
        setIsLiked(true)
      }
    } catch (error) {
      console.error('Error toggling like:', error)
    }
  }

  const bookmarkAction = async () => {
    /* setIsBookmarked(!isBookmarked)

    notifications.show({
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
      withCloseButton: false,
      color: 'teal',
      message: 'Saved to bookmarks',
      className: 'mt-10 w-fit mx-auto',
    }) */

    try {
      if (isBookmarked) {
        // If already bookmarked, delete the bookmark
        await DeleteBookmark(id)
        setIsBookmarked(false)
      } else {
        // If not bookmarked, add a new bookmark
        await BookmarkPost({ postId: id })
        setIsBookmarked(true)
      }
      // Show notification
      notifications.show({
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'teal',
        message: isBookmarked ? 'Bookmark removed' : 'Saved to bookmarks',
        className: 'mt-10 w-fit mx-auto',
      })
    } catch (error) {
      console.error('Error toggling bookmark:', error)
    }
  }

  return (
    <>
      <Card withBorder padding='lg' className='w-fit' radius={'lg'}>
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
          <Image src={imageUrl} className='rounded-xl' alt='image' />
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
                {formatStats(likes?.length)}{' '}
                <span className='hidden md:block'>likes</span>
              </p>
            </div>
            <div
              className='flex items-center gap-1 hover:cursor-pointer'
              onClick={() => router.push(`/feeds/${slug}`)}
            >
              <IconMessageCircle size={18} stroke={1} />
              <p className='flex gap-1'>
                {formatStats(comments?.length)}
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
              {formatStats(bookmarks?.length)}{' '}
              <span className='hidden md:block'>bookmarks</span>
            </p>
          </div>
        </div>
      </Card>
    </>
  )
}

export default FeedCard
