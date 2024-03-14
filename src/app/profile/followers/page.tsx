'use client'

import EmptyState from '@/components/EmptyState'
import FollowersSkeleton from '@/components/Skeletons/FollowersSkeleton'
import AppLayout from '@/layout/AppLayout'
import { GetAllFollowers } from '@/services/apis'
import { Avatar, Box, Button, Group, Text } from '@mantine/core'
import { IconUsersGroup } from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'

interface FollowerCardProps {
  name: string
  username: string
  image: any
}

const FollowerCard = ({ name, username, image }: FollowerCardProps) => {
  return (
    <div className='flex justify-between mb-10'>
      <div className='flex gap-4'>
        <Avatar src={image} radius='xl' />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            {name}
          </Text>

          <Box w={150}>
            <Text truncate='end' c='dimmed' fz={12}>
              {username}
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

const Followers = () => {
  //Fetching followers
  const { data: followers, isFetching } = useQuery({
    queryKey: ['followers'],
    queryFn: GetAllFollowers,
  })
  const followersData = followers?.data

  return (
    <AppLayout title='Followers'>
      <p> People that follow you</p>

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
    </AppLayout>
  )
}

export default Followers
