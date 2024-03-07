'use client'

import { NavigationProgress, nprogress } from '@mantine/nprogress'
import '@mantine/nprogress/styles.css'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

const RouterTransition = () => {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    nprogress.complete()
    return () => {
      nprogress.start()
    }
  }, [pathname, searchParams])

  return <NavigationProgress color='#543ee0' />
}

export default RouterTransition
