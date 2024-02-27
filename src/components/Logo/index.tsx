import { LogoSvg } from '@/assets'
import { Text } from '@mantine/core'
import Image from 'next/image'
import Link from 'next/link'

interface LogoProps {
  root: string
  className?: string
}

const Logo = ({ root, className }: LogoProps) => {
  return (
    <Link
      href={root}
      className={`brand--logo flex items-center gap-2 ${className}`}
    >
      <Image src={LogoSvg} alt='logo' />
      <Text fw='bolder' c='#543EE0' size='xl'>
        Chatter
      </Text>
    </Link>
  )
}

export default Logo
