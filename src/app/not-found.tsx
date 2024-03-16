'use client'

import { Image404 } from '@/assets'
import ChButton from '@/components/Buttons/ChButton'
import classes from '@/styles/General.module.css'
import { Text } from '@mantine/core'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const PageNotFound = () => {
  const router = useRouter()

  return (
    <div
      className={`${classes.handle_theme} h-screen flex items-center justify-center`}
    >
      <div className='content flex flex-col items-center gap-8'>
        {/* Image */}
        <Image src={Image404} width={400} alt='404 image' />
        {/* Text */}
        <div className='text-center'>
          <h2 className='text-2xl lg:text-4xl font-bold mb-4'>
            Seems you lost your way
          </h2>
          <Text c={'dimmed'}>This page does not exist.</Text>
        </div>
        {/* Button */}
        <ChButton color={'#543ee0'} onClick={() => router.back()}>
          Go back
        </ChButton>
      </div>
    </div>
  )
}

export default PageNotFound
