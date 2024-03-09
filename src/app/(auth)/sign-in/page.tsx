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
} from '@mantine/core'
import classes from '@/styles/AuthStyle.module.css'
import inputClass from '@/styles/InputStyle.module.css'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import ChButton from '@/components/Buttons/ChButton'
import AuthContainer from '@/layout/AuthContainer'
import { GoogleButton } from '@/components/Buttons/GoogleButton'
import { TwitterButton } from '@/components/Buttons/TwitterButton'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'

const schema = yup.object().shape({
  email: yup
    .string()
    .required('Enter email address')
    .email('Invalid email address'),
  password: yup.string().min(6, 'Invalid password'),
})

const SignIn = () => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: yupResolver(schema),
  })

  const loginCredentials = {
    email: 'jojo123@gmail.com',
    password: 'password',
  }

  const handleSubmit = () => {
    console.log(form.values)

    if (form.values === loginCredentials) {
      router.push('/feeds')
    } else {
      notifications.show({
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'red',
        title: 'Authentication failed!',
        message: 'Incorrect email or password. Try again',
      })
    }
  }

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

            <ChButton type='submit' className='w-full mt-10' color='#543EE0'>
              Login
            </ChButton>
          </form>

          <Text ta='center' mt='md'>
            Don&apos;t have an account?
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

          <Group grow mb='md' mt='md'>
            <GoogleButton radius='xl'>Google</GoogleButton>
            <TwitterButton radius='xl'>Twitter</TwitterButton>
          </Group>
        </Paper>
      </div>
    </AuthContainer>
  )
}

export default SignIn
