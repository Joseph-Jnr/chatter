import { UnstyledButton, Group, Avatar, Text, rem, Box } from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import classes from '@/styles/UserButton.module.css'
import { useRouter } from 'next/navigation'

export function UserButton() {
  const router = useRouter()

  return (
    <UnstyledButton
      className={classes.user}
      onClick={() => router.push('/profile')}
    >
      <Group>
        <Avatar
          src='https://avatars.githubusercontent.com/u/67343514?v=4'
          radius='xl'
        />

        <div style={{ flex: 1 }}>
          <Text size='sm' fw={500}>
            Joseph Jnr
          </Text>

          <Box w={150}>
            <Text truncate='end' c='dimmed' fz={12}>
              josephjnr@gmail.com
            </Text>
          </Box>
        </div>

        <IconChevronRight
          style={{ width: rem(14), height: rem(14) }}
          stroke={1.5}
        />
      </Group>
    </UnstyledButton>
  )
}
