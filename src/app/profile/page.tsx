'use client'

import {
  Card,
  Avatar,
  Text,
  Group,
  Title,
  Affix,
  Tooltip,
  ActionIcon,
} from '@mantine/core'
import classes from '@/styles/General.module.css'
import AppLayout from '@/layout/AppLayout'
import feeds from '@/services/feedsMock'
import FeedCard from '@/components/Feed/FeedCard'
import { IconPhotoEdit } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
]

const Profile = () => {
  const router = useRouter()

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
        <Avatar
          src='https://avatars.githubusercontent.com/u/67343514?v=4'
          size={80}
          radius={80}
          mx='auto'
        />
        <Text ta='center' fz='lg' fw={500} mt='sm'>
          Joseph Jnr
        </Text>
        <Text ta='center' fz='sm' c='dimmed'>
          Technical Writer
        </Text>
        <Group mt='md' justify='center' gap={30}>
          {items}
        </Group>
      </Card>

      <div className='posts mt-20'>
        <div>
          <Title order={4} mb={50} className={classes.user_header}>
            Posts
          </Title>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
          {feeds.map((feed) => (
            <FeedCard key={feed.id} {...feed} />
          ))}
        </div>
      </div>

      <Affix zIndex={10} position={{ bottom: 40, right: 20 }}>
        <Tooltip label='Create new post'>
          <ActionIcon
            onClick={() => router.push('/feeds/create')}
            variant='filled'
            radius='xl'
            size={50}
            color='#543ee0'
            aria-label='Create feed'
          >
            <IconPhotoEdit size={25} stroke={1.5} />
          </ActionIcon>
        </Tooltip>
      </Affix>
    </AppLayout>
  )
}

export default Profile
