'use client'

import { useState } from 'react'
import {
  Group,
  Box,
  Collapse,
  ThemeIcon,
  Text,
  UnstyledButton,
  rem,
} from '@mantine/core'
import { IconChevronRight } from '@tabler/icons-react'
import classes from '@/styles/LinksGroup.module.css'
import { useRouter } from 'next/navigation'

interface LinksGroupProps {
  icon: React.FC<any>
  label: string
  initiallyOpened?: boolean
  navLink?: any
  links?: { label: string; link: string }[]
}

const LinksGroup = ({
  icon: Icon,
  label,
  initiallyOpened,
  navLink,
  links,
}: LinksGroupProps) => {
  const router = useRouter()
  const hasLinks = Array.isArray(links)
  const [opened, setOpened] = useState(initiallyOpened || false)
  const handleClick = () => {
    if (hasLinks) {
      setOpened((o) => !o)
    } else {
      router.push(navLink)
    }
  }
  const items = (hasLinks ? links : []).map((link) => (
    <Text<'a'>
      component='a'
      className={classes.link}
      href={link.link}
      key={link.label}
      onClick={() => router.push(link.link)}
    >
      {link.label}
    </Text>
  ))

  return (
    <>
      <UnstyledButton onClick={handleClick} className={classes.control}>
        <Group justify='space-between' gap={0}>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ThemeIcon
              variant='light'
              color={label === 'Log out' ? 'red' : '#543EE0'}
              size={30}
            >
              <Icon style={{ width: rem(18), height: rem(18) }} />
            </ThemeIcon>
            <Box ml='md' className={label === 'Log out' ? 'text-red-500' : ''}>
              {label}
            </Box>
          </Box>
          {hasLinks && (
            <IconChevronRight
              className={classes.chevron}
              stroke={1.5}
              style={{
                width: rem(16),
                height: rem(16),
                transform: opened ? 'rotate(-90deg)' : 'none',
              }}
            />
          )}
        </Group>
      </UnstyledButton>
      {hasLinks ? <Collapse in={opened}>{items}</Collapse> : null}
    </>
  )
}

export default LinksGroup
