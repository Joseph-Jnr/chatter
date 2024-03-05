import FeedCard from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import feeds from '@/services/feedsMock'
import React from 'react'

const Bookmarks = () => {
  return (
    <AppLayout title='Bookmarks'>
      <p>Your saved posts</p>

      <div className='posts mt-20'>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
          {feeds.map((feed) => (
            <FeedCard key={feed.id} {...feed} />
          ))}
        </div>
      </div>
    </AppLayout>
  )
}

export default Bookmarks
