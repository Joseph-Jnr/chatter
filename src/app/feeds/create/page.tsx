import ChButton from '@/components/Buttons/ChButton'
import AppLayout from '@/layout/AppLayout'
import {
  Button,
  Card,
  Group,
  Select,
  TagsInput,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import classes from '@/styles/InputStyle.module.css'

const CreateFeed = () => {
  return (
    <AppLayout title='New Post'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20'>
        <div className='textarea'>
          <Textarea
            placeholder='Write something here...'
            autosize
            minRows={12}
            classNames={{ input: classes.input }}
          />
        </div>

        <Card withBorder radius='md' className='aux-input p-5'>
          <Title order={4} mb='lg'>
            Additional info
          </Title>
          <TextInput
            label='Estimated read time'
            type='tel'
            size='sm'
            placeholder='Enter time in minutes'
            classNames={{ input: classes.input }}
          />
          <Select
            label='Category'
            data={['Sports', 'Education', 'Web Development', 'UI/UX Design']}
            mt='md'
            size='sm'
            classNames={{ input: classes.input }}
          />
          <TagsInput
            label='Tags'
            description='Add up to 5 tags'
            maxTags={5}
            mt='md'
            classNames={{ input: classes.input }}
          />
        </Card>

        <Group>
          <ChButton color='#543ee0'>Post</ChButton>
          <Button variant='default' radius='xl' size='md'>
            Cancel
          </Button>
        </Group>
      </div>
    </AppLayout>
  )
}

export default CreateFeed
