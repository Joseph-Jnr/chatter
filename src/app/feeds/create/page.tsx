'use client'

import ChButton from '@/components/Buttons/ChButton'
import AppLayout from '@/layout/AppLayout'
import {
  Alert,
  Box,
  Button,
  Card,
  Group,
  Image,
  Loader,
  NumberInput,
  Select,
  TagsInput,
  Text,
  TextInput,
  Textarea,
  Title,
  rem,
} from '@mantine/core'
import classes from '@/styles/InputStyle.module.css'
import Editor from '@/components/Editor'
import {
  IconCheck,
  IconInfoCircle,
  IconPhoto,
  IconX,
} from '@tabler/icons-react'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'
import { useCallback, useEffect, useState } from 'react'
import { Dropzone, IMAGE_MIME_TYPE, FileWithPath } from '@mantine/dropzone'
import slugify from 'react-slugify'
import { CreateNewPost } from '@/services/apis'
import { useRouter } from 'next/navigation'
import { notifications } from '@mantine/notifications'
import { useUser } from '@/context/useUser'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  imageUrl: yup.mixed().required('Image is required'),
  content: yup.string().required('Content is required'),
  excerpt: yup
    .string()
    .required('Enter excerpt')
    .max(256, 'Maximum of 256 characters exceeded'),
  duration: yup.string().required('This field is required'),
  category: yup.string().required('Select a category'),
  tags: yup
    .array()
    .required('This field is required')
    .min(1, 'Add least 1 tag is required'),
})

const CreateFeed = () => {
  const [content, setContent] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [files, setFiles] = useState<FileWithPath[]>([])
  const router = useRouter()
  const userId = useUser()

  const authorId = String(userId?.userInfo?.id)

  const previews = files.map((file, index) => {
    const imageUrl = URL.createObjectURL(file)
    return (
      <Image
        radius={'lg'}
        key={index}
        src={imageUrl}
        onLoad={() => URL.revokeObjectURL(imageUrl)}
      />
    )
  })

  const form = useForm({
    initialValues: {
      authorId: '',
      title: '',
      slug: '',
      content: content,
      imageUrl: '',
      excerpt: '',
      duration: '',
      category: '',
      tags: [],
    },
    validate: yupResolver(schema),
    validateInputOnChange: ['tags', 'excerpt'],
    transformValues: (values) => ({
      ...values,
    }),
  })

  // Slugify the title
  useEffect(() => {
    const titleField = form.getInputProps('title').value
    const slug = slugify(titleField)
    form.setFieldValue('slug', slug)
    form.setFieldValue('authorId', authorId)
  }, [form.values.title])

  const handleContentChange = useCallback(
    (newContent: string) => {
      setContent(newContent)
      form.setFieldValue('content', newContent)
    },
    [setContent, form.setFieldValue, form]
  )

  // Function to handle image change
  const handleImageChange = (files: FileWithPath[]) => {
    if (files.length > 0) {
      const file = files[0] // Get the first file from the array

      // Check if file is an image
      if (file.type.startsWith('image/')) {
        const reader = new FileReader()

        // Read the file as a data URL
        reader.readAsDataURL(file)

        // When the file is loaded
        reader.onload = () => {
          const base64String = reader.result as string // Extract the base64 string
          setFiles([file]) // Set the image for preview
          form.setFieldValue('imageUrl', base64String) // Set the base64 string as the value of 'image' property in form values
        }

        // Handle errors
        reader.onerror = () => {
          console.error('Error occurred while reading the file.')
        }
      } else {
        // If the uploaded file is not an image
        alert('Please upload an image file.')
      }
    }
  }

  console.log(form.values)

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      const res = await CreateNewPost(values)
      console.log(res)
      notifications.show({
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'green',
        message: 'Post published successfully!',
      })
      router.push('/feeds')
    } catch (error) {
      console.log(error)

      notifications.show({
        icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'red',
        title: 'Ooops!',
        message: 'Something went wrong. Try again',
      })
    } finally {
      setIsSubmitting(false)
    }
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
              <Editor
                onContentChange={handleContentChange}
                {...form.getInputProps('content')}
              />
            </div>

            <Card withBorder radius='md' className='aux-input p-5'>
              <Title order={4} mb='lg'>
                Additional info
              </Title>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-10'>
                <div className='inputs'>
                  <TextInput
                    label='Title'
                    classNames={{ input: classes.input }}
                    {...form.getInputProps('title')}
                  />
                  <Textarea
                    label='Excerpt'
                    autosize
                    mt={'md'}
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
                      'Programming',
                      'Design',
                      'Lifestyle',
                      'Finance',
                    ]}
                    mt='md'
                    size='sm'
                    classNames={{
                      input: classes.input,
                      option: classes.option,
                    }}
                    {...form.getInputProps('category')}
                  />
                  <TagsInput
                    label='Tags'
                    description='Hit enter to add tag. You can add up to 5 tags'
                    maxTags={5}
                    mt='md'
                    classNames={{ input: classes.input }}
                    {...form.getInputProps('tags')}
                  />
                </div>

                <div
                  className={`${classes.image} rounded-xl flex flex-col items-center justify-center p-5 text-center`}
                >
                  <Box mb={'lg'}>{previews}</Box>
                  <Dropzone
                    accept={IMAGE_MIME_TYPE}
                    onDrop={handleImageChange}
                    {...form.getInputProps('imageUrl')}
                  >
                    <Text ta='center'>Drop image here</Text>
                  </Dropzone>

                  <Text className='text-sm mt-4' c={'dimmed'}>
                    NB: Image must be 1MB or less
                  </Text>
                </div>
              </div>
            </Card>

            <Group>
              <ChButton
                type='submit'
                disabled={!form.isValid() || isSubmitting}
                color='#543ee0'
              >
                {isSubmitting ? <Loader color='white' size={20} /> : 'Post'}
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
