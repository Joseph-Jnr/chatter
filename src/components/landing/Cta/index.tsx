import { CommunityLottie } from '@/assets'
import { Box } from '@mantine/core'
import Lottie from 'lottie-react'
import React from 'react'
import { useRouter } from 'next/navigation'
import ChButton from '../../Buttons/ChButton'

const Cta = () => {
  const router = useRouter()
  return (
    <>
      <Box className='pb-20 mb:pb-0'>
        <div className='ch--container'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
            <div className='flex'>
              <Lottie
                animationData={CommunityLottie}
                className='w-auto lg:w-[600px] mx-auto'
                loop={true}
              />
            </div>

            <Box className='bg-[#543EE0] p-5 md:p-10 rounded-xl'>
              <h3 className='text-2xl md:text-4xl font-bold text-white'>
                Write, read and connect with great minds on chatter
              </h3>
              <p className='my-4 text-gray-300'>
                Share people your great ideas, and also read write-ups based on
                your interests. connect with people of same interests and goals.
              </p>

              <ChButton
                color='white'
                variant='outline'
                onClick={() => router.push('/register')}
              >
                Create an account
              </ChButton>
            </Box>
          </div>
        </div>
      </Box>
    </>
  )
}

export default Cta
