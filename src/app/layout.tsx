'use client'

import '@mantine/core/styles.css'

import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core'
import theme from '@/theme'
import { metadata } from './sharedConstants'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import RouterTransition from '@/components/RouterTransition'
import { usePathname } from 'next/navigation'

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const path = usePathname()

  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <body
        className={`${jakarta.className} ${
          path !== '/' ? 'hide-scrollbar' : ''
        }`}
      >
        <MantineProvider theme={theme}>
          <RouterTransition />
          <Box maw={1850} mx='auto'>
            {children}
          </Box>
        </MantineProvider>
      </body>
    </html>
  )
}
