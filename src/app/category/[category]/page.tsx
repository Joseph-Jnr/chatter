'use client'

import FeedCard from '@/components/Feed/FeedCard'
import AppLayout from '@/layout/AppLayout'
import feeds from '@/services/feedsMock'
import { IconChevronRight } from '@tabler/icons-react'
import { useParams } from 'next/navigation'
import classes from '@/styles/General.module.css'

const Categroy = () => {
  const { category } = useParams<{ category: string; item: string }>()

  return (
    <AppLayout>
      <div
        className={`${classes.breadcrumb} w-fit py-2 px-4 rounded-lg flex items-center gap-3`}
      >
        <p>Category</p>
        <IconChevronRight stroke={1} size={20} />
        <p className='capitalize'> {category}</p>
      </div>

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

export default Categroy
