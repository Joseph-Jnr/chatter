'use client'

import EmptyState from '@/components/EmptyState'
import FeedCard from '@/components/Feed/FeedCard'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import AppLayout from '@/layout/AppLayout'
import { IconBookmarksOff, IconTrendingUp } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

const Trending = () => {
  /* const { data: trending, isFetching } = useQuery({
    queryKey: ['trending'],
    queryFn: GetAllTrendingPosts,
  })
  const trendingData = trending?.data */

  // refer to Bookmarks page

  return (
    <AppLayout title='Trending'>
      <p>What's going viral?</p>

      <div className='posts mt-20'>
        <EmptyState
          icon={<IconTrendingUp size={40} />}
          title='Nothing is trending at the moment'
          description='Most popular posts will appear here.'
        />
      </div>
    </AppLayout>
  )
}

export default Trending
