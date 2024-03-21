'use client'

import EmptyState from '@/components/EmptyState'
import FollowersSkeleton from '@/components/Skeletons/FollowersSkeleton'
import AppLayout from '@/layout/AppLayout'
import {
  FollowUser,
  GetAllFollowers,
  GetAllFollowing,
  UnfollowUser,
} from '@/services/apis'
import { Avatar, Box, Button, Pill, Tabs, Text, rem } from '@mantine/core'
import { IconCheck, IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import classes from '@/styles/General.module.css'
import CheckAuthStatus from '@/components/hoc/CheckAuth'
import { notifications } from '@mantine/notifications'

const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
const notificationProps = {
  icon: checkIcon,
  withCloseButton: false,
  color: 'teal',
  className: 'mt-10 w-fit mx-auto',
}

interface FollowerCardProps {
  first_name: string
  last_name: string
  user_name: string
  imageUrl: any
  followingStatus: string
  action: () => void
  tab: string
}

const FollowerCard = ({
  first_name,
  last_name,
  user_name,
  imageUrl,
  followingStatus,
  action,
  tab,
}: FollowerCardProps) => {
  return (
    <div className='flex justify-between mb-10'>
      <div className='flex gap-4'>
        <Avatar src={imageUrl} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' tt={'capitalize'} fw={500}>
            {first_name} {last_name}
          </Text>

          <Box w={150}>
            <Text truncate='end' c='dimmed' fz={12}>
              @{user_name}
            </Text>
          </Box>
        </div>
      </div>
      {tab === 'followers' && followingStatus === 'unfollow' ? (
        <></>
      ) : (
        <Button
          w={'fit-content'}
          radius='md'
          size='xs'
          onClick={action}
          variant='default'
          tt={'capitalize'}
        >
          {followingStatus}
        </Button>
      )}
    </div>
  )
}

const Friends = () => {
  const iconStyle = { width: rem(12), height: rem(12) }
  const queryClient = useQueryClient()
  //Fetching followers
  const { data: followers, isFetching } = useQuery({
    queryKey: ['followers'],
    queryFn: GetAllFollowers,
  })
  const followersData = followers?.data
  console.log('Followers: ', followersData)

  //Fetching following
  const { data: following, refetch } = useQuery({
    queryKey: ['following'],
    queryFn: GetAllFollowing,
  })
  const followingData = following?.data
  console.log('Following: ', followingData)

  const handleFollow = async (status: string, userId: string) => {
    if (status === 'follow' || status === 'follow back') {
      // follow user
      notifications.show({
        ...notificationProps,
        message: 'You are now following this user',
      })
      const res = await FollowUser(userId)
      console.log(res)
    } else if (status === 'unfollow') {
      // unfollow user
      notifications.show({
        ...notificationProps,
        message: 'You have unfollowed this user',
      })
      const res = await UnfollowUser(userId)
      refetch()
      console.log(res)
    }
  }

  return (
    <AppLayout title='Friends'>
      <Tabs defaultValue='followers'>
        <Tabs.List>
          <Tabs.Tab
            value='followers'
            leftSection={<IconUsersGroup style={iconStyle} />}
          >
            Followers{' '}
            <Pill className={classes.follows}>{followersData?.length}</Pill>
          </Tabs.Tab>
          <Tabs.Tab
            value='following'
            leftSection={<IconUsers style={iconStyle} />}
          >
            Following{' '}
            <Pill className={classes.follows}>{followingData?.length}</Pill>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value='followers'>
          <div className='mt-10'>
            {isFetching ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <FollowersSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {followersData?.length < 1 ? (
                  <EmptyState
                    icon={<IconUsersGroup size={40} />}
                    title='You do not have any followers yet'
                    description='Share your posts with friends and family. This gives you a chance to be spotted.'
                  />
                ) : (
                  followersData?.map((follower: any) => (
                    <FollowerCard
                      key={follower.id}
                      tab='followers'
                      first_name={follower.followers[0].first_name}
                      last_name={follower.followers[0].last_name}
                      user_name={follower.followers[0].user_name}
                      imageUrl={follower.followers[0].imageUrl}
                      followingStatus={follower.followingStatus}
                      action={() =>
                        handleFollow(
                          follower.followingStatus,
                          follower.followerId
                        )
                      }
                    />
                  ))
                )}
              </>
            )}
          </div>
        </Tabs.Panel>

        <Tabs.Panel value='following'>
          <div className='mt-10'>
            {isFetching ? (
              <>
                {[...Array(3)].map((_, index) => (
                  <FollowersSkeleton key={index} />
                ))}
              </>
            ) : (
              <>
                {followingData?.length < 1 ? (
                  <EmptyState
                    icon={<IconUsers size={40} />}
                    title='You do not follow anyone'
                    description='Feel free to follow back your followers or your favorite authors.'
                  />
                ) : (
                  followingData?.map((follower: any) => (
                    <FollowerCard
                      key={follower.id}
                      tab='following'
                      first_name={follower.following[0].first_name}
                      last_name={follower.following[0].last_name}
                      user_name={follower.following[0].user_name}
                      imageUrl={follower.following[0].imageUrl}
                      followingStatus='unfollow'
                      action={() =>
                        handleFollow('unfollow', follower.followerId)
                      }
                    />
                  ))
                )}
              </>
            )}
          </div>
        </Tabs.Panel>
      </Tabs>
    </AppLayout>
  )
}

export default CheckAuthStatus(Friends)
