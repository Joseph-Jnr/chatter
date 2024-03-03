'use client'

import {
  ActionIcon,
  Avatar,
  Box,
  Group,
  Modal,
  TextInput,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import cx from 'clsx'
import classes from '@/styles/ActionToggle.module.css'
import { IconMenu2, IconMoon, IconSearch, IconSun } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'

const Header = () => {
  const [opened, { open, close }] = useDisclosure(false)
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })
  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />

  return (
    <Box
      py={10}
      px={13}
      ml={300}
      className='app-header flex justify-between items-center sticky z-50'
    >
      <IconMenu2 className='md:hidden' />
      <TextInput
        leftSectionPointerEvents='none'
        leftSection={icon}
        placeholder='Search'
        className='hidden md:block'
        onClick={open}
        radius='xl'
      />
      <Group>
        <Group justify='center'>
          <ActionIcon
            onClick={() =>
              setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
            }
            variant='default'
            radius='xl'
            size='xl'
            aria-label='Toggle color scheme'
          >
            <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
            <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
          </ActionIcon>
        </Group>
        <Avatar
          src='https://avatars.githubusercontent.com/u/67343514?v=4'
          alt='user profile'
        />
      </Group>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        title='Search'
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        {/* Modal content */}
      </Modal>
    </Box>
  )
}

export default Header
