import AppLayout from '@/layout/AppLayout'
import { Group, Paper, SimpleGrid, Text } from '@mantine/core'
import {
  IconEye,
  IconBookmark,
  IconThumbUp,
  IconNews,
} from '@tabler/icons-react'

const icons = {
  post: IconNews,
  like: IconThumbUp,
  bookmark: IconBookmark,
  view: IconEye,
}

const data = [
  { title: 'Posts', icon: 'post', value: '13,456', diff: 34 },
  { title: 'Likes', icon: 'like', value: '4,145', diff: -13 },
  { title: 'Bookmarks', icon: 'bookmark', value: '745', diff: 18 },
  { title: 'Views', icon: 'view', value: '188', diff: -30 },
] as const

const Analytics = () => {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon]

    return (
      <Paper withBorder p='md' radius='md' key={stat.title}>
        <Group justify='space-between'>
          <Text size='xs' c='dimmed' className={''}>
            {stat.title}
          </Text>
          <Icon className={''} size='1.4rem' stroke={1.5} />
        </Group>

        <Group align='flex-end' gap='xs' mt={25}>
          <Text className={''}>{stat.value}</Text>
        </Group>

        <Text fz='xs' c='dimmed' mt={7}>
          Total amount of <span className='lowercase'>{stat.title}</span>
        </Text>
      </Paper>
    )
  })
  return (
    <AppLayout title='Analytics'>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>{stats}</SimpleGrid>
    </AppLayout>
  )
}

export default Analytics
