'use client'

import FeedCard from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import { Box, Flex } from '@mantine/core'

const Feeds = () => {
  return (
    <>
      <AppLayout title='Feeds'>
        <div>
          <FeedCard />
        </div>
      </AppLayout>
    </>
  )
}

export default Feeds
