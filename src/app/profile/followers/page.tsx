import AppLayout from '@/layout/AppLayout'
import followers from '@/services/followersMock'
import { Avatar, Box, Button, Group, Text } from '@mantine/core'
import React from 'react'

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
  return (
    <AppLayout title='Followers'>
      <p> People that follow you</p>

      <div className='mt-10'>
        {followers.map((follower) => (
          <FollowerCard key={follower.id} {...follower} />
        ))}
      </div>
    </AppLayout>
  )
}

export default Followers
