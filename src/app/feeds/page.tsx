'use client'

import FeedCard from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import feeds from '@/services/feedsMock'
import { Affix, Box, Tooltip } from '@mantine/core'
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
              <Box
                onClick={() => router.push('/feeds/create')}
                w={50}
                h={50}
                className='rounded-full cursor-pointer flex items-center justify-center shadow-xl'
                c={'white'}
                bg={'#543ee0'}
              >
                <IconPhotoEdit size={25} stroke={1.5} />
              </Box>
            </Tooltip>
          </Affix>
        </>
      </AppLayout>
    </>
  )
}

export default Feeds
