'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Button, Flex, Text } from '@mantine/core'
import GradientButton from '../Button/GradientButton'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { LogoSvg } from '@/assets'
import Logo from '../../Logo'

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

  const router = useRouter()
  const handleClick = () => {
    router.push('/sign-in')
  }

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
            <Logo root='/' />
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
              <GradientButton onClick={handleClick} text='Sign in' />
            </Box>
          </Flex>
        </Box>
      </nav>
    </>
  )
}

export default Navbar
