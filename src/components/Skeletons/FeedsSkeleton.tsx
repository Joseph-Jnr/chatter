import { Skeleton } from '@mantine/core'

const FeedsSkeleton = () => {
  return (
    <div className='flex flex-col gap-4'>
      <Skeleton height={50} circle mb='sm' />
      <Skeleton height={18} radius='md' />
      <Skeleton height={18} radius='md' />
      <Skeleton height={18} width='70%' radius='md' />
    </div>
  )
}

export default FeedsSkeleton
