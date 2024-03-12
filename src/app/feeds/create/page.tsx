'use client'

import ChButton from '@/components/Buttons/ChButton'
import AppLayout from '@/layout/AppLayout'
import {
  Alert,
  Button,
  Card,
  Group,
  NumberInput,
  Select,
  TagsInput,
  TextInput,
  Title,
} from '@mantine/core'
import classes from '@/styles/InputStyle.module.css'
import Editor from '@/components/Editor'
import { IconInfoCircle } from '@tabler/icons-react'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'
import { useCallback } from 'react'

const schema = yup.object().shape({
  content: yup.string().required('Content is required'),
  excerpt: yup.string().required('Enter excerpt'),
  duration: yup.string().required('This field is required'),
  category: yup.string().required('Select a category'),
  tags: yup.array(),
})

const CreateFeed = () => {
  const form = useForm({
    initialValues: {
      content: '',
      excerpt: '',
      duration: '',
      category: '',
      tags: [],
    },
    validate: yupResolver(schema),
    //validateInputOnChange: ['email'],
  })

  const handleSubmit = () => {
    console.log(form.values)
  }

  return (
    <AppLayout title='New Post'>
      <>
        <div className='mb-10'>
          <Alert
            variant='light'
            color='yellow'
            title='Info'
            icon={<IconInfoCircle />}
          >
            This input supports markdown. Feel free to use it for your post!
          </Alert>
        </div>
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <div className='grid grid-cols-1 gap-10 md:gap-20'>
            <div className='textarea'>
              <Editor />
            </div>

            <Card withBorder radius='md' className='aux-input p-5'>
              <Title order={4} mb='lg'>
                Additional info
              </Title>
              <TextInput
                label='Excerpt'
                description='A brief intro for your post.'
                classNames={{ input: classes.input }}
                {...form.getInputProps('excerpt')}
                size='sm'
              />
              <NumberInput
                label='Estimated read time'
                suffix='mins'
                mt={'md'}
                size='sm'
                placeholder='Enter time in minutes'
                classNames={{ input: classes.input }}
                {...form.getInputProps('duration')}
              />
              <Select
                label='Category'
                data={[
                  'Sports',
                  'Education',
                  'Web Development',
                  'UI/UX Design',
                ]}
                mt='md'
                size='sm'
                classNames={{ input: classes.input, option: classes.option }}
                {...form.getInputProps('category')}
              />
              <TagsInput
                label='Tags'
                description='Add up to 5 tags'
                maxTags={5}
                mt='md'
                classNames={{ input: classes.input }}
                {...form.getInputProps('tags')}
              />
            </Card>

            <Group>
              <ChButton
                type='submit'
                disabled={!form.isValid()}
                color='#543ee0'
              >
                Post
              </ChButton>
              <Button variant='default' radius='xl' size='md'>
                Cancel
              </Button>
            </Group>
          </div>
        </form>
      </>
    </AppLayout>
  )
}

export default CreateFeed
