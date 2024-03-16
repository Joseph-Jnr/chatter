'use client'

import ChButton from '@/components/Buttons/ChButton'
import classes from '@/styles/General.module.css'
import { Text } from '@mantine/core'

const GlobalError = ({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) => {
  return (
    <div
      className={`${classes.handle_theme} h-screen flex items-center justify-center`}
    >
      <div className='content flex flex-col items-center gap-8'>
        {/* Image */}
        {/* Text */}
        <div className='text-center'>
          <h2 className='text-2xl lg:text-4xl font-bold'>
            Ooops! Something went wrong
          </h2>
        </div>
        {/* Button */}
        <ChButton color={'#543ee0'} onClick={() => reset()}>
          Refresh
        </ChButton>
      </div>
    </div>
  )
}

export default GlobalError
