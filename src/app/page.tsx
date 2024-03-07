'use client'

import { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import About from '@/components/landing/About'
import Cta from '@/components/landing/Cta'
import Footer from '@/components/landing/Footer'
import Hero from '@/components/landing/Hero'
import Navbar from '@/components/landing/Navbar'
import Testimonial from '@/components/landing/Testimonial'
import WhyJoin from '@/components/landing/WhyJoin.tsx'
import { Box, Paper } from '@mantine/core'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 2000,
    })
  }, [])

  return (
    <>
      <Box>
        <Navbar />
        <Hero />
        <About />
        <WhyJoin />
        <Testimonial />
        <Cta />
        <Footer />
      </Box>
    </>
  )
}
