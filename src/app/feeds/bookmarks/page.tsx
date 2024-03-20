'use client'

import EmptyState from '@/components/EmptyState'
import FeedCard from '@/components/Feed/FeedCard'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import CheckAuthStatus from '@/components/hoc/CheckAuth'
import { useUser } from '@/context/useUser'
import AppLayout from '@/layout/AppLayout'
import { GetAllBookmarks, GetPosts } from '@/services/apis'
import feeds from '@/services/feedsMock'
import { IconBookmarksOff } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

const Bookmarks = () => {
  const userData = useUser()
  const currentUserId = userData?.userInfo?.id
  //Fetching posts
  const {
    data: posts,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['posts'],
    queryFn: GetPosts,
  })
  const allPosts = posts?.data

  // Getting bookmarked posts
  const bookmarkedPosts = allPosts?.filter((post: any) =>
    post.bookmarks.some((bookmark: any) => bookmark.userId === currentUserId)
  )

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
            {bookmarkedPosts?.length < 1 ? (
              <EmptyState
                icon={<IconBookmarksOff size={40} />}
                title='You do not have any bookmarks yet'
                description='All your saved posts will appear here.'
              />
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
                {bookmarkedPosts?.map((bookmark: any) => (
                  <FeedCard key={bookmark.id} {...bookmark} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default CheckAuthStatus(Bookmarks)
