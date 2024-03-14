import { Textarea } from '@mantine/core'
import inputClass from '@/styles/InputStyle.module.css'
import ChButton from '../Buttons/ChButton'

const CommentForm = ({ postId }: { postId: string }) => {
  return (
    <div>
      <Textarea
        label='Leave a comment'
        placeholder='Write something...'
        classNames={{ input: inputClass.input }}
      />
      <div className='mt-4'>
        <ChButton color='#543ee0'>Comment</ChButton>
      </div>
    </div>
  )
}

export default CommentForm
