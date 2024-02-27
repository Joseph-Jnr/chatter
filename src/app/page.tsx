'use client'
import About from '@/components/About'
import Hero from '@/components/Hero'
import Navbar from '@/components/Navbar'
import WhyJoin from '@/components/WhyJoin.tsx'
import { Box } from '@mantine/core'

export default function Home() {
  return (
    <>
      <Box>
        <Navbar />
        <Hero />
        <About />
        <WhyJoin />
      </Box>
    </>
  )
}
