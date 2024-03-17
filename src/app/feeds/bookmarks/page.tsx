'use client'

import EmptyState from '@/components/EmptyState'
import FeedCard from '@/components/Feed/FeedCard'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import AppLayout from '@/layout/AppLayout'
import { GetAllBookmarks } from '@/services/apis'
import feeds from '@/services/feedsMock'
import { IconBookmarksOff } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Bookmarks = () => {
  const { data: bookmarks, isFetching } = useQuery({
    queryKey: ['bookmarks'],
    queryFn: GetAllBookmarks,
  })
  const bookmarksData = bookmarks?.data

  console.log('Bookmarks data: ', bookmarksData)

  return (
    <AppLayout title='Bookmarks'>
      <p>Your saved posts</p>

      <div className='posts mt-20'>
        {isFetching ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
            {[...Array(2)].map((_, index) => (
              <FeedsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {bookmarksData?.length < 1 ? (
              <EmptyState
                icon={<IconBookmarksOff size={40} />}
                title='You do not have any bookmarks yet'
                description='All your saved posts will appear here.'
              />
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
                {bookmarksData?.map((bookmark: any) => (
                  <FeedCard
                    key={bookmark.id}
                    imageUrl={bookmark?.posts?.imageUrl}
                    title={bookmark?.posts?.title}
                    excerpt={bookmark?.posts?.excerpt}
                    likes={bookmark?.posts?.likes}
                    comments={bookmark?.posts?.comments}
                    bookmarks={bookmark?.posts?.bookmarks}
                    views={bookmark?.posts?.views}
                    slug={bookmark?.posts?.slug}
                    duration={bookmark?.posts?.duration}
                    created_at={bookmark?.posts?.created_at}
                    {...bookmark}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default Bookmarks
