'use client'

import { Dots, Dots2 } from '@/assets'
import { Avatar, Box, Button, Paper, Text } from '@mantine/core'
import Image from 'next/image'
import ChButton from '../Button/ChButton'

const Testimonial = () => {
  return (
    <>
      <Box className='section--padding'>
        <Box className='ch--container'>
          <Paper
            radius='md'
            withBorder
            p='lg'
            bg='var(--mantine-color-body)'
            className='relative overflow-hidden'
          >
            <Image
              src={Dots}
              alt='dots'
              data-aos='fade-down-right'
              className='w-20 absolute top-0 left-0'
            />
            <Image
              src={Dots2}
              alt='dots'
              data-aos='fade-up-left'
              className='w-20 absolute bottom-0 right-0'
            />
            <Avatar
              src='https://avatars.githubusercontent.com/u/67343514?v=4'
              alt='image'
              size={120}
              radius={120}
              mx='auto'
            />
            <Text ta='center' fz='lg' fw={500} mt='md'>
              Joseph Jnr.
            </Text>
            <Text ta='center' c='dimmed' fz='sm'>
              josephjnr@me.io • Software Engineer
            </Text>
            <div className='flex my-5'>
              <p className='w-full md:w-1/2 mx-auto text-center italic text-gray-500 text-sm'>
                &quot;Chatter has become an integral part of my online
                experience. As a user of this incredible blogging platform, I
                have discovered a vibrant community of individuals who are
                passionate about sharing their ideas and engaging in thoughtful
                discussions.&quot;
              </p>
            </div>

            <Box className='flex'>
              <ChButton className='mx-auto mt-5' color='#543EE0'>
                Join Chatter
              </ChButton>
            </Box>
          </Paper>
        </Box>
      </Box>
    </>
  )
}

export default Testimonial
