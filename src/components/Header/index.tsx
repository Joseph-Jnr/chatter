'use client'

import {
  ActionIcon,
  Avatar,
  Box,
  Burger,
  Divider,
  Group,
  Modal,
  ScrollArea,
  Text,
  TextInput,
  Title,
  rem,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import Logo from '../Logo'
import headerClass from './Header.module.css'
import classes from '@/styles/InputStyle.module.css'
import genClass from '@/styles/General.module.css'
import Link from 'next/link'

const people = [
  {
    id: 1,
    username: 'josephjnr',
    avatar: 'https://avatars.githubusercontent.com/u/67343514?v=4',
  },
  {
    id: 2,
    username: 'ghostexodus',
    avatar:
      'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=',
  },
  {
    id: 3,
    username: 'exhaleGx$',
    avatar:
      'https://media.istockphoto.com/id/1386479313/photo/happy-millennial-afro-american-business-woman-posing-isolated-on-white.jpg?s=612x612&w=0&k=20&c=8ssXDNTp1XAPan8Bg6mJRwG7EXHshFO5o0v9SIj96nY=',
  },
  {
    id: 4,
    username: 'peterpan',
    avatar: 'https://avatars.githubusercontent.com/u/67343514?v=4',
  },
]

const posts = [
  {
    id: 1,
    title: '100 Success Tips For Enterpreneurs',
    slug: '100-success-tips-for-enterpreneurs',
    author: 'Victor Albert',
  },
  {
    id: 2,
    title: 'API Calls in Next js 14',
    slug: 'api-calls-in-next-js-14',
    author: 'Anita Rose',
  },
  {
    id: 3,
    title: 'Web3: The Future of the Internet',
    slug: 'web3-the-future-of-the-nternet',
    author: 'Joseph Jnr',
  },
]

const Header = ({ toggleSideNav }: any) => {
  const [opened, { open, close }] = useDisclosure(false)
  const [burgerOpened, { toggle }] = useDisclosure()
  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />

  return (
    <Box
      py={14}
      px={13}
      ml={{ base: 0, sm: 300 }}
      className={`${headerClass.header} flex justify-between md:justify-center items-center sticky z-50`}
    >
      <div className='menu md:hidden' onClick={toggleSideNav}>
        <Burger
          opened={burgerOpened}
          onClick={toggle}
          size={'sm'}
          aria-label='Toggle navigation'
        />
      </div>
      <Logo root='/feeds' className='md:hidden' />
      <TextInput
        leftSectionPointerEvents='none'
        leftSection={icon}
        placeholder='Search'
        className='hidden md:block'
        classNames={{ input: classes.input }}
        onClick={open}
        radius='xl'
      />
      <Group display={{ sm: 'none' }}>
        <ActionIcon
          onClick={open}
          variant='default'
          radius='xl'
          size='lg'
          aria-label='Search'
        >
          <IconSearch size={20} />
        </ActionIcon>
      </Group>

      {/* Modal */}
      <Modal
        opened={opened}
        onClose={close}
        radius={'lg'}
        withCloseButton={false}
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
      >
        <Box>
          <TextInput
            placeholder='Search for people and posts...'
            mb={30}
            classNames={{ input: classes.input }}
            data-autofocus
          />
        </Box>

        <Box>
          <h3
            className={`${genClass.section_title} my-2 text-sm font-semibold`}
          >
            People
          </h3>
          <div className='flex gap-5 w-72 lg:w-full overflow-x-scroll hide-scrollbar'>
            {people.map((person) => (
              <Link key={person.id} href={`/${person.username}`}>
                <div className='flex-col items-center' key={person.id}>
                  <Avatar
                    src={person.avatar}
                    radius={120}
                    className='mb-2'
                    mx='auto'
                  />
                  <p className='text-xs'>{person.username}</p>
                </div>
              </Link>
            ))}
          </div>
        </Box>

        <Divider my={'lg'} />

        <Box>
          <h3
            className={`${genClass.section_title} mb-5 text-sm font-semibold`}
          >
            Posts
          </h3>
          <ScrollArea h={150}>
            <div className='flex flex-col gap-5 mb-5'>
              {posts.map((post) => (
                <Link key={post.id} href={`/feeds/${post.slug}`}>
                  <div className='flex-col gap-2'>
                    <Title lineClamp={1} order={6}>
                      {post.title}
                    </Title>
                    <Text c={'dimmed'} fz={12} className='text-xs'>
                      {post.author}
                    </Text>
                  </div>
                </Link>
              ))}
            </div>
          </ScrollArea>
        </Box>
      </Modal>
    </Box>
  )
}

export default Header
