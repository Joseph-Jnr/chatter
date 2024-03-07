'use client'

import { Box, useMantineColorScheme, useMantineTheme } from '@mantine/core'

const AuthContainer = ({ children }: { children: React.ReactNode }) => {
  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const bg =
    colorScheme === 'dark' ? theme.colors.dark[7] : theme.colors.gray[0]
  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  return (
    <Box bg={bg} c={color}>
      {children}
    </Box>
  )
}

export default AuthContainer
