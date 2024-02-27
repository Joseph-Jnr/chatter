'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Button, Flex, Text } from '@mantine/core'
import GradientButton from '../Button/GradientButton'

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      setIsSticky(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <>
      <nav
        className={`floating--nav--wrap ch--container ${
          isSticky ? 'sticky' : ''
        }`}
      >
        <Box className='ch--container floating--nav' p={{ base: 0, sm: 20 }}>
          <Flex
            justify='space-between'
            align='center'
            gap={30}
            className='px-3'
          >
            <Link href='/' className='brand--logo'>
              <Text fw='bolder' size='xl'>
                Chatter
              </Text>
            </Link>
            <Box className='nav--links'>
              <ul className='flex'>
                <Link href='/'>
                  <li>Products</li>
                </Link>
                <Link href='/'>
                  <li>About</li>
                </Link>
                <Link href='/'>
                  <li>Blog</li>
                </Link>
              </ul>
            </Box>

            <Box className='nav--button relative'>
              <GradientButton text='Sign in' />
            </Box>
          </Flex>
        </Box>
      </nav>
    </>
  )
}

export default Navbar
