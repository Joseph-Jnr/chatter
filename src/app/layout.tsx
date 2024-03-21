import '@mantine/core/styles.css'
import '@mantine/notifications/styles.css'
import '@mantine/tiptap/styles.css'
import '@mantine/dropzone/styles.css'

import { Box, ColorSchemeScript, MantineProvider } from '@mantine/core'
import { Notifications } from '@mantine/notifications'
import theme from '@/theme'
import { Plus_Jakarta_Sans } from 'next/font/google'
import './globals.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { Metadata } from 'next'
import AppBody from '@/layout/AppBody'
import { UserProvider } from '@/context/useUser'
import NextTopLoader from 'nextjs-toploader'

const jakarta = Plus_Jakarta_Sans({
  weight: ['400', '500', '700'],
  style: 'normal',
  subsets: ['latin'],
})
/* 
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
} */
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
  generator: 'Next.js',
  manifest: '/manifest.json',
  keywords: ['Chatter', 'chatter', 'chatter app'],
  themeColor: [{ media: '(prefers-color-scheme: dark)', color: '#fff' }],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  icons: [
    { rel: 'apple-touch-icon', url: '../../public/assets/png/logo.png' },
    { rel: 'icon', url: '../../public/assets/png/logo.png' },
  ],
}

const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <head>
        <ColorSchemeScript defaultColorScheme='light' />
        <meta
          name='viewport'
          content='minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no'
        />
      </head>
      <AppBody font={`${jakarta.className}`}>
        <MantineProvider defaultColorScheme='light' theme={theme}>
          <UserProvider>
            <Notifications position='top-center' />
            <NextTopLoader color='#543ee0' showSpinner={false} />
            <GoogleOAuthProvider clientId={`${googleClientId}`}>
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
