'use client'

import FeedCard from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import feeds from '@/services/feedsMock'
import { ActionIcon, Affix, Tooltip } from '@mantine/core'
import { IconPhotoEdit } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'

const Feeds = () => {
  const router = useRouter()

  return (
    <>
      <AppLayout>
        <>
          <div className='md:mx-40'>
            <div className='grid grid-cols-1 gap-10'>
              {feeds.map((feed) => (
                <FeedCard key={feed.id} {...feed} />
              ))}
            </div>
          </div>
          <Affix zIndex={10} position={{ bottom: 40, right: 20 }}>
            <Tooltip label='Create new post'>
              <ActionIcon
                onClick={() => router.push('/feeds/create')}
                variant='filled'
                radius='xl'
                size={50}
                color='#543ee0'
                aria-label='Create feed'
              >
                <IconPhotoEdit size={25} stroke={1.5} />
              </ActionIcon>
            </Tooltip>
          </Affix>
        </>
      </AppLayout>
    </>
  )
}

export default Feeds
