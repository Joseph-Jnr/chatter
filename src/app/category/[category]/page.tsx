'use client'

import FeedCard, { FeedCardProps } from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import { IconChevronRight, IconTemplate } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import classes from '@/styles/General.module.css'
import { useQuery } from '@tanstack/react-query'
import { GetPosts } from '@/services/apis'
import { useEffect, useState } from 'react'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import EmptyState from '@/components/EmptyState'
import CheckAuthStatus from '@/components/hoc/CheckAuth'

const Category = () => {
  const { category } = useParams<{ category: string; item: string }>()
  const capitalizedCategory =
    category.charAt(0).toUpperCase() + category.slice(1)

  //Fetching posts
  const { data: posts, isFetching } = useQuery({
    queryKey: ['posts'],
    queryFn: GetPosts,
  })
  const allPosts = posts?.data

  // State to hold filtered posts
  const [filteredPosts, setFilteredPosts] = useState<FeedCardProps[]>([])

  // Filter posts by category when allPosts data changes
  useEffect(() => {
    if (allPosts) {
      const postsInCategory = allPosts.filter(
        (post: any) => post.category === capitalizedCategory
      )
      setFilteredPosts(postsInCategory)
    }
  }, [allPosts, category])

  return (
    <AppLayout>
      <div
        className={`${classes.breadcrumb} w-fit py-2 px-4 rounded-lg flex items-center gap-3`}
      >
        <p>Category</p>
        <IconChevronRight stroke={1} size={20} />
        <p className='capitalize'> {category}</p>
      </div>

      <div className='posts mt-20'>
        {isFetching ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
            {[...Array(2)].map((_, index) => (
              <FeedsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {filteredPosts?.length < 1 ? (
              <EmptyState
                icon={<IconTemplate size={40} />}
                title='There are no posts under this category yet.'
              />
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
                {filteredPosts?.map((feed: any) => (
                  <FeedCard key={feed.id} {...feed} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default CheckAuthStatus(Category)
