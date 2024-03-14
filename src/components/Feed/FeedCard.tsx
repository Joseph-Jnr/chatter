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
import { useState } from 'react'
import classes from '@/styles/General.module.css'
import { IconCheck } from '@tabler/icons-react'
import { notifications } from '@mantine/notifications'
import FormatDate from '../FormatDate'

interface FeedCardProps {
  title?: string
  content?: string
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
  id: string
}

interface Bookmarks {
  id: string
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
  title,
  author,
  created_at,
  duration,
  slug,
  likes,
  comments,
  bookmarks,
  views,
  content,
  imageUrl,
}: FeedCardProps) => {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)

  const likeAction = () => {
    setIsLiked(!isLiked)
  }

  const bookmarkAction = () => {
    setIsBookmarked(!isBookmarked)

    notifications.show({
      icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
      withCloseButton: false,
      color: 'teal',
      message: 'Saved to bookmarks',
      className: 'mt-10 w-fit mx-auto',
    })
  }

  return (
    <>
      <Card withBorder padding='lg' className='w-fit' radius={'lg'}>
        <div className='user-info flex gap-4'>
          <Link href={`/${author?.user_name}`}>
            <Avatar src={author.imageUrl} size='lg' alt='author image' />
          </Link>
          <div className='flex flex-col'>
            <Link href={`/${author?.user_name}`}>
              <Title order={4}>
                {author?.first_name} {author?.last_name}
              </Title>
            </Link>
            <div className={`${classes.meta} flex flex-col gap-2 mt-3`}>
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
            {content}
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
