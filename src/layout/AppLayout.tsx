'use client'

import Header from '@/components/Header'
import SideNav from './SideNav'
import { Box, Title } from '@mantine/core'

interface AppLayoutProps {
  children: React.ReactNode
  title: string
}

const AppLayout = ({ children, title }: AppLayoutProps) => {
  return (
    <div className='relative h-screen'>
      <div className='flex'>
        <Box className='z-50'>
          <SideNav />
        </Box>
        <Box pl={300} className='flex flex-col w-full'>
          <Header />
          <Box p={13} py={100}>
            <Box px={{ base: 10, sm: 40 }}>
              <Title mb={60}>{title}</Title>
              {children}
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  )
}

export default AppLayout
