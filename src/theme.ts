import { createTheme } from '@mantine/core'

const theme = createTheme({
  colors: {
    purple: [
      '#efecff',
      '#dbd5fd',
      '#b3a9f3',
      '#897aeb',
      '#6551e3',
      '#4f38df',
      '#422bde',
      '#341ec6',
      '#2d1ab2',
      '#23159d',
    ],
  },
  primaryColor: 'purple',
  breakpoints: {
    xs: '30em',
    sm: '48em',
    md: '64em',
    lg: '74em',
    xl: '90em',
  },
})

export default theme
