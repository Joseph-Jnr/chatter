'use client'

import Logo from '@/components/Logo'
import ChButton from '@/components/Buttons/ChButton'
import { Box, Paper, PinInput, rem, Text } from '@mantine/core'
import { IconCheck, IconX } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import classes from '@/styles/AuthStyle.module.css'
import inputClasses from '@/styles/InputStyle.module.css'
import AuthContainer from '@/layout/AuthContainer'
import { notifications } from '@mantine/notifications'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'

const schema = yup.object().shape({
  otp: yup.string().required(),
})

const OtpVerification = () => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      otp: '',
    },
    validate: yupResolver(schema),
  })

  const otpValue = {
    otp: '4372',
  }

  const handleVerify = () => {
    if (form.values.otp === otpValue.otp) {
      notifications.show({
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'teal',
        title: 'Verification successful',
        message: 'Enjoy the experience!',
      })

      setTimeout(() => {
        router.push('/feeds')
      }, 5000)
    } else {
      notifications.show({
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'red',
        title: 'Invalid code',
        message: 'Make sure you enter the correct code',
      })
    }
  }

  return (
    <AuthContainer>
      <Box className={`${classes.main} h-screen flex justify-center relative`}>
        <Box className='ch--container mt-20'>
          <div className='flex flex-col gap-10 items-center'>
            <Logo root='/' />
            <div className='flex flex-col gap-2 items-center'>
              <h3 className='text-2xl font-bold'>Enter confirmation code</h3>
              <Text c={'dimmed'} className='text-sm text-center'>
                We emailed you a code. Please input the code here for account
                verification.
              </Text>
            </div>
          </div>

          <form onSubmit={form.onSubmit(handleVerify)}>
            <Box className='flex my-10'>
              <PinInput
                name='otp'
                className='mx-auto'
                size='xl'
                placeholder=''
                classNames={{ input: inputClasses.input }}
                inputType='tel'
                inputMode='numeric'
                oneTimeCode
                {...form.getInputProps('otp')}
              />
            </Box>

            <Box className='flex'>
              <ChButton
                type='submit'
                className='w-full mx-auto'
                color='#543EE0'
              >
                Verify
              </ChButton>
            </Box>
          </form>
        </Box>
      </Box>
    </AuthContainer>
  )
}

export default OtpVerification
