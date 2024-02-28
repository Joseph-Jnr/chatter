'use client'

import Logo from '@/components/Logo'
import ChButton from '@/components/landing/Button/ChButton'
import { Box, PinInput, Notification, rem } from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const OtpVerification = () => {
  const router = useRouter()
  const [isNotificationVisible, setIsNotificationVisible] = useState(false)
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />

  const handleVerify = () => {
    setIsNotificationVisible(true)

    setTimeout(() => {
      setIsNotificationVisible(false)
      router.push('/feeds')
    }, 5000)
  }

  return (
    <Box className='h-screen flex justify-center relative'>
      <Box className='ch--container mt-20'>
        <div className='flex flex-col gap-10 items-center'>
          <Logo root='/' />
          <div className='flex flex-col gap-2 items-center'>
            <h3 className='text-2xl font-bold'>Enter confirmation code</h3>
            <p className='text-sm text-slate-600 text-center'>
              We emailed you a code. Please input the code here for account
              verification.
            </p>
          </div>
        </div>

        <Box className='flex my-10'>
          <PinInput className='mx-auto' size='xl' placeholder='' oneTimeCode />
        </Box>

        <Box className='flex'>
          <ChButton
            className='w-full mx-auto'
            color='#543EE0'
            onClick={handleVerify}
          >
            Verify
          </ChButton>
        </Box>
      </Box>

      {/* Notification */}
      {isNotificationVisible && (
        <Box className='absolute top-3 bounce-down-animation'>
          <Notification
            icon={checkIcon}
            color='teal'
            title='Verification successful'
            withCloseButton={false}
            mt='md'
          >
            Enjoy the experience!
          </Notification>
        </Box>
      )}
    </Box>
  )
}

export default OtpVerification
