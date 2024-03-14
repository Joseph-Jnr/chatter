'use client'

import { usePathname } from 'next/navigation'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

interface AppBodyProps {
  children: React.ReactNode
  font: string
}

const AppBody = ({ children, font }: AppBodyProps) => {
  const path = usePathname()

  return (
    <body className={`${font} ${path !== '/' ? 'hide-scrollbar' : ''}`}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </body>
  )
}

export default AppBody
