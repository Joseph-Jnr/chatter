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
  Group,
  Select,
} from '@mantine/core'
import classes from '@/styles/AuthStyle.module.css'
import Logo from '@/components/Logo'

const Register = () => {
  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
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
          />
          <TextInput
            label='Last name'
            className='w-full md:w-auto'
            placeholder='Doe'
            size='sm'
          />
        </Group>
        <Select
          label='You are joining as?'
          placeholder='Choose status'
          data={['Reader', 'Writer']}
          mt='md'
          size='sm'
        />
        <TextInput
          label='Email address'
          placeholder='hello@gmail.com'
          mt='md'
          size='sm'
        />
        <PasswordInput
          label='Password'
          placeholder='Your password'
          mt='md'
          size='sm'
        />
        <PasswordInput
          label='Confirm password'
          placeholder='Re-type password'
          mt='md'
          size='sm'
        />
        <Button fullWidth mt='xl' radius='xl' color='#543EE0' size='md'>
          Register
        </Button>
      </Paper>
    </div>
  )
}

export default Register
