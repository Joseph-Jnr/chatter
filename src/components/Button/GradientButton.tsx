'use client'
import { Button } from '@mantine/core'

interface GradientButtonProps {
  text: string
  onClick?: () => void
}
const GradientButton = ({ text, onClick }: GradientButtonProps) => {
  return (
    <>
      <Button
        radius='xl'
        size='md'
        variant='gradient'
        onClick={onClick}
        gradient={{ from: '#543EE0', to: 'cyan', deg: 90 }}
      >
        {text}
      </Button>
    </>
  )
}

export default GradientButton
