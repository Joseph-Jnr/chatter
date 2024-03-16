import { Group, Paper, Skeleton } from '@mantine/core'

const AnalyticsSkeleton = () => {
  return (
    <Paper withBorder p='md' radius='md'>
      <Group justify='space-between'>
        <Skeleton height={20} width={100} />
        <Skeleton circle height={40} />
      </Group>

      <Group align='flex-end' gap='xs' mt={25}>
        <Skeleton height={10} width={50} />
      </Group>

      <Skeleton height={10} width={140} mt={7} />
    </Paper>
  )
}

export default AnalyticsSkeleton
