'use client'

import Header from '@/components/Header'
import SideNav from './SideNav'
import {
  Box,
  Paper,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { useState } from 'react'

interface AppLayoutProps {
  children: React.ReactNode
  title?: string
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  const [isNavVisible, setIsNavVisible] = useState(false)

  const toggleSideNav = () => {
    setIsNavVisible(!isNavVisible)
  }

  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const bg =
    colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  return (
    <div className='relative h-screen'>
      <div className='flex'>
        <Box className='z-50'>
          <SideNav isNavVisible={isNavVisible} />
        </Box>
        <Box ml={{ base: 0, sm: 300 }} className='flex flex-col w-full'>
          <Header toggleSideNav={toggleSideNav} />
          <Box c={color} mih={'100vh'} bg={bg} p={13} py={100}>
            <Box px={{ base: 4, sm: 40 }} pos={'relative'}>
              <Title order={2} mb={30}>
                {title}
              </Title>
              {children}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default AppLayout
