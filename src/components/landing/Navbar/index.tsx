'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Box, Flex } from '@mantine/core'
import { useRouter } from 'next/navigation'
import Logo from '../../Logo'
import ChButton from '../../Buttons/ChButton'
import classes from '@/styles/General.module.css'

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
        <Box
          className={`${classes.navbar} ch--container floating--nav`}
          p={{ base: 0, sm: 20 }}
        >
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
              <ChButton onClick={handleClick} color={['#543EE0', 'teal']}>
                Sign in
              </ChButton>
            </Box>
          </Flex>
        </Box>
      </nav>
    </>
  )
}

export default Navbar
