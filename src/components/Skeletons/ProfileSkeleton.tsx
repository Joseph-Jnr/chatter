import { Skeleton } from '@mantine/core'
import React from 'react'

const ProfileSkeleton = () => {
  return (
    <div className='flex flex-col items-center gap-4'>
      <Skeleton height={80} circle mb='sm' />
      <Skeleton height={18} width={160} radius='sm' />
      <Skeleton height={18} width={100} radius='sm' />
      <Skeleton height={40} width={210} radius='sm' />
    </div>
  )
}

export default ProfileSkeleton
