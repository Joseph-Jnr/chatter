'use client'

import {
  UnstyledButton,
  Group,
  Avatar,
  Text,
  rem,
  Box,
  Skeleton,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import classes from '@/styles/UserButton.module.css'
import { useUser, useFetching } from '@/context/useUser'

export function UserButton() {
  const userData = useUser()
  const fetchingData = useFetching()
  const isFetching = fetchingData?.isFetching

  return (
    <>
      {isFetching ? (
        <Skeleton height={70} radius={'md'} />
      ) : (
        <UnstyledButton className={classes.user} component='a' href='/profile'>
          <Group>
            <Avatar src={userData?.userInfo?.imageUrl} radius='xl' />

            <div style={{ flex: 1 }}>
              <Text size='sm' fw={500}>
                {userData?.userInfo?.first_name} {userData?.userInfo?.last_name}
              </Text>

              <Box w={150}>
                <Text truncate='end' c='dimmed' fz={12}>
                  {userData?.userInfo?.email}
                </Text>
              </Box>
            </div>

            <IconChevronRight
              style={{ width: rem(14), height: rem(14) }}
              stroke={1.5}
            />
          </Group>
        </UnstyledButton>
      )}
    </>
  )
}
