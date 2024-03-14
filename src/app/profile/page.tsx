'use client'

import {
  Card,
  Avatar,
  Text,
  Group,
  Title,
  Affix,
  Tooltip,
  Box,
  Skeleton,
} from '@mantine/core'
import classes from '@/styles/General.module.css'
import AppLayout from '@/layout/AppLayout'
import feeds from '@/services/feedsMock'
import FeedCard from '@/components/Feed/FeedCard'
import { IconPhotoEdit } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import {
  GetAllFollowers,
  GetAllFollowing,
  GetAuthorPosts,
  GetProfile,
} from '@/services/apis'
import formatStats from '@/services/formatStats'
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton'
import { useUser } from '@/context/useUser'

const Profile = () => {
  const router = useRouter()
  const userData = useUser()

  //Fetching followers
  const { data: followers } = useQuery({
    queryKey: ['followers'],
    queryFn: GetAllFollowers,
  })
  const followersCount = formatStats(followers?.data?.length)

  //Fetching following
  const { data: following } = useQuery({
    queryKey: ['following'],
    queryFn: GetAllFollowing,
  })
  const followingCount = formatStats(following?.data?.length)

  //Fetching author posts
  const { data: authorPost, isFetching } = useQuery({
    queryKey: ['authorPost'],
    queryFn: GetAuthorPosts,
  })
  const authorPostData = authorPost?.data
  const authorPostCount = formatStats(authorPost?.data?.length)

  formatStats()
  const stats = [
    { value: followersCount, label: 'Followers' },
    { value: followingCount, label: 'Follows' },
    { value: authorPostCount, label: 'Posts' },
  ]

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta='center' fz='lg' fw={500}>
        {stat.value}
      </Text>
      <Text ta='center' fz='sm' c='dimmed' lh={1}>
        {stat.label}
      </Text>
    </div>
  ))

  return (
    <AppLayout title='My Profile'>
      <Card withBorder padding='xl' radius='md'>
        {isFetching ? (
          <ProfileSkeleton />
        ) : (
          <>
            {userData && (
              <>
                <Avatar
                  src={userData?.imageUrl}
                  size={80}
                  radius={80}
                  mx='auto'
                />
                <Text ta='center' fz='lg' fw={500} mt='sm'>
                  {userData?.first_name} {userData?.last_name}
                </Text>
                <Text ta='center' className='capitalize' fz='sm' c='dimmed'>
                  {userData?.role}
                </Text>
                <Group mt='md' justify='center' gap={30}>
                  {items}
                </Group>
              </>
            )}
          </>
        )}
      </Card>

      <div className='posts mt-20'>
        <div>
          <Title order={4} mb={50} className={classes.user_header}>
            Posts
          </Title>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
          {feeds?.map((feed: any) => (
            <FeedCard key={feed.id} {...feed} />
          ))}
        </div>
      </div>

      <Affix zIndex={10} position={{ bottom: 40, right: 20 }}>
        {isFetching ? (
          <Skeleton circle height={54} />
        ) : (
          <Tooltip label='Create new post'>
            <Box
              onClick={() => router.push('/feeds/create')}
              w={50}
              h={50}
              className='rounded-full cursor-pointer flex items-center justify-center shadow-xl'
              c={'white'}
              bg={'#543ee0'}
            >
              <IconPhotoEdit size={25} stroke={1.5} />
            </Box>
          </Tooltip>
        )}
      </Affix>
    </AppLayout>
  )
}

export default Profile
