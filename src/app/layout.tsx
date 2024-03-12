'use client'

import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/tiptap/styles.css'

import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import theme from '@/theme'
import { metadata } from './sharedConstants'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import RouterTransition from '@/components/RouterTransition'
import { usePathname } from 'next/navigation'
import { GoogleOAuthProvider } from '@react-oauth/google'

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
          <Notifications position='top-center' />
          {/* <RouterTransition /> */}
          <GoogleOAuthProvider clientId='962813123148-daa01cipki4vspu15sdgk5jghr6rj7k2.apps.googleusercontent.com'>
            <Box maw={1850} mx='auto'>
              {children}
            </Box>
          </GoogleOAuthProvider>
        </MantineProvider>
      </body>
    </html>
  )
}
