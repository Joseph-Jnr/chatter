import classes from '@/styles/General.module.css'
import { Text } from '@mantine/core'

interface EmptyStateProps {
  icon: React.ReactNode
  title: string
  description?: string
}

const EmptyState = ({ icon, title, description }: EmptyStateProps) => {
  return (
    <div className='empty-state flex flex-col items-center gap-3 my-16'>
      <div
        className={`${classes.icon} w-20 h-20 rounded-full flex justify-center items-center`}
      >
        {icon}
      </div>
      <h3 className='font-semibold'>{title}</h3>

      <Text c={'dimmed'} className='text-sm text-center'>
        {description}
      </Text>
    </div>
  )
}

export default EmptyState
