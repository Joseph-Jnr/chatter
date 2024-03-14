import { Box, Skeleton } from '@mantine/core'

const FollowersSkeleton = () => {
  return (
    <div className='flex justify-between mb-8'>
      <div className='flex gap-4'>
        <Skeleton circle height={30} />

        <div style={{ flex: 1 }}>
          <Skeleton height={18} width='70%' radius='sm' />

          <Box w={150}>
            <Skeleton height={10} mt={4} width='50%' radius='sm' />
          </Box>
        </div>
      </div>
      <Skeleton height={40} className='w-[30%] lg:w-36' radius='md' />
    </div>
  )
}

export default FollowersSkeleton
