'use client'

import {
  Card,
  Avatar,
  Text,
  Group,
  Title,
  Affix,
  Tooltip,
  Box,
  Skeleton,
  rem,
  Loader,
} from '@mantine/core'
import classes from '@/styles/General.module.css'
import AppLayout from '@/layout/AppLayout'
import FeedCard from '@/components/Feed/FeedCard'
import {
  IconCheck,
  IconPlus,
  IconTemplate,
  IconUserEdit,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import formatStats from '@/services/formatStats'
import ProfileSkeleton from '@/components/Skeletons/ProfileSkeleton'
import { useUser, useFetching } from '@/context/useUser'
import FeedsSkeleton from '@/components/Skeletons/FeedsSkeleton'
import EmptyState from '@/components/EmptyState'
import { UpdateProfilePicture } from '@/services/apis'
import { notifications } from '@mantine/notifications'
import { IconX } from '@tabler/icons-react'
import { useState } from 'react'

const Profile = () => {
  const router = useRouter()
  const userData = useUser()
  const fetchingData = useFetching()
  const isFetching = fetchingData?.isFetching
  const refetch = fetchingData?.refetch
  const [isUploading, setIsUploading] = useState(false)

  console.log('user data: ', userData)

  formatStats()
  const stats = [
    { value: userData?.followers?.length, label: 'Followers' },
    { value: userData?.following?.length, label: 'Follows' },
    { value: userData?.posts?.length, label: 'Posts' },
  ]

  const items = stats.map((stat) => (
    <div key={stat.label}>
      <Text ta='center' fz='lg' fw={500}>
        {stat.value}
      </Text>
      <Text ta='center' fz='sm' c='dimmed' lh={1}>
        {stat.label}
      </Text>
    </div>
  ))

  // Update profile picture
  const handleImageChange = async (event: any) => {
    const file = event.target.files[0]

    if (file) {
      setIsUploading(true)

      try {
        const reader = new FileReader()

        reader.onload = async () => {
          const base64String = reader.result as string

          console.log('Base64 image:', base64String)

          try {
            const res = await UpdateProfilePicture({ image: base64String })
            console.log(res)
            setIsUploading(false)

            if (res.success) {
              if (refetch) {
                refetch()
              } else {
                console.error('Refetch function is null')
              }
            }

            notifications.show({
              icon: <IconCheck style={{ width: rem(20), height: rem(20) }} />,
              withCloseButton: false,
              color: 'green',
              message: 'Profile updated',
            })
          } catch (error) {
            console.error('Error updating profile picture:', error)
            notifications.show({
              icon: <IconX style={{ width: rem(20), height: rem(20) }} />,
              withCloseButton: false,
              color: 'red',
              title: 'Profile update failed!',
              message: 'Something went wrong. Please try again',
            })
          } finally {
            setIsUploading(false)
          }
        }

        reader.readAsDataURL(file)
      } catch (error) {
        console.error('Error reading file:', error)
        // Handle error
        setIsUploading(false)
      }
    }
  }

  return (
    <AppLayout title='My Profile'>
      <Card withBorder padding='xl' radius='md'>
        {isFetching ? (
          <ProfileSkeleton />
        ) : (
          <>
            {userData && (
              <>
                <div className='flex'>
                  <div className='relative w-fit mx-auto'>
                    <Avatar
                      src={userData?.userInfo?.imageUrl}
                      size={80}
                      radius={80}
                      mx='auto'
                    />
                    {isUploading && (
                      <div className='bg-white absolute top-0 w-full h-full flex items-center justify-center rounded-full bg-opacity-25'>
                        <Loader color='#543ee0' />
                      </div>
                    )}
                    <input
                      type='file'
                      accept='.jpg, .jpeg, .png'
                      id='profile_pic'
                      onChange={handleImageChange}
                      disabled={isUploading}
                      hidden
                    />
                    <Tooltip
                      label='Update profile picture'
                      position='right-end'
                    >
                      <label
                        htmlFor='profile_pic'
                        className='w-10 h-10 profile-update-btn shadow-lg rounded-full flex items-center justify-center absolute -bottom-2 -right-2 cursor-pointer'
                      >
                        <IconUserEdit className={classes.profile_action_icon} />
                      </label>
                    </Tooltip>
                  </div>
                </div>
                <div className='text-center'>
                  <Text fz='lg' fw={500} mt='sm'>
                    {userData?.userInfo?.first_name}{' '}
                    {userData?.userInfo?.last_name}
                  </Text>
                  <Text className='text-sm' mb={'md'}>
                    @{userData?.userInfo?.user_name}
                  </Text>
                  <Text className='capitalize' fz='sm' c='dimmed'>
                    {userData?.userInfo?.role}
                  </Text>
                </div>
                <Group mt='md' justify='center' gap={30}>
                  {items}
                </Group>
              </>
            )}
          </>
        )}
      </Card>

      <div className='posts mt-20'>
        <div>
          <Title order={4} mb={50} className={classes.user_header}>
            Posts
          </Title>
        </div>
        {isFetching ? (
          <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
            {[...Array(2)].map((_, index) => (
              <FeedsSkeleton key={index} />
            ))}
          </div>
        ) : (
          <>
            {userData && userData.posts && userData.posts.length < 1 ? (
              <EmptyState
                icon={<IconTemplate size={40} />}
                title='You do not have any post yet'
                description='Click on the plus button to create a new post.'
              />
            ) : (
              <div className='grid grid-cols-1 lg:grid-cols-2 gap-5 md:gap-10'>
                {userData?.posts?.map((feed: any) => (
                  <FeedCard
                    key={feed.id}
                    refetch={refetch}
                    author={userData?.userInfo}
                    {...feed}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      <Affix zIndex={10} position={{ bottom: 40, right: 20 }}>
        {isFetching ? (
          <Skeleton circle height={54} />
        ) : (
          <Tooltip label='Create new post'>
            <Box
              onClick={() => router.push('/feeds/create')}
              w={50}
              h={50}
              className='rounded-full cursor-pointer flex items-center justify-center shadow-xl'
              c={'white'}
              bg={'#543ee0'}
            >
              <IconPlus size={25} stroke={1.5} />
            </Box>
          </Tooltip>
        )}
      </Affix>
    </AppLayout>
  )
}

export default Profile
