'use client'

import {
  Card,
  Avatar,
  Text,
  Group,
  Button,
  Title,
  rem,
  Loader,
} from '@mantine/core'
import classes from '@/styles/General.module.css'
import AppLayout from '@/layout/AppLayout'
import { IconTemplate } from '@tabler/icons-react'
import EmptyState from '@/components/EmptyState'
import { useParams, useRouter } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { FollowUser, GetPosts, GetUser, UnfollowUser } from '@/services/apis'
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton'
import { useEffect, useState } from 'react'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import FeedCard from '@/components/Feed/FeedCard'
import formatStats from '@/services/formatStats'
import { notifications } from '@mantine/notifications'
import { IconCheck } from '@tabler/icons-react'
import CheckAuthStatus from '@/components/hoc/CheckAuth'

const User = () => {
  const router = useRouter()
  const { user } = useParams<{ user: string; item: string }>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
  const notificationProps = {
    icon: checkIcon,
    withCloseButton: false,
    color: 'teal',
    className: 'mt-10 w-fit mx-auto',
  }

  //Fetching user info
  const {
    data: userData,
    isFetching,
    refetch,
  } = useQuery({
    queryKey: ['userData'],
    queryFn: () => GetUser(user),
  })

  const userInfo = userData?.data
  const userId = userData?.data?.author?.id
  const followingStatus = userData?.data?.followingStatus

  //Fetching posts
  const { data: posts } = useQuery({
    queryKey: ['posts'],
    queryFn: GetPosts,
  })
  const allPosts = posts?.data
  const userPosts = userId
    ? allPosts?.filter((post: any) => post.authorId === userId)
    : []

  useEffect(() => {
    // Redirect to homepage if userInfo is not available after fetching
    if (!isFetching && !userInfo) {
      router.push('/feeds')
    }
  }, [isFetching, userInfo])

  const stats = [
    { value: formatStats(userInfo?.followers?.length), label: 'Followers' },
    { value: formatStats(userInfo?.following?.length), label: 'Following' },
    { value: formatStats(userInfo?.posts?.length), label: 'Posts' },
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

  const handleFollow = async () => {
    setIsSubmitting(true)
    try {
      if (followingStatus === 'follow' || followingStatus === 'follow back') {
        notifications.show({
          ...notificationProps,
          message: 'You are now following this user',
        })
        await FollowUser(userId)
        setIsSubmitting(false)
        refetch()
      } else if (followingStatus === 'unfollow') {
        setIsSubmitting(true)
        notifications.show({
          ...notificationProps,
          message: 'You have unfollowed this user',
        })
        await UnfollowUser(userId)
        setIsSubmitting(false)
        refetch()
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <AppLayout>
      <Card withBorder padding='xl' radius='md'>
        {isFetching ? (
          <ProfileSkeleton />
        ) : (
          <>
            {userInfo && (
              <>
                <Avatar
                  src={userInfo?.author?.imageUrl}
                  size={80}
                  radius={80}
                  mx='auto'
                />
                <div className='text-center'>
                  <Text ta='center' fz='lg' fw={500} mt='sm'>
                    <span className='capitalize'>
                      {userInfo?.author?.first_name}
                    </span>{' '}
                    <span className='capitalize'>
                      {userInfo?.author?.last_name}
                    </span>
                  </Text>
                  <Text className='text-sm' mb={'md'}>
                    @{userInfo?.author?.user_name}
                  </Text>
                  <Text ta='center' className='capitalize' fz='sm' c='dimmed'>
                    {userInfo?.author?.role}
                  </Text>
                </div>
                <Group mt='md' justify='center' gap={30}>
                  {items}
                </Group>
                <Button
                  w={{ base: '100%', sm: 'fit-content' }}
                  radius='md'
                  tt={'capitalize'}
                  mt='xl'
                  mx='auto'
                  size='md'
                  variant='default'
                  onClick={handleFollow}
                >
                  {isSubmitting ? (
                    <Loader color='#543ee0' size={20} />
                  ) : (
                    `${followingStatus}`
                  )}
                </Button>
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
        {isFetching ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
            {[...Array(2)].map((_, index) => (
              <FeedsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {userPosts?.length < 1 ? (
              <EmptyState
                icon={<IconTemplate size={40} />}
                title='No post yet'
              />
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
                {userPosts?.map((feed: any) => (
                  <FeedCard key={feed.id} refetch={refetch} {...feed} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppLayout>
  )
}

export default CheckAuthStatus(User)
