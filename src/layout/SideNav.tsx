import { Group, Code, ScrollArea, rem } from '@mantine/core'
import {
  IconCalendarStats,
  IconGauge,
  IconPresentationAnalytics,
  IconLogout,
  IconUsers,
} from '@tabler/icons-react'
import classes from '@/styles/SideNav.module.css'
import LinksGroup from '@/components/LinksGroup'
import Logo from '@/components/Logo'
import { UserButton } from '@/components/UserButton'
import { IconCategory } from '@tabler/icons-react'

const mockdata = [
  //{ label: 'Dashboard', icon: IconGauge },
  {
    label: 'Overview',
    icon: IconGauge,
    initiallyOpened: true,
    links: [
      { label: 'Feeds', link: '/' },
      { label: 'Trending', link: '/' },
      { label: 'Mentions', link: '/' },
    ],
  },
  {
    label: 'Categories',
    icon: IconCategory,
    links: [
      { label: 'Sports', link: '/' },
      { label: 'Education', link: '/' },
      { label: 'Web Development', link: '/' },
      { label: 'UI/UX Design', link: '/' },
    ],
  },
  { label: 'Followers', navLink: '/', icon: IconUsers },
  { label: 'Analytics', navLink: '/', icon: IconPresentationAnalytics },
  { label: 'Log out', navLink: '/', icon: IconLogout },
]

const SideNav = () => {
  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ))

  return (
    <nav className={classes.navbar}>
      <div className={classes.header}>
        <Group justify='space-between'>
          <Logo root='/feeds' />
        </Group>
      </div>

      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.footer}>
        <UserButton />
      </div>
    </nav>
  )
}

export default SideNav
