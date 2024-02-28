'use client'

import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Title,
  Text,
  Anchor,
} from '@mantine/core'
import classes from '@/styles/AuthStyle.module.css'
import { useRouter } from 'next/navigation'
import Logo from '@/components/Logo'
import ChButton from '@/components/landing/Button/ChButton'

const SignIn = () => {
  const router = useRouter()

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
          size='sm'
        />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          size='sm'
        />
        <Checkbox label='Keep me logged in' mt='xl' size='md' />

        <ChButton
          className='w-full mt-10'
          onClick={() => router.push('/feeds')}
          color='#543EE0'
        >
          Login
        </ChButton>

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
      </Paper>
    </div>
  )
}

export default SignIn
