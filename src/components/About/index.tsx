'use client'

import { AboutImg } from '@/assets'
import { Box, Flex } from '@mantine/core'
import Image from 'next/image'

const About = () => {
  return (
    <>
      <Box className='section--padding bg-slate-50'>
        <Flex
          direction={{ base: 'column-reverse', sm: 'row' }}
          align='center'
          justify='space-between'
        >
          <Image src={AboutImg} alt='writer' />
        </Flex>
      </Box>
    </>
  )
}

export default About
