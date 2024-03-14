import { Skeleton } from '@mantine/core'
import React from 'react'

const SingleFeedSkeleton = () => {
  return (
    <>
      <Skeleton height={30} width={200} />

      <div className={`flex flex-col gap-2 my-5`}>
        <Skeleton height={10} width={80} />
        <Skeleton height={10} width={80} />
      </div>

      <div className='flex items-center gap-2'>
        <Skeleton circle height={40} width={40} />
        <Skeleton height={20} width={100} />
      </div>

      <div className='my-10'>
        <Skeleton height={380} />
      </div>

      <div className='flex flex-col gap-5'>
        <Skeleton height={20} width={'100%'} />
        <Skeleton height={20} width={'100%'} />
        <Skeleton height={20} width={'70%'} />
      </div>

      <div className='reactions mt-10'>
        <div className='icons flex items-center gap-5 md:gap-7'>
          <Skeleton circle height={40} width={40} />
          <Skeleton circle height={40} width={40} />
          <Skeleton circle height={40} width={40} />
        </div>
      </div>
    </>
  )
}

export default SingleFeedSkeleton
