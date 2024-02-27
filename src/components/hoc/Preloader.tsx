import { Box } from '@mantine/core'
import Logo from '../Logo'

const Preloader = () => {
  return (
    <>
      <Box className='bg-white h-screen z-40 flex items-center justify-center'>
        <Box className='w-fit fade-scale-animation'>
          <Logo root='/' />
        </Box>
      </Box>
    </>
  )
}

export default Preloader
