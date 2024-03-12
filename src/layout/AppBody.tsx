'use client'

import { usePathname } from 'next/navigation'

interface AppBodyProps {
  children: React.ReactNode
  font: string
}

const AppBody = ({ children, font }: AppBodyProps) => {
  const path = usePathname()

  return (
    <body className={`${font} ${path !== '/' ? 'hide-scrollbar' : ''}`}>
      {children}
    </body>
  )
}

export default AppBody
