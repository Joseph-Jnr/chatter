import {
  ActionIcon,
  Anchor,
  Box,
  Group,
  useComputedColorScheme,
  useMantineColorScheme,
} from '@mantine/core'
import cx from 'clsx'
import classes from '@/styles/General.module.css'
import themeStyles from '@/styles/ActionToggle.module.css'
import Logo from '../../Logo'
import { IconSun } from '@tabler/icons-react'
import { IconMoon } from '@tabler/icons-react'

const links = [
  { link: '#', label: 'Products' },
  { link: '#', label: 'About' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
]

const Footer = () => {
  const { setColorScheme } = useMantineColorScheme()
  const computedColorScheme = useComputedColorScheme('light', {
    getInitialValueInEffect: true,
  })

  const items = links.map((link) => (
    <Anchor<'a'>
      key={link.label}
      href={link.link}
      className={classes.footer_links}
      onClick={(event) => event.preventDefault()}
      size='sm'
    >
      {link.label}
    </Anchor>
  ))

  return (
    <footer className={`${classes.footer} py-5`}>
      <Box className='ch--container flex justify-between items-center flex-col md:flex-row gap-8'>
        <Logo root='/' />
        <Group>{items}</Group>
        <div
          className='flex items-center gap-4 cursor-pointer'
          onClick={() =>
            setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')
          }
        >
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
          <p className='text-sm'>
            {computedColorScheme === 'light' ? 'Dark mode' : 'Light mode'}
          </p>
        </div>
      </Box>
    </footer>
  )
}

export default Footer
