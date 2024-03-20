'use client'

import EmptyState from '@/components/EmptyState'
import FeedCard from '@/components/Feed/FeedCard'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import CheckAuthStatus from '@/components/hoc/CheckAuth'
import AppLayout from '@/layout/AppLayout'
import { GetTrendingPosts } from '@/services/apis'
import { IconTrendingUp } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

const Trending = () => {
  const { data: trending, isFetching } = useQuery({
    queryKey: ['trending'],
    queryFn: GetTrendingPosts,
  })
  const trendingData = trending?.data

  return (
    <AppLayout title='Trending'>
      <p>What&apos;s going viral?</p>

      <div className='posts mt-20'>
        {isFetching ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
            {[...Array(2)].map((_, index) => (
              <FeedsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {trendingData?.length < 1 ? (
              <EmptyState
                icon={<IconTrendingUp size={40} />}
                title='Nothing is trending at the moment'
                description='Most popular posts will appear here.'
              />
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
                {trendingData?.map((post: any) => (
                  <FeedCard key={post.id} {...post} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default CheckAuthStatus(Trending)
