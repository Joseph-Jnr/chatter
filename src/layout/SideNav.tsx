'use client'

import {
  Group,
  ScrollArea,
  useMantineColorScheme,
  useComputedColorScheme,
  ActionIcon,
  useMantineTheme,
  Text,
  AppShell,
  Card,
  Title,
  Skeleton,
} from '@mantine/core'
import {
  IconGauge,
  IconLogout,
  IconUsers,
  IconChartBar,
  IconSun,
  IconMoon,
  IconExclamationCircle,
} from '@tabler/icons-react'
import cx from 'clsx'
import classes from '@/styles/SideNav.module.css'
import themeStyles from '@/styles/ActionToggle.module.css'
import LinksGroup from '@/components/LinksGroup'
import { UserButton } from '@/components/UserButton'
import { IconCategory } from '@tabler/icons-react'
import { usePathname, useRouter } from 'next/navigation'
import ChButton from '@/components/Buttons/ChButton'
import { useQuery } from '@tanstack/react-query'
import { GetProfile } from '@/services/apis'

const SideNav = ({ isAuthenticated }: any) => {
  const currentPath = usePathname()
  const router = useRouter()

  //Fetching profile
  const { data: profile, isFetching } = useQuery({
    queryKey: ['profile'],
    queryFn: GetProfile,
  })

  const createLinksGroup = ({ label, icon, links, navLink }: any) => {
    const isNavLink = !!navLink
    const groupLinks = links || []

    return {
      label,
      icon,
      initiallyOpened: isNavLink
        ? currentPath === navLink
        : groupLinks.some((link: any) => currentPath === link.link),
      links: groupLinks,
      navLink: isNavLink ? navLink : undefined,
    }
  }

  const mockdata = [
    createLinksGroup({
      label: 'Overview',
      icon: IconGauge,
      links: [
        { label: 'Feeds', link: '/feeds' },
        { label: 'Bookmarks', link: '/feeds/bookmarks' },
        { label: 'Trending', link: '/feeds/trending' },
      ],
    }),
    createLinksGroup({
      label: 'Categories',
      icon: IconCategory,
      links: [
        { label: 'Sports', link: '/category/sports' },
        { label: 'Education', link: '/category/education' },
        { label: 'Programming', link: '/category/programming' },
        { label: 'Design', link: '/category/design' },
        { label: 'Lifestyle', link: '/category/lifestyle' },
        { label: 'Finance', link: '/category/finance' },
      ],
    }),

    { label: 'Friends', navLink: '/profile/friends', icon: IconUsers },
    { label: 'Analytics', navLink: '/analytics', icon: IconChartBar },
    { label: 'Log out', navLink: '/sign-in', icon: IconLogout },
  ]

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  const theme = useMantineTheme()

  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  return (
    <>
      {isAuthenticated ? (
        <>
          <AppShell.Section>
            <div className={classes.user}>
              <UserButton />
            </div>
          </AppShell.Section>
          <ScrollArea className={classes.links}>
            {isFetching ? (
              <div className={`${classes.linksInner} flex flex-col gap-5 px-5`}>
                {[...Array(5)].map((_, index) => (
                  <Skeleton height={30} key={index} />
                ))}
              </div>
            ) : (
              <div className={classes.linksInner}>{links}</div>
            )}
          </ScrollArea>
        </>
      ) : (
        <Card my={100} padding='lg' radius='md' className='text-center'>
          <div className='flex justify-center'>
            <IconExclamationCircle color='orange' size={60} />
          </div>

          <Title c={color} my={5} order={3}>
            Access Restricted
          </Title>

          <Text size='sm' mb={40} c='dimmed'>
            Login or create an account to access all features of Chatter.
          </Text>

          <ChButton onClick={() => router.push('/sign-in')} color={'#544ee0'}>
            Login
          </ChButton>
        </Card>
      )}

      <AppShell.Section>
        {isFetching ? (
          <Skeleton height={30} />
        ) : (
          <Group
            justify='start'
            py={20}
            className='hover:cursor-pointer'
            onClick={() =>
              setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
            }
          >
            <div className='flex items-center gap-4'>
              <ActionIcon
                variant='default'
                radius='xl'
                size='lg'
                aria-label='Toggle color scheme'
              >
                <IconSun
                  className={cx(themeStyles.icon, themeStyles.light)}
                  stroke={1.5}
                />
                <IconMoon
                  className={cx(themeStyles.icon, themeStyles.dark)}
                  stroke={1.5}
                />
              </ActionIcon>
              <Text c={color} className='text-sm'>
                {computedColorScheme === 'light' ? 'Dark mode' : 'Light mode'}
              </Text>
            </div>
          </Group>
        )}
      </AppShell.Section>
    </>
  )
}

export default SideNav
