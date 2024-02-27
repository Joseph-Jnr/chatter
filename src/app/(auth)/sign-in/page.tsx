'use client'

import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from '@mantine/core'
import classes from '@/styles/AuthStyle.module.css'
import { nprogress } from '@mantine/nprogress'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'

const SignIn = () => {
  const router = useRouter()
  const handleClick = () => {
    nprogress.start()
    router.push('/register')
  }
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <div className='flex'>
          <Logo root='/' className='mx-auto' />
        </div>
        <Title order={2} className={classes.title} ta='center' mt='md' mb={50}>
          Welcome back!
        </Title>

        <TextInput
          label='Email address'
          placeholder='hello@gmail.com'
          size='md'
        />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          size='md'
        />
        <Checkbox label='Keep me logged in' mt='xl' size='md' />
        <Button fullWidth mt='xl' size='md'>
          Login
        </Button>

        <Text ta='center' mt='md'>
          Don&apos;t have an account?{' '}
          <Anchor<'div'> fw={700} onClick={handleClick}>
            Register
          </Anchor>
        </Text>
      </Paper>
    </div>
  )
}

export default SignIn
