import { Anchor, Box, Group, Text, rem } from '@mantine/core'
import Link from 'next/link'
import Logo from '../../Logo'

const links = [
  { link: '#', label: 'Products' },
  { link: '#', label: 'About' },
  { link: '#', label: 'Blog' },
  { link: '#', label: 'Careers' },
]

const Footer = () => {
  const items = links.map((link) => (
    <Anchor<'a'>
      c='black'
      key={link.label}
      href={link.link}
      onClick={(event) => event.preventDefault()}
      size='sm'
    >
      {link.label}
    </Anchor>
  ))

  return (
    <footer className='py-5 bg-white'>
      <Box className='ch--container flex justify-between items-center flex-col md:flex-row gap-8'>
        <Logo root='/' />
        <Group>{items}</Group>
      </Box>
    </footer>
  )
}

export default Footer
