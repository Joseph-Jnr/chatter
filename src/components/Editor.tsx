'use client'

import { RichTextEditor, Link } from '@mantine/tiptap'
import { useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
import { IconPhoto } from '@tabler/icons-react'
import { useState } from 'react'
import axios from 'axios'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { LoadingOverlay, rem } from '@mantine/core'

interface EditorProps {
  onContentChange: (content: string) => void
}

const notificationProps = {
  icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
  withCloseButton: false,
  color: 'red',
  message: 'Something went wrong. Try again',
}

const Editor = ({ onContentChange }: EditorProps) => {
  const [isUploading, setIsUploading] = useState(false)

  const editor = useEditor({
    extensions: [
      StarterKit,
      Link,
      Image,
      Placeholder.configure({ placeholder: 'Your post content...' }),
    ],
  })

  // Upload image to cloudinary and get the image url
  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      setIsUploading(true)
      const formData = new FormData()
      formData.append('file', file)
      formData.append(
        'upload_preset',
        `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`
      )
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_CLOUDINARY_URL}`,
        formData
      )

      if (res.data) {
        setIsUploading(false)
        const data = res.data
        const imageUrl = data.secure_url

        if (imageUrl && editor) {
          editor.chain().focus().setImage({ src: imageUrl }).run()
        }
      } else {
        setIsUploading(false)
        notifications.show({
          ...notificationProps,
        })
        throw new Error('Failed to upload image')
      }
    } catch (error) {
      setIsUploading(false)
      notifications.show({
        ...notificationProps,
      })
      console.error('Error uploading image:', error)
    } finally {
      setIsUploading(false)
    }
  }

  if (!editor) {
    return null
  }

  editor?.on('update', () => {
    const contentHTML = editor.getHTML()
    onContentChange(contentHTML)
  })

  return (
    <>
      <div className='relative'>
        <LoadingOverlay
          visible={isUploading}
          zIndex={1000}
          overlayProps={{ radius: 'sm', blur: 2 }}
          loaderProps={{ color: '#543ee0', type: 'bars' }}
        />

        <RichTextEditor editor={editor}>
          <RichTextEditor.Toolbar sticky stickyOffset={60}>
            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Bold />
              <RichTextEditor.Italic />
              <RichTextEditor.Underline />
              <RichTextEditor.Strikethrough />
              <RichTextEditor.ClearFormatting />
              <RichTextEditor.Highlight />
              <RichTextEditor.Code />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.H1 />
              <RichTextEditor.H2 />
              <RichTextEditor.H3 />
              <RichTextEditor.H4 />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Blockquote />
              <RichTextEditor.Hr />
              <RichTextEditor.BulletList />
              <RichTextEditor.OrderedList />
              <RichTextEditor.Subscript />
              <RichTextEditor.Superscript />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Link />
              <RichTextEditor.Unlink />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.AlignLeft />
              <RichTextEditor.AlignCenter />
              <RichTextEditor.AlignJustify />
              <RichTextEditor.AlignRight />
            </RichTextEditor.ControlsGroup>

            <RichTextEditor.ControlsGroup>
              <RichTextEditor.Undo />
              <RichTextEditor.Redo />
            </RichTextEditor.ControlsGroup>
            <div>
              <input
                type='file'
                id='imageField'
                accept='.jpg, .jpeg, .png'
                onChange={handleFileChange}
                hidden
              />
              <label htmlFor='imageField' className='cursor-pointer'>
                <IconPhoto stroke={1} size={26} />
              </label>
            </div>
          </RichTextEditor.Toolbar>

          <RichTextEditor.Content mih={200} />
        </RichTextEditor>
      </div>
    </>
  )
}

export default Editor
