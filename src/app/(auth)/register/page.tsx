'use client'

import {
  Paper,
  TextInput,
  PasswordInput,
  Title,
  Text,
  Group,
  Select,
  Loader,
  rem,
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
import { useState } from 'react'
import { AuthRegister } from '@/services/apis'
import { notifications } from '@mantine/notifications'
import { IconAlertHexagon, IconCheck, IconX } from '@tabler/icons-react'

const schema = yup.object().shape({
  first_name: yup.string().required('This field is required'),
  last_name: yup.string().required('This field is required'),
  //role: yup.string().required('This field is required'),
  email: yup
    .string()
    .required('Enter email address')
    .email('Invalid email address'),
  user_name: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords do not match')
    .required('Please confirm your password'),
})

const Register = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const form = useForm({
    initialValues: {
      first_name: '',
      last_name: '',
      email: '',
      user_name: '',
      password: '',
    },
    validate: yupResolver(schema),
    validateInputOnChange: ['email', 'confirmPassword'],
    transformValues: (values) => ({
      ...values,
    }),
  })

  //console.log(form.values)

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      // Omit confirmPassword from form values
      const { confirmPassword, ...formData } = values

      const res = await AuthRegister(formData)
      console.log(res)
      if (res?.success === true) {
        notifications.show({
          icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
          withCloseButton: false,
          color: 'green',
          title: 'Registration Successful!',
          message: 'Enjoy the experience.',
        })
        router.push('/sign-in')
      } else {
        notifications.show({
          icon: (
            <IconAlertHexagon style={{ width: rem(20), height: rem(20) }} />
          ),
          withCloseButton: false,
          color: 'red',
          title: 'Oops!',
          message: res?.message,
        })
      }
    } catch (error) {
      console.log(error)
      notifications.show({
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'red',
        title: 'Registration failed!',
        message: 'Something went wrong. Try again',
      })
    } finally {
      setIsSubmitting(false)
    }
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
          Create an account whether you are a reader or an author
        </Text>

        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Group>
            <TextInput
              label='First name'
              className='w-full md:w-auto'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('first_name')}
            />
            <TextInput
              label='Last name'
              className='w-full md:w-auto'
              size='sm'
              classNames={{ input: inputClass.input }}
              {...form.getInputProps('last_name')}
            />
          </Group>
          {/* <Select
            label='You are joining as?'
            placeholder='Choose status'
            data={['Reader', 'Author']}
            allowDeselect={false}
            comboboxProps={{
              transitionProps: { transition: 'pop', duration: 200 },
            }}
            mt='md'
            size='sm'
            classNames={{ input: inputClass.input, option: inputClass.option }}
            {...form.getInputProps('role')}
          /> */}
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
              {...form.getInputProps('user_name')}
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
            disabled={!form.isValid() || isSubmitting}
            className='w-full mt-10'
            color='#543EE0'
          >
            {isSubmitting ? <Loader color='white' size={20} /> : 'Register'}
          </ChButton>
        </form>
      </Paper>
    </div>
  )
}

export default Register
