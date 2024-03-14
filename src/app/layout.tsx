import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/dropzone/styles.css'

import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import theme from '@/theme'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import RouterTransition from '@/components/RouterTransition'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Metadata } from 'next'
import AppBody from '@/layout/AppBody'
import { UserProvider } from '@/context/useUser'

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Chatter',
  description:
    'A home for writers and readers. Unleash the power of words, connect with like-minded readers and writers.',
  openGraph: {
    type: 'website',
    url: 'https://chatter-appx.vercel.app',
    title: 'Chatter',
    description:
      'A multi-functional platform where authors and readers can have access to their own content.',
    siteName: 'Chatter',
    images: [
      {
        url: 'https://drive.google.com/uc?export=view&id=1M3tNb1zfdzn-_rB7Jy1EWWVpZufSiQnZ',
      },
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <AppBody font={`${jakarta.className}`}>
        <MantineProvider theme={theme}>
          <UserProvider>
            <Notifications position='top-center' />
            {/* <RouterTransition /> */}
            <GoogleOAuthProvider clientId='962813123148-daa01cipki4vspu15sdgk5jghr6rj7k2.apps.googleusercontent.com'>
              <Box maw={1850} mx='auto'>
                {children}
              </Box>
            </GoogleOAuthProvider>
          </UserProvider>
        </MantineProvider>
      </AppBody>
    </html>
  )
}
