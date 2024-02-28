import { CommunityLottie } from '@/assets'
import { Box } from '@mantine/core'
import Lottie from 'lottie-react'
import React from 'react'
import ChButton from '../Button/ChButton'

const Cta = () => {
  return (
    <>
      <Box className='py-10 bg-slate-50'>
        <div className='ch--container'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-10 items-center'>
            <Lottie
              animationData={CommunityLottie}
              className='w-80 lg:w-[600px] mx-auto'
              loop={true}
            />

            <Box className='bg-slate-100 p-5 md:p-10 rounded-xl'>
              <h3 className='text-2xl md:text-4xl font-bold'>
                Write, read and connect with great minds on chatter
              </h3>
              <p className='my-4 text-slate-700'>
                Share people your great ideas, and also read write-ups based on
                your interests. connect with people of same interests and goals.
              </p>

              <ChButton color='#543EE0'>Create an account</ChButton>
            </Box>
          </div>
        </div>
      </Box>
    </>
  )
}

export default Cta
