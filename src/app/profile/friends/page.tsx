'use client'

import EmptyState from '@/components/EmptyState'
import FollowersSkeleton from '@/components/Skeletons/FollowersSkeleton'
import AppLayout from '@/layout/AppLayout'
import { GetAllFollowers, GetAllFollowing } from '@/services/apis'
import {
  Avatar,
  Box,
  Button,
  Group,
  Pill,
  Tabs,
  Text,
  rem,
} from '@mantine/core'
import { IconUsers, IconUsersGroup } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import classes from '@/styles/General.module.css'

interface FollowerCardProps {
  first_name: string
  last_name: string
  user_name: string
  imageUrl: any
  action?: string
}

const FollowerCard = ({
  first_name,
  last_name,
  user_name,
  imageUrl,
  action,
}: FollowerCardProps) => {
  return (
    <div className='flex justify-between mb-10'>
      <div className='flex gap-4'>
        <Avatar src={imageUrl} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            {first_name} {last_name}
          </Text>

          <Box w={150}>
            <Text truncate='end' c='dimmed' fz={12}>
              {user_name}
            </Text>
          </Box>
        </div>
      </div>
      <Button w={'fit-content'} radius='md' size='xs' variant='default'>
        Follow back
      </Button>
    </div>
  )
}

const Friends = () => {
  const iconStyle = { width: rem(12), height: rem(12) }
  //Fetching followers
  const { data: followers, isFetching } = useQuery({
    queryKey: ['followers'],
    queryFn: GetAllFollowers,
  })
  const followersData = followers?.data

  //Fetching following
  const { data: following } = useQuery({
    queryKey: ['following'],
    queryFn: GetAllFollowing,
  })
  const followingData = following?.data
  console.log(followingData)

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
                    <FollowerCard key={follower.id} {...follower} />
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
                    <FollowerCard key={follower.id} {...follower} />
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

export default Friends
