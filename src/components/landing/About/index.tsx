'use client'

import { AboutImg } from '@/assets'
import { Box, Title } from '@mantine/core'
import Image from 'next/image'

const About = () => {
  return (
    <Box className='py-5 bg-white' id='getstarted'>
      <div className='ch--container grid grid-cols-1 md:grid-cols-2 items-center gap-20'>
        <Box className='order-1 md:order-2'>
          <Title order={2}>About Chatter</Title>
          <p className='mt-5 text-slate-700'>
            Chatter is a multi-functional platform where authors and readers can
            have access to their own content. It aims to be a traditional
            bookworm&apos;s heaven and a blog to get access to more text based
            content. Our vision is to foster an inclusive and vibrant community
            where diversity is celebrated. We encourage open-mindedness and
            respect for all individuals, regardless of their backgrounds or
            beliefs. By promoting dialogue and understanding, we strive.
          </p>
        </Box>
        <Box className='order-1'>
          <Image src={AboutImg} data-aos='fade-up' alt='writer' />
        </Box>
      </div>
    </Box>
  )
}

export default About
