'use client'

import { Loader, Textarea, rem } from '@mantine/core'
import inputClass from '@/styles/InputStyle.module.css'
import ChButton from '../Buttons/ChButton'
import { yupResolver } from 'mantine-form-yup-resolver'
import * as yup from 'yup'
import { useForm } from '@mantine/form'
import { useState } from 'react'
import { CommentPost } from '@/services/apis'
import { notifications } from '@mantine/notifications'
import { IconCheck, IconX } from '@tabler/icons-react'

const schema = yup.object().shape({
  comment: yup.string().required('Enter comment'),
})

interface CommentFormProps {
  postId: string
  refetch: () => void
}

const CommentForm = ({ postId, refetch }: CommentFormProps) => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm({
    initialValues: {
      comment: '',
    },
    validate: yupResolver(schema),
    transformValues: (values) => ({
      ...values,
    }),
  })

  const handleSubmit = async (values: any) => {
    setIsSubmitting(true)
    try {
      const res = await CommentPost(values, postId)
      console.log(res)
      form.setFieldValue('comment', '')
      refetch()
      notifications.show({
        icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
        withCloseButton: false,
        color: 'green',
        message: 'Comment sent',
      })
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
    <form onSubmit={form.onSubmit(handleSubmit)}>
      <Textarea
        label='Leave a comment'
        placeholder='Write something...'
        classNames={{ input: inputClass.input }}
        autosize
        {...form.getInputProps('comment')}
      />
      <div className='mt-4'>
        <ChButton
          type='submit'
          disabled={!form.isValid() || isSubmitting}
          color='#543ee0'
        >
          {isSubmitting ? <Loader color='white' size={20} /> : 'Comment'}
        </ChButton>
      </div>
    </form>
  )
}

export default CommentForm
