'use client'

import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Title,
  Text,
  Anchor,
  Divider,
  Group,
  rem,
  Loader,
  LoadingOverlay,
} from '@mantine/core'
import classes from '@/styles/AuthStyle.module.css'
import inputClass from '@/styles/InputStyle.module.css'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import ChButton from '@/components/Buttons/ChButton'
import AuthContainer from '@/layout/AuthContainer'
import { GoogleButton } from '@/components/Buttons/GoogleButton'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { AuthGoogle, Login } from '@/services/apis'
import { useEffect, useState } from 'react'
import extractUsernameFromEmail from '@/utils/helpers'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Enter email address')
    .email('Invalid email address'),
  password: yup.string().min(6, 'Invalid password'),
})

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoggingIn, setIsLoggingIn] = useState(false)
  const router = useRouter()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schema),
    validateInputOnChange: ['email'],
    transformValues: (values) => ({
      ...values,
    }),
  })

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      const res = await Login(values)

      notifications.show({
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'green',
        message: 'Authentication Successful.',
      })

      // Set token and log user in
      localStorage.setItem('chatterAuthToken', res?.data)
      router.push('/feeds')
    } catch (error) {
      console.log(error)
      notifications.show({
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'red',
        title: 'Authentication failed!',
        message: 'Incorrect email or password. Try again',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  /* Google Auth */
  const login = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        let googlePayload = {
          first_name: '',
          last_name: '',
          email: '',
          user_name: '',
          imageUrl: '',
        }
        const endpoint = process.env.NEXT_PUBLIC_GOOGLE_SIGN_IN_ENDPOINT
        const res = await axios.get(`${endpoint}`, {
          headers: {
            Authorization: `Bearer ${response.access_token}`,
          },
        })

        if (res.data) {
          const user_name = extractUsernameFromEmail(res.data.email)

          // Convert image to base64
          const base64Image: string = await fetch(res.data.picture)
            .then((res) => res.blob())
            .then(
              (blob) =>
                new Promise((resolve) => {
                  const reader = new FileReader()
                  reader.onloadend = () => resolve(reader.result as string)
                  reader.readAsDataURL(blob)
                })
            )
          googlePayload = {
            first_name: res.data.given_name,
            last_name: res.data.family_name,
            email: res.data.email,
            user_name: user_name,
            imageUrl: base64Image,
          }
        }

        // Send user values gotten from google to the backend endpoint
        setIsLoggingIn(true)
        const res2 = await AuthGoogle(googlePayload)
        if (res2.success === false) {
          setIsLoggingIn(false)
          notifications.show({
            icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
            withCloseButton: false,
            color: 'red',
            title: 'Authentication failed!',
            message: `${res2.message}`,
          })
        } else {
          setIsLoggingIn(false)
          notifications.show({
            icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
            withCloseButton: false,
            color: 'green',
            message: 'Authentication Successful.',
          })
          localStorage.setItem('chatterAuthToken', res2?.data?.token)
          router.push('/feeds')
        }
      } catch (err) {
        console.log(err)
      }
    },
    onError: () => console.log('Login failed'),
  })

  return (
    <AuthContainer>
      <LoadingOverlay
        visible={isLoggingIn}
        zIndex={1000}
        overlayProps={{ radius: 'sm', blur: 2 }}
        loaderProps={{ color: '#543ee0', type: 'bars' }}
      />
      <div className={classes.wrapper}>
        <Paper className={`h-screen ${classes.form}`} radius={0} p={30}>
          <div className='flex'>
            <Logo root='/' className='mx-auto' />
          </div>
          <Title
            order={2}
            className={classes.title}
            ta='center'
            mt='md'
            mb={50}
          >
            Welcome back!
          </Title>

          <form onSubmit={form.onSubmit(handleSubmit)}>
            <TextInput
              type='email'
              label='Email address'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('email')}
            />
            <PasswordInput
              label='Password'
              mt='md'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('password')}
            />
            <Checkbox
              label='Keep me logged in'
              mt='xl'
              classNames={{ input: inputClass.input }}
              size='sm'
            />

            <ChButton
              type='submit'
              disabled={!form.isValid() || isSubmitting}
              className='w-full mt-10'
              color='#543EE0'
            >
              {isSubmitting ? <Loader color='white' size={20} /> : 'Login'}
            </ChButton>
          </form>

          <Text ta='center' mt='md'>
            Don&apos;t have an account?{' '}
            <Anchor<'a'> c='#543EE0' fw={700} href='/register'>
              Register
            </Anchor>
          </Text>

          <Divider
            label='Or continue with'
            labelPosition='center'
            mt='xl'
            my='lg'
          />

          <Group grow mb='md' mt='md'>
            <GoogleButton onClick={() => login()} radius='xl'>
              Google
            </GoogleButton>
          </Group>
        </Paper>
      </div>
    </AuthContainer>
  )
}

export default SignIn
