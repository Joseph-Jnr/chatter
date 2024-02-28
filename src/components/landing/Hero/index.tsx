'use client'
import { HeroIllustration2 } from '@/assets'
import {
  Box,
  Title,
  Button,
  Group,
  Text,
  List,
  ThemeIcon,
  rem,
  Flex,
} from '@mantine/core'
import { IconCheck } from '@tabler/icons-react'
import Image from 'next/image'
import ChButton from '../Button/ChButton'

const Hero = () => {
  return (
    <>
      <Box className='ch--container section--padding'>
        <Flex
          justify='space-between'
          direction={{ base: 'column', sm: 'row' }}
          align='center'
          mt={{ base: 90, sm: 0 }}
          gap={90}
        >
          <Box w={{ base: '100%', sm: '50%' }}>
            <Title tt='capitalize' data-aos='fade-down'>
              A <span>haven</span> for <br /> text-based content
            </Title>
            <Text c='dimmed' mt='md' data-aos='fade-down' data-aos-delay='200'>
              Welcome to Chatter: A home for writers and readers. Unleash the
              power of words, connect with like-minded readers and writers.
            </Text>

            <List
              mt={30}
              spacing='sm'
              size='sm'
              icon={
                <ThemeIcon size={20} radius='xl' color='#543EE0'>
                  <IconCheck
                    style={{ width: rem(12), height: rem(12) }}
                    stroke={1.5}
                  />
                </ThemeIcon>
              }
            >
              <List.Item data-aos='fade-right' data-aos-delay='400'>
                <b>Publish in secs</b> - share your thoughts, stories, and
                creations in seconds
              </List.Item>
              <List.Item data-aos='fade-right' data-aos-delay='600'>
                <b>Free for all writers</b> - enjoy the freedom to express
                yourself without constraints or fee.
              </List.Item>
              <List.Item data-aos='fade-right' data-aos-delay='800'>
                <b>Excellent community</b> - our community is a hub of diverse
                voices, ideas, and perspectives
              </List.Item>
            </List>

            <Group mt={30} data-aos='fade-right' data-aos-delay='1000'>
              <ChButton color='#543EE0'>Get started</ChButton>

              <Button variant='default' radius='xl' size='md'>
                Community
              </Button>
            </Group>
          </Box>
          <Image
            data-aos='zoom-in'
            src={HeroIllustration2}
            className='w-[500px]'
            alt='illustration'
          />
        </Flex>
      </Box>
    </>
  )
}

export default Hero
