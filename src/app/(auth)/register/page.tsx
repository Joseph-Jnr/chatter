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
import ChButton from '@/components/Buttons/ChButton'
import { useRouter } from 'next/navigation'
import PasswordStrengthCheck from '@/components/Auth/PasswordStrengthCheck'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'

const schema = yup.object().shape({
  firstName: yup.string().required('This field is required'),
  lastName: yup.string().required('This field is required'),
  status: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('Enter email address')
    .email('Invalid email address'),
  username: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

const Register = () => {
  const router = useRouter()

  const form = useForm({
    initialValues: {
      firstName: '',
      lastName: '',
      status: '',
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validate: yupResolver(schema),
    validateInputOnChange: ['email', 'confirmPassword'],
  })

  const handleSubmit = () => {
    console.log(form.values)
    //router.push('/otp-verification')
  }

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

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group>
            <TextInput
              label='First name'
              className='w-full md:w-auto'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('firstName')}
            />
            <TextInput
              label='Last name'
              className='w-full md:w-auto'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('lastName')}
            />
          </Group>
          <Select
            label='You are joining as?'
            placeholder='Choose status'
            data={['Reader', 'Writer']}
            allowDeselect={false}
            comboboxProps={{
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            mt='md'
            size='sm'
            classNames={{ input: inputClass.input, option: inputClass.option }}
            {...form.getInputProps('status')}
          />
          <Group>
            <TextInput
              label='Email address'
              className='w-full md:w-auto'
              type='email'
              mt='md'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('email')}
            />
            <TextInput
              label='Username'
              className='w-full md:w-auto'
              mt='md'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('username')}
            />
          </Group>
          <PasswordStrengthCheck
            onChange={(value) => {
              form.setFieldValue('password', value)
            }}
            value={form.values.password}
          >
            <PasswordInput
              label='Password'
              placeholder='Choose a password'
              mt='md'
              size='sm'
              classNames={{ input: inputClass.input }}
              value={form.values.password}
              {...form.getInputProps('password')}
            />
          </PasswordStrengthCheck>
          <PasswordInput
            label='Confirm password'
            placeholder='Re-type password'
            mt='md'
            size='sm'
            classNames={{ input: inputClass.input }}
            {...form.getInputProps('confirmPassword')}
          />

          <ChButton
            type='submit'
            disabled={!form.isValid()}
            className='w-full mt-10'
            color='#543EE0'
          >
            Register
          </ChButton>
        </form>
      </Paper>
    </div>
  )
}

export default Register
