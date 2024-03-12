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
import { IconX } from '@tabler/icons-react'
import { GoogleLogin, useGoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'
import { Login } from '@/services/apis'
import { useState } from 'react'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Enter email address')
    .email('Invalid email address'),
  password: yup.string().min(6, 'Invalid password'),
})

const SignIn = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
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
      console.log(res)
      //localStorage.setItem('chatterAuthToken', res?.data)
      //router.push('/feeds')
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
    /* onSuccess: (tokenResponse) => {
      console.log(tokenResponse)
    }, */
    onSuccess: async (response) => {
      try {
        const res = await axios.get(
          'https://www.googleapis.com/oauth2/v3/userinfo',
          {
            headers: {
              Authorization: `Bearer ${response.access_token}`,
            },
          }
        )
        console.log(res)
      } catch (err) {
        console.log(err)
      }
    },
    onError: () => console.log('Login failed'),
  })

  return (
    <AuthContainer>
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
            <Anchor<'div'>
              c='#543EE0'
              fw={700}
              onClick={() => router.push('/register')}
            >
              Register
            </Anchor>
          </Text>

          <Divider
            label='Or continue with'
            labelPosition='center'
            mt='xl'
            my='lg'
          />

          {/* <div className='flex justify-center'>
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decodedResponse = jwtDecode(
                  credentialResponse?.credential
                )
                console.log(decodedResponse)
              }}
              onError={() => {
                console.log('Login failed')
              }}
            />
          </div> */}

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
