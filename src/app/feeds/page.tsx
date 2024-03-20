'use client'

import FeedCard from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import { Affix, Box, Skeleton, Tooltip } from '@mantine/core'
import { IconPlus } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import { GetPosts } from '@/services/apis'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import CheckAuthStatus from '@/components/hoc/CheckAuth'
import { useUser } from '@/context/useUser'

const Feeds = () => {
  const userData = useUser()
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

  return (
    <>
      <AppLayout>
        <>
          <div className='md:mx-40'>
            <div className='grid grid-cols-1 gap-10'>
              {isFetching ? (
                <>
                  {[...Array(2)].map((_, index) => (
                    <FeedsSkeleton key={index} />
                  ))}
                </>
              ) : (
                <>
                  {allPosts?.map((feed: any) => (
                    <FeedCard key={feed.id} refetch={refetch} {...feed} />
                  ))}
                </>
              )}
            </div>
          </div>

          {userData?.userInfo?.role === 'Author' && (
            <Affix zIndex={10} position={{ bottom: 40, right: 20 }}>
              {isFetching ? (
                <Skeleton circle height={54} />
              ) : (
                <Tooltip label='Create new post'>
                  <Box
                    component={'a'}
                    href='/feeds/create'
                    w={50}
                    h={50}
                    className='rounded-full cursor-pointer flex items-center justify-center shadow-xl'
                    c={'white'}
                    bg={'#543ee0'}
                  >
                    <IconPlus size={25} stroke={1.5} />
                  </Box>
                </Tooltip>
              )}
            </Affix>
          )}
        </>
      </AppLayout>
    </>
  )
}

export default CheckAuthStatus(Feeds)
