'use client'

import { Card, Avatar, Text, Group, Button, Title } from '@mantine/core'
import classes from '@/styles/General.module.css'
import AppLayout from '@/layout/AppLayout'
import { IconTemplate } from '@tabler/icons-react'
import EmptyState from '@/components/EmptyState'
import { useParams } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { GetUser } from '@/services/apis'
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton'
import { useState } from 'react'

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
]

const User = () => {
  const { user } = useParams<{ user: string; item: string }>()
  const [isFollowing, setIsFollowing] = useState(false)

  //Fetching user info
  const { data: userData, isFetching } = useQuery({
    queryKey: ['userData'],
    queryFn: () => GetUser(user),
  })

  const userInfo = userData?.data

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
    <AppLayout>
      <Card withBorder padding='xl' radius='md'>
        {isFetching ? (
          <ProfileSkeleton />
        ) : (
          <>
            {userInfo && (
              <>
                <Avatar
                  src={userInfo?.imageUrl}
                  size={80}
                  radius={80}
                  mx='auto'
                />
                <div className='text-center'>
                  <Text ta='center' fz='lg' fw={500} mt='sm'>
                    <span className='capitalize'>{userInfo?.first_name}</span>{' '}
                    <span className='capitalize'>{userInfo?.last_name}</span>
                  </Text>
                  <Text className='text-sm' mb={'md'}>
                    @{userInfo?.user_name}
                  </Text>
                  <Text ta='center' className='capitalize' fz='sm' c='dimmed'>
                    {userInfo?.role}
                  </Text>
                </div>
                <Group mt='md' justify='center' gap={30}>
                  {items}
                </Group>
                <Button
                  w={{ base: '100%', sm: 'fit-content' }}
                  radius='md'
                  mt='xl'
                  mx='auto'
                  size='md'
                  variant='default'
                >
                  Follow
                </Button>
              </>
            )}
          </>
        )}
      </Card>

      <div className='posts mt-20'>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'></div> */}
        <div>
          <Title order={4} mb={50} className={classes.user_header}>
            Posts
          </Title>
        </div>
        <EmptyState icon={<IconTemplate size={40} />} title='No Post yet' />
        {/* <div className='empty-state flex flex-col items-center gap-3 my-16'>
          <div
            className={`${classes.icon} w-20 h-20 rounded-full flex justify-center items-center`}
          >
            <IconTemplate size={40} />
          </div>
          <h3 className='font-semibold'>No post</h3>
        </div> */}
      </div>
    </AppLayout>
  )
}

export default User
