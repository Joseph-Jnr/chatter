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
} from '@mantine/core'
import {
  IconGauge,
  IconLogout,
  IconUsers,
  IconChartBar,
  IconSun,
  IconMoon,
} from '@tabler/icons-react'
import cx from 'clsx'
import classes from '@/styles/SideNav.module.css'
import themeStyles from '@/styles/ActionToggle.module.css'
import LinksGroup from '@/components/LinksGroup'
import { UserButton } from '@/components/UserButton'
import { IconCategory } from '@tabler/icons-react'
import { usePathname } from 'next/navigation'

const SideNav = () => {
  const currentPath = usePathname()

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
        { label: 'Trending', link: '#' },
      ],
    }),
    createLinksGroup({
      label: 'Categories',
      icon: IconCategory,
      links: [
        { label: 'Sports', link: '/category/sports' },
        { label: 'Education', link: '/category/education' },
        { label: 'Web Development', link: '/category/web-development' },
        { label: 'UI/UX Design', link: '/category/uiux-design' },
      ],
    }),

    { label: 'Followers', navLink: '/profile/followers', icon: IconUsers },
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
      <AppShell.Section>
        <div className={classes.user}>
          <UserButton />
        </div>
      </AppShell.Section>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>
      <AppShell.Section>
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
      </AppShell.Section>
    </>
  )
}

export default SideNav
