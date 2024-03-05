'use client'

import {
  Paper,
  TextInput,
  PasswordInput,
  Title,
  Text,
  Group,
  Select,
} from '@mantine/core'
import classes from '@/styles/AuthStyle.module.css'
import inputClass from '@/styles/InputStyle.module.css'
import Logo from '@/components/Logo'
import ChButton from '@/components/landing/Button/ChButton'
import { useRouter } from 'next/navigation'

const Register = () => {
  const router = useRouter()

  return (
    <div className={classes.wrapper}>
      <Paper className={`h-auto md:h-screen ${classes.form}`} radius={0} p={30}>
        <div className='flex'>
          <Logo root='/' className='mx-auto' />
        </div>
        <Title order={2} className={classes.title} ta='center' mt='md'>
          Register!
        </Title>
        <Text my={10} mb={50} fz='sm' c='gray' ta='center'>
          Create an account whether you are a reader or writer
        </Text>

        <Group>
          <TextInput
            label='First name'
            className='w-full md:w-auto'
            placeholder='John'
            size='sm'
            classNames={{ input: inputClass.input }}
          />
          <TextInput
            label='Last name'
            className='w-full md:w-auto'
            placeholder='Doe'
            size='sm'
            classNames={{ input: inputClass.input }}
          />
        </Group>
        <Select
          label='You are joining as?'
          placeholder='Choose status'
          data={['Reader', 'Writer']}
          mt='md'
          size='sm'
          classNames={{ input: inputClass.input }}
        />
        <Group>
          <TextInput
            label='Email address'
            className='w-full md:w-auto'
            placeholder='hello@gmail.com'
            type='email'
            mt='md'
            size='sm'
            classNames={{ input: inputClass.input }}
          />
          <TextInput
            label='Username'
            className='w-full md:w-auto'
            mt='md'
            size='sm'
            classNames={{ input: inputClass.input }}
          />
        </Group>
        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          size='sm'
          classNames={{ input: inputClass.input }}
        />
        <PasswordInput
          label='Confirm password'
          placeholder='Re-type password'
          mt='md'
          size='sm'
          classNames={{ input: inputClass.input }}
        />

        <ChButton
          className='w-full mt-10'
          color='#543EE0'
          onClick={() => router.push('/otp-verification')}
        >
          Register
        </ChButton>
      </Paper>
    </div>
  )
}

export default Register
