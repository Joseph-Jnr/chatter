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
import { useState } from 'react'
import { SearchChatter } from '@/services/apis'
import Image from 'next/image'
import { SearchIcon } from '@/assets'
import { useUser } from '@/context/useUser'

interface Post {
  id: string
  title: string
  content: string
  imageUrl: string
  likes: any[] | null
  authorId: string
  comments: any[] | null
  views: number
  duration: number
  slug: string
  bookmarks: any[] | null
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
  const [searchResults, setSearchResults] = useState<SearchResultProps>()
  const [searchValue, setSearchValue] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const icon = <IconSearch style={{ width: rem(16), height: rem(16) }} />
  const userData = useUser()
  const currentUserId = userData?.userInfo?.id

  const { colorScheme } = useMantineColorScheme()
  const theme = useMantineTheme()

  const color =
    colorScheme === 'dark' ? theme.colors.gray[5] : theme.colors.dark[8]

  // Search implementation
  const handleSearch = async (value: string) => {
    setSearchValue(value)
    setIsLoading(true)
    try {
      const res = await SearchChatter(value)
      setSearchResults(res.data)
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
      {isAuthenticated() && (
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

        {searchValue === '' && (
          <div className='flex flex-col items-center pb-5'>
            <Image src={SearchIcon} width={200} alt='search icon' />
            <Text>Search for anything in Chatter</Text>
          </div>
        )}

        {searchValue !== '' && (
          <>
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
                      <Link
                        key={person.id}
                        href={
                          person.id === currentUserId
                            ? `/profile`
                            : `/${person.user_name}`
                        }
                        className={person.id === currentUserId ? 'hidden' : ''}
                      >
                        <div
                          className='flex flex-col items-center text-center'
                          key={person.id}
                        >
                          <Avatar
                            src={person.imageUrl}
                            radius={120}
                            className='mb-2'
                            mx='auto'
                          />
                          <Title order={6} className='capitalize'>
                            {person.first_name} {person.last_name}
                          </Title>
                          <p className='text-xs'>@{person.user_name}</p>
                        </div>
                      </Link>
                    ))}
                  </>
                ) : isLoading ? (
                  <>
                    {[...Array(4)].map((_, index) => (
                      <div
                        className='flex flex-col items-center gap-4'
                        key={index}
                      >
                        <Skeleton circle height={40} />
                        <Skeleton height={10} width={50} />
                      </div>
                    ))}
                  </>
                ) : (
                  <Text fz={14}>No person found</Text>
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
                  <div className='flex flex-col mb-5'>
                    {searchResults?.posts?.map((post) => (
                      <Link
                        key={post?.id}
                        href={`/feeds/${post.slug}`}
                        className={genClass.post_result}
                      >
                        <div className='flex-col gap-2'>
                          <Title lineClamp={1} order={6}>
                            {post.title}
                          </Title>
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
                <Text fz={14}>No post found</Text>
              )}
            </Box>
          </>
        )}
      </Modal>
    </>
  )
}

export default Header
