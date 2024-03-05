'use client'

import { Woman } from '@/assets'
import formatStats from '@/services/formatStats'
import {
  Avatar,
  Box,
  Card,
  Notification,
  Text,
  Title,
  rem,
} from '@mantine/core'
import {
  IconBook,
  IconBookmark,
  IconBookmarkFilled,
  IconEye,
  IconHeart,
  IconHeartFilled,
  IconMessageCircle,
} from '@tabler/icons-react'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import classes from '@/styles/General.module.css'
import { IconCheck } from '@tabler/icons-react'

interface FeedCardProps {
  title?: string
  author: string
  authorImage?: string
  date?: string
  duration?: number
  slug?: string
  analytics: {
    likes: number | 0
    comments: number | 0
    views: number | 0
    bookmarks: number | 0
  }
  content?: string
  thumbnail?: any
}

const FeedCard = ({
  title,
  author,
  authorImage,
  date,
  duration,
  slug,
  analytics,
  content,
  thumbnail,
}: FeedCardProps) => {
  const router = useRouter()
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isAlertVisible, setIsAlertVisible] = useState(false)
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

  const likeAction = () => {
    setIsLiked(!isLiked)
  }

  const bookmarkAction = () => {
    setIsBookmarked(!isBookmarked)
    setIsAlertVisible(true)

    setTimeout(() => {
      setIsAlertVisible(false)
    }, 2000)
  }

  return (
    <>
      <Card withBorder padding='lg' className='w-fit' radius={'lg'}>
        <div className='user-info flex gap-4'>
          <Avatar src={authorImage} size='lg' alt='author image' />
          <div className='flex flex-col'>
            <Title order={4}>{author}</Title>
            <div className={`${classes.meta} flex flex-col gap-2 mt-3`}>
              <div className='flex gap-1'>
                <span className='text-xs'>{date}</span>
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
          <Image src={Woman} className='rounded-xl' alt='woman' />
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
                {formatStats(analytics.likes)}{' '}
                <span className='hidden md:block'>likes</span>
              </p>
            </div>
            <div
              className='flex items-center gap-1 hover:cursor-pointer'
              onClick={() => router.push(`/feeds/${slug}`)}
            >
              <IconMessageCircle size={18} stroke={1} />
              <p className='flex gap-1'>
                {formatStats(analytics.comments)}
                <span className='hidden md:block'>comments</span>
              </p>
            </div>
            <div className='flex items-center gap-1'>
              <IconEye size={18} stroke={1} />
              <p className='flex gap-1'>
                {formatStats(analytics.views)}{' '}
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
              {formatStats(analytics.bookmarks)}{' '}
              <span className='hidden md:block'>bookmarks</span>
            </p>
          </div>
        </div>
      </Card>

      {/* Bookmark Notification */}
      {isAlertVisible && (
        <Box className='fixed top-10 left-0 right-0 mx-auto w-60 z-50 bounce-down-animation'>
          <Notification
            icon={checkIcon}
            color='teal'
            title='Bookmarked'
            mx={'auto'}
            withCloseButton={false}
            mt='md'
          />
        </Box>
      )}
    </>
  )
}

export default FeedCard