'use client'

import Header from '@/components/Header'
import SideNav from './SideNav'
import {
  AppShell,
  Group,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'
import { useLayoutEffect } from 'react'
import { isAuthenticated } from '@/utils/Auth'
import { redirect, usePathname } from 'next/navigation'
import { UserProvider } from '@/context/useUser'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const currentRoute = usePathname()
  //Check is user is authenticated

  /*  useLayoutEffect(() => {
    const isAuth = isAuthenticated

    // Skip redirection to sign-in page if user is on the '/feeds/[slug]' route
    if (
      !isAuth &&
      currentRoute !== '/sign-in' &&
      !currentRoute.startsWith('/feeds/')
    ) {
      redirect('/sign-in')
    }
  }, []) */

  const [opened, { toggle }] = useDisclosure()

  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const bg =
    colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{ width: 300, breakpoint: 'sm', collapsed: { mobile: !opened } }}
      padding='md'
    >
      <AppShell.Header>
        <Group
          h='100%'
          className={`flex items-center ${
            isAuthenticated ? 'justify-between' : ''
          }`}
          px='md'
        >
          <Header openNav={opened} onClick={toggle} />
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p='md'>
        <SideNav isAuthenticated={isAuthenticated} />
      </AppShell.Navbar>
      <AppShell.Main c={color} bg={bg} pb={100}>
        <Title order={2} mb={30}>
          {title}
        </Title>
        {children}
      </AppShell.Main>
    </AppShell>
  )
}

export default AppLayout
