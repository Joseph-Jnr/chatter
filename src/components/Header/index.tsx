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
  Skeleton,
  Text,
  TextInput,
  Title,
  rem,
  useMantineColorScheme,
  useMantineTheme,
} from '@mantine/core'
import { IconSearch } from '@tabler/icons-react'
import { useDisclosure } from '@mantine/hooks'
import Logo from '../Logo'
import classes from '@/styles/InputStyle.module.css'
import genClass from '@/styles/General.module.css'
import Link from 'next/link'
import { isAuthenticated } from '@/utils/Auth'
import people from '@/services/peopleMock'
import { useState } from 'react'
import { SearchChatter } from '@/services/apis'

interface Post {
  id: string
  title: string
  content: string
  imageUrl: string
  likes: any[] | null // Assuming likes can be an array or null
  authorId: string
  comments: any[] | null // Assuming comments can be an array or null
  views: number
  duration: number
  slug: string
  bookmarks: any[] | null // Assuming bookmarks can be an array or null
  created_at: string
  updated_at: string
  tags: string[]
  excerpt: string
  category: string
}

interface User {
  id: string
  first_name: string
  last_name: string
  user_name: string
  email: string
  role: string
  imageUrl: string
  created_at: string
  updated_at: string
}

interface SearchResultProps {
  posts: Post[]
  users: User[]
}

const Header = ({ openNav, onClick }: any) => {
  const [opened, { open, close }] = useDisclosure(false)
  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />

  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  // Search implementation

  const [searchResults, setSearchResults] = useState<SearchResultProps>()
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSearch = async (value: string) => {
    setSearchValue(value)
    setIsLoading(true)
    try {
      const res = await SearchChatter(value)
      setSearchResults(res.data)
      console.log(res.data)
    } catch (err) {
      console.error('Error searching:', err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <Burger opened={openNav} onClick={onClick} hiddenFrom='sm' size='sm' />
      <Logo root='/feeds' />
      {isAuthenticated && (
        <>
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
        </>
      )}

      {/* Modal */}
      <Modal
        c={color}
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
            value={searchValue}
            onChange={(e) => handleSearch(e.target.value)}
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
            {searchResults &&
            searchResults.users &&
            searchResults.users.length > 0 ? (
              <>
                {searchResults?.users?.map((person) => (
                  <Link key={person.id} href={`/${person.user_name}`}>
                    <div className='flex-col items-center' key={person.id}>
                      <Avatar
                        src={person.imageUrl}
                        radius={120}
                        className='mb-2'
                        mx='auto'
                      />
                      <p className='text-xs'>{person.user_name}</p>
                    </div>
                  </Link>
                ))}
              </>
            ) : isLoading ? (
              <>
                {[...Array(4)].map((_, index) => (
                  <div className='flex flex-col items-center gap-4' key={index}>
                    <Skeleton circle height={40} />
                    <Skeleton height={10} width={50} />
                  </div>
                ))}
              </>
            ) : (
              <Text>No search results found</Text>
            )}
          </div>
        </Box>

        <Divider my={'lg'} />

        <Box>
          <h3
            className={`${genClass.section_title} mb-5 text-sm font-semibold`}
          >
            Posts
          </h3>

          {searchResults &&
          searchResults.posts &&
          searchResults.posts.length > 0 ? (
            <ScrollArea mah={150}>
              <div className='flex flex-col gap-5 mb-5'>
                {searchResults?.posts?.map((post) => (
                  <Link key={post?.id} href={`/feeds/${post.slug}`}>
                    <div className='flex-col gap-2'>
                      <Title lineClamp={1} order={6}>
                        {post.title}
                      </Title>
                      {/* <Text c={'dimmed'} fz={12} className='text-xs'>
                        {post.author}
                      </Text> */}
                    </div>
                  </Link>
                ))}
              </div>
            </ScrollArea>
          ) : isLoading ? (
            <div className='flex flex-col gap-5 mb-5'>
              {[...Array(2)].map((_, index) => (
                <Skeleton height={50} key={index} />
              ))}
            </div>
          ) : (
            <Text>No search results found</Text>
          )}
        </Box>
      </Modal>
    </>
  )
}

export default Header
