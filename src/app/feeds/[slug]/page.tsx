'use client'

import AppLayout from '@/layout/AppLayout'
import {
  Avatar,
  Box,
  Card,
  Modal,
  Notification,
  Text,
  Textarea,
  Title,
  rem,
  useComputedColorScheme,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import classes from '@/styles/General.module.css'
import inputClass from '@/styles/InputStyle.module.css'
import {
  IconBook,
  IconBookmarkFilled,
  IconExclamationCircle,
  IconHeartFilled,
} from '@tabler/icons-react'
import Image from 'next/image'
import { Woman } from '@/assets'
import ChButton from '@/components/Buttons/ChButton'
import { IconHeart } from '@tabler/icons-react'
import formatStats from '@/services/formatStats'
import { IconBookmark } from '@tabler/icons-react'
import { IconEye } from '@tabler/icons-react'
import { useEffect, useState } from 'react'
import { IconCheck } from '@tabler/icons-react'
import { isAuthenticated } from '@/utils/Auth'
import { useDisclosure } from '@mantine/hooks'
import { notifications } from '@mantine/notifications'
import { useParams, useRouter } from 'next/navigation'
import { IconMoodPuzzled } from '@tabler/icons-react'
import Comment from '@/components/Feed/Comment'
import { GetSinglePost } from '@/services/apis'

const FeedDetail = () => {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const checkIcon = <IconCheck style={{ width: rem(20), height: rem(20) }} />
  const [opened, { open, close }] = useDisclosure(false)
  const router = useRouter()
  const { slug } = useParams<{ slug: string; item: string }>()

  const [comments, setComments] = useState([])

  const postId = ''

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const res = await GetSinglePost(postId)
        if (res?.data?.comments) {
          setComments(res.data.comments)
          console.log(res.data.comments)
        }
      } catch (error) {
        console.error('Error:', error)
      }
    }

    fetchPostAndComments()
  }, [slug])

  const likeAction = () => {
    isAuthenticated ? setIsLiked(!isLiked) : open()
  }

  const bookmarkAction = () => {
    if (isAuthenticated) {
      setIsBookmarked(!isBookmarked)

      notifications.show({
        icon: checkIcon,
        withCloseButton: false,
        color: 'teal',
        message: 'Saved to bookmarks',
        className: 'mt-10 w-fit mx-auto',
      })
    } else {
      open()
    }
  }

  const { colorScheme, setColorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  return (
    <AppLayout>
      <div className='md:mx-40'>
        <h2 className='text-2xl lg:text-4xl font-bold'>Starting out in Tech</h2>

        <div className={`${classes.meta} flex flex-col gap-2 my-5`}>
          <div className='flex gap-1'>
            <span className='text-xs'>March 3 2024</span>
          </div>
          <div className='flex gap-1'>
            <IconBook size={14} />
            <span className='text-xs'>5 mins read</span>
          </div>
        </div>

        <div className='flex items-center gap-2'>
          <Avatar
            src='https://avatars.githubusercontent.com/u/67343514?v=4'
            size={40}
            radius={80}
          />
          <p className='text-sm'>by Grace Davison</p>
        </div>

        <div className='my-10'>
          <Image src={Woman} className='rounded-lg' alt='image' />
        </div>

        <div className='content'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi,
          architecto vitae. Corrupti facilis totam voluptatem id velit delectus
          ex quam tempore commodi modi, nulla quisquam a? Voluptates iusto
          laborum impedit! Mollitia, minus! Nam corporis ea doloremque laborum,
          quod quisquam quam impedit? Pariatur numquam, eaque, reiciendis
          accusamus temporibus natus quidem ea doloremque eos repudiandae sint
          explicabo ipsa dolorem, omnis facilis accusantium. Dicta reiciendis,
          repellat, recusandae eaque exercitationem pariatur ex officiis debitis
          suscipit cupiditate, adipisci ad dolores commodi iusto molestiae
          voluptatem voluptates ratione consequatur alias facere! Impedit cumque
          quis nemo facere ut. Labore, sed amet temporibus molestias autem
          tempora aliquam in facere accusamus deleniti laboriosam reprehenderit
          non rem. Saepe molestias, animi rem repellendus placeat, dolore
          necessitatibus sunt quae sed dolores nobis omnis! Perferendis adipisci
          ipsum, quia, nulla consequuntur deserunt voluptas tempora repellendus
          iure doloremque hic veritatis harum? Aut ab, debitis, minima,
          molestias illo quas hic ex praesentium libero velit quae suscipit
          quibusdam.
        </div>

        <div className='reactions mt-10'>
          <div className='icons flex items-center gap-5 md:gap-7'>
            <div
              className='flex items-center gap-1 hover:cursor-pointer'
              onClick={likeAction}
            >
              {isLiked ? (
                <IconHeartFilled size={18} className='text-red-600' />
              ) : (
                <IconHeart size={18} stroke={1} />
              )}
              <p className='flex gap-1'>
                {formatStats(5000)}{' '}
                <span className='hidden md:block'>likes</span>
              </p>
            </div>

            <div
              className='flex items-center hover:cursor-pointer gap-1'
              onClick={bookmarkAction}
            >
              {isBookmarked ? (
                <IconBookmarkFilled size={18} />
              ) : (
                <IconBookmark size={18} stroke={1} />
              )}
              <p className='flex gap-1'>
                {formatStats(100)}{' '}
                <span className='hidden md:block'>bookmarks</span>
              </p>
            </div>

            <div className='flex items-center gap-1'>
              <IconEye size={18} stroke={1} />
              <p className='flex gap-1'>
                {formatStats(701000)}{' '}
                <span className='hidden md:block'>views</span>
              </p>
            </div>
          </div>
        </div>

        {isAuthenticated && (
          <div className='comment-section mt-16'>
            <Card>
              <Comment postId='564c8f4b-98d6-4736-97d4-6bf6ee60ef85' />
              <Textarea
                label='Leave a comment'
                placeholder='Write something...'
                classNames={{ input: inputClass.input }}
              />
              <div className='mt-4'>
                <ChButton color='#543ee0'>Comment</ChButton>
              </div>
            </Card>
          </div>
        )}
      </div>

      <Modal
        c={color}
        opened={opened}
        onClose={close}
        radius={'lg'}
        centered
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <div className='flex flex-col items-center'>
          <IconMoodPuzzled color='red' size={60} />

          <Title c={color} my={5} order={3}>
            Ooops!
          </Title>

          <Text size='sm' className='text-center' mb={40} c='dimmed'>
            You can't perform this action. Login or create an account in order
            to interact with posts on Chatter.
          </Text>

          <ChButton
            className='w-full'
            onClick={() => router.push('/sign-in')}
            color={'#544ee0'}
          >
            Login
          </ChButton>
        </div>
      </Modal>
    </AppLayout>
  )
}

export default FeedDetail
