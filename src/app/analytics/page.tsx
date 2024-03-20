'use client'

import AnalyticsSkeleton from '@/components/Skeletons/AnalyticsSkeleton'
import CheckAuthStatus from '@/components/hoc/CheckAuth'
import { UserData, useFetching, useUser } from '@/context/useUser'
import AppLayout from '@/layout/AppLayout'
import formatStats from '@/services/formatStats'
import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import {
  IconEye,
  IconBookmark,
  IconThumbUp,
  IconNews,
} from '@tabler/icons-react'

const icons = {
  post: IconNews,
  like: IconThumbUp,
  bookmark: IconBookmark,
  view: IconEye,
}

const Analytics = () => {
  const userData = useUser()
  const fetchingData = useFetching()
  const isFetching = fetchingData?.isFetching

  let totalLikes = 0
  let totalBookmarks = 0
  const totalPosts = userData?.posts?.length
  const totalViews = userData?.posts?.reduce(
    (sum, post) => sum + post?.views,
    0
  )
  const getTotalLikes = (userData: UserData): number => {
    const { posts } = userData
    const totalLikes = posts?.reduce((sum, post) => {
      if (post.likes && post.likes.length) {
        return sum + post.likes.length
      }
      return sum
    }, 0)
    return totalLikes
  }

  const getTotalBookmarks = (userData: UserData): number => {
    const { posts } = userData
    const totalBookmarks = posts?.reduce((sum, post) => {
      if (post.bookmarks && post.bookmarks.length) {
        return sum + post.bookmarks.length
      }
      return sum
    }, 0)
    return totalBookmarks
  }

  if (userData) {
    totalLikes = getTotalLikes(userData)
    totalBookmarks = getTotalBookmarks(userData)
  }

  const data = [
    {
      title: 'Posts',
      icon: 'post',
      value: formatStats(totalPosts),
      diff: 34,
    },
    { title: 'Likes', icon: 'like', value: formatStats(totalLikes), diff: -13 },
    {
      title: 'Bookmarks',
      icon: 'bookmark',
      value: formatStats(totalBookmarks),
      diff: 18,
    },
    { title: 'Views', icon: 'view', value: formatStats(totalViews), diff: -30 },
  ] as const

  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]
    return (
      <Paper withBorder p='md' radius='md' key={stat.title}>
        <Group justify='space-between'>
          <Text size='lg' c='dimmed' className={'font-bold'}>
            {stat.title}
          </Text>
          <Icon className={''} size='1.4rem' stroke={1.5} />
        </Group>

        <Group align='flex-end' gap='xs' mt={25}>
          <Text className={''}>{stat.value}</Text>
        </Group>

        <Text fz='xs' c='dimmed' mt={7}>
          Total amount of <span className='lowercase'>{stat.title}</span>
        </Text>
      </Paper>
    )
  })

  return (
    <AppLayout title='Analytics'>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
        {isFetching ? (
          <>
            {[...Array(4)].map((_, index) => (
              <AnalyticsSkeleton key={index} />
            ))}
          </>
        ) : (
          <>{stats}</>
        )}
      </SimpleGrid>
    </AppLayout>
  )
}

export default CheckAuthStatus(Analytics)
