import { Card, Avatar, Text, Group, Button, Title } from '@mantine/core'
import classes from '@/styles/General.module.css'
import AppLayout from '@/layout/AppLayout'
import { IconTemplate } from '@tabler/icons-react'

const stats = [
  { value: '34K', label: 'Followers' },
  { value: '187', label: 'Follows' },
  { value: '1.6K', label: 'Posts' },
]

const User = () => {
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
        <Avatar
          src='https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-9.png'
          size={80}
          radius={80}
          mx='auto'
        />
        <Text ta='center' fz='lg' fw={500} mt='sm'>
          Joseph Jnr
        </Text>
        <Text ta='center' fz='sm' c='dimmed'>
          Frontend engineer
        </Text>
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
      </Card>

      <div className='posts mt-20'>
        {/* <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'></div> */}
        <div>
          <Title order={4} mb={50} className={classes.user_header}>
            Posts
          </Title>
        </div>
        <div className='empty-state flex flex-col items-center gap-3 my-16'>
          <div
            className={`${classes.icon} w-20 h-20 rounded-full flex justify-center items-center`}
          >
            <IconTemplate size={40} />
          </div>
          <h3 className='font-semibold'>No post</h3>
        </div>
      </div>
    </AppLayout>
  )
}

export default User
