import { HeroIllustration2, Woman } from '@/assets'
import { Avatar, Badge, Button, Card, Group, Text, Title } from '@mantine/core'
import { IconBook, IconEye, IconHeart, IconMessage2 } from '@tabler/icons-react'
import { IconCalendarMonth } from '@tabler/icons-react'
import Image from 'next/image'
import React from 'react'

const FeedCard = () => {
  return (
    <>
      <Card withBorder padding='lg' className='w-fit' radius={'lg'}>
        <div className='user-info flex gap-2'>
          <Avatar
            src='https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY='
            size='lg'
            alt="it's me"
          />
          <div className='flex flex-col'>
            <Title order={4}>Grace Everton</Title>
            <Button
              leftSection={<IconCalendarMonth size={14} />}
              color='gray'
              p={0}
              size='xs'
              className='h-fit'
              fw='normal'
              variant='transparent'
            >
              March 3 2024
            </Button>
            <Button
              leftSection={<IconBook size={14} />}
              color='#543EE0'
              p={0}
              size='xs'
              fw='normal'
              className='h-fit'
              variant='transparent'
            >
              10 mins read
            </Button>
          </div>
        </div>

        <div className='my-5'>
          <h2 className='text-lg md:text-4xl font-bold'>
            Starting out as a Product designer
          </h2>
          <Text
            fz='sm'
            className='w-full md:w-[40%]'
            lineClamp={2}
            mt={10}
            mb={30}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium, fugit. Fugit impedit incidunt, dicta libero quidem
            tempora natus amet! Similique eligendi labore quas nulla, vero a
            reiciendis dolorem non tempora? Lorem ipsum dolor sit amet
            consectetur adipisicing elit.
          </Text>
          <Image
            src={Woman}
            width={800}
            className='rounded-xl md:rounded-3xl'
            alt='woman'
          />
        </div>
        <div className='icons flex gap-2'>
          <IconHeart />
          <IconMessage2 />
          <IconEye />
        </div>
      </Card>
    </>
  )
}

export default FeedCard
